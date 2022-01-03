const animation_canvas_aspect_ratio = 4 / 3;
let gl;
let animationStartTime;
let transformLocation;
let perspectiveLocation;
let sphereRadiusLocation;
let sphereCenterLocation;
let vertices = null;
let verticesBuffer;

let verticesWorker = null;

function fitAnimationCanvas(canvas)
{
    let $canvas = $(canvas);
    let width = $canvas.width();
    let height = width / animation_canvas_aspect_ratio;
    $canvas.css('width', width);
    $canvas.css('height', height);
    $canvas.attr('width', width * window.devicePixelRatio);
    $canvas.attr('height', height * window.devicePixelRatio);

    animate();
}

function fitAnimationCanvases()
{
    let canvases = document.getElementsByClassName("animation_canvas");
    Array.from(canvases).forEach(fitAnimationCanvas);
}

function onAnimationButtonSlowClick()
{
    let slowButton = document.getElementById("animation_button_slow");
    let fastButton = document.getElementById("animation_button_fast");
    $(slowButton).attr("class", "active");
    $(fastButton).attr("class", "inactive");

    verticesWorker.postMessage(250);
}

function onAnimationButtonFastClick()
{
    let slowButton = document.getElementById("animation_button_slow");
    let fastButton = document.getElementById("animation_button_fast");
    $(slowButton).attr("class", "inactive");
    $(fastButton).attr("class", "active");

    verticesWorker.postMessage(32);
}

function onDescriptionClick()
{
    console.log("dec");
    let desciption = document.getElementById("fibonacci_sphere_description");
    let code = document.getElementById("fibonacci_sphere_code");
    $(desciption).css("display", "block");
    $(code).css("display", "none");
}

function onCodeClick()
{
    console.log("dec");
    let desciption = document.getElementById("fibonacci_sphere_description");
    let code = document.getElementById("fibonacci_sphere_code");
    $(desciption).css("display", "none");
    $(code).css("display", "block");
}

window.addEventListener('load', fitAnimationCanvases);
window.addEventListener('load', function() {hljs.highlightAll();});

window.addEventListener('resize', fitAnimationCanvases);

document.getElementById("animation_button_slow").addEventListener('click', onAnimationButtonSlowClick);
document.getElementById("animation_button_fast").addEventListener('click', onAnimationButtonFastClick);

document.getElementById("desciption_tab_button").addEventListener('click', onDescriptionClick);
document.getElementById("code_tab_button").addEventListener('click', onCodeClick);

function onVerticesWorkerMessage(message)
{
    vertices = message.data;
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function initWorker()
{
    verticesWorker = verticesWorker == null ? new Worker('js/vertices_worker.js') : verticesWorker;
    verticesWorker.postMessage(250);
    verticesWorker.onmessage = onVerticesWorkerMessage;
}

function animate()
{
    if(verticesWorker == null) initWorker();

    const canvas = document.getElementById("fibonacci_sphere_canvas");
    gl = canvas.getContext('webgl');

    verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
    precision mediump float;

    attribute vec3 position;
    varying vec3 vPosition;

    uniform mat4 transform;
    uniform mat4 perspective;

    void main()
    {
        gl_Position = perspective * transform * vec4(position, 1);
        vPosition = (transform * vec4(position, 1)).xyz;
    }
    `);
    gl.compileShader(vertexShader);

    const framgentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(framgentShader, `
    precision mediump float;

    varying vec3 vPosition;

    uniform float sphereRadius;
    uniform vec3 sphereCenter;

    float lerp(float a, float b, float t)
    {
        return a + t * (b - a);
    }

    vec3 lerp(vec3 a, vec3 b, float t)
    {
        return vec3(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
    }

    float inverseLerp(float a, float b, float v)
    {
        return (v - a) / (b - a);
    }

    void main()
    {
        float t = inverseLerp(-sphereRadius, sphereRadius, vPosition.z - sphereCenter.z);
        vec3 color = lerp(vec3(1.0, 0.0, 0.75), vec3(0.0, 0.75, 1.0), t);
        gl_FragColor = vec4(color, 1.0);
    }
    `);
    gl.compileShader(framgentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, framgentShader);
    gl.linkProgram(program);

    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    transformLocation = gl.getUniformLocation(program, 'transform');
    perspectiveLocation = gl.getUniformLocation(program, 'perspective');
    sphereRadiusLocation = gl.getUniformLocation(program, 'sphereRadius');
    sphereCenterLocation = gl.getUniformLocation(program, 'sphereCenter');



    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    animationStartTime = new Date();
    requestAnimationFrame(nextFrame);
}

function nextFrame()
{
    let sphereCenter = glMatrix.vec3.create();
    glMatrix.vec3.set(sphereCenter, 0, 0, -8);

    let transform = glMatrix.mat4.create();
    glMatrix.mat4.translate(transform, transform, sphereCenter);
    glMatrix.mat4.rotateY(transform, transform, (Date.now() - animationStartTime.getMilliseconds()) * 0.001 * 2 * Math.PI * -0.05);
    glMatrix.mat4.scale(transform, transform, [2, 2, 2]);
    glMatrix.mat4.scale(transform, transform, [1, animation_canvas_aspect_ratio, 1]);

    let perspectiveMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(perspectiveMatrix, Math.PI / 4, 1, 0.001, 100);

    gl.uniformMatrix4fv(transformLocation, false, transform);
    gl.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix);
    gl.uniform1f(sphereRadiusLocation, 0.5);
    gl.uniform3fv(sphereCenterLocation, sphereCenter);

    if(vertices != null)
    {
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
    }

    requestAnimationFrame(nextFrame);
}

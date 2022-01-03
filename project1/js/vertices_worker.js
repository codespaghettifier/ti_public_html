const GOLDEN_ANGLE = (3 - Math.sqrt(5)) * Math.PI;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) * 0.5;

let started = false;
let generationInterval = null;
let minNumPoints= 0;
let numPoints = minNumPoints;
let maxNumPoints = 320;

let icosahedron = generateIcosahedron();

function lerp(a, b, t)
{
    return a + t * (b - a);
}

function normalizeVertices(vertices)
{
    let maxLength = 0;
    for(let i = 0; i < vertices.length; i += 3)
    {
        let length = Math.sqrt(vertices[i] * vertices[i] + vertices[i + 1] * vertices[i + 1] + vertices[i + 2] * vertices[i + 2]);
        maxLength = length > maxLength ? length : maxLength;
    }

    for(let i = 0; i < vertices.length; i++)
    {
        vertices[i] = vertices[i] / maxLength;
    }
}

function generateIcosahedron()
{
    vertices = [];

    vertices = vertices.concat([0, 1, GOLDEN_RATIO]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, 1, GOLDEN_RATIO]);
    vertices = vertices.concat([0, -1, GOLDEN_RATIO]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([0, 1, GOLDEN_RATIO]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([0, -1, GOLDEN_RATIO]);
    vertices = vertices.concat([0, 1, GOLDEN_RATIO]);
    vertices = vertices.concat([-1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([0, 1, GOLDEN_RATIO]);
    vertices = vertices.concat([1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([-1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, -1, -GOLDEN_RATIO]);
    vertices = vertices.concat([0, 1, -GOLDEN_RATIO]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([0, -1, -GOLDEN_RATIO]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, -1, -GOLDEN_RATIO]);
    vertices = vertices.concat([1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([-1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, -1, -GOLDEN_RATIO]);
    vertices = vertices.concat([-1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([0, -1, -GOLDEN_RATIO]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([0, 1, -GOLDEN_RATIO]);
    vertices = vertices.concat([-1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, 1, -GOLDEN_RATIO]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([0, 1, -GOLDEN_RATIO]);
    vertices = vertices.concat([1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([0, -1, GOLDEN_RATIO]);
    vertices = vertices.concat([-1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, -1, GOLDEN_RATIO]);
    vertices = vertices.concat([-1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, -1, GOLDEN_RATIO]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([-1, -GOLDEN_RATIO, 0]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, 1]);
    vertices = vertices.concat([-1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([-GOLDEN_RATIO, 0, -1]);
    vertices = vertices.concat([-1, GOLDEN_RATIO, 0]);
    vertices = vertices.concat([0, 1, -GOLDEN_RATIO]);

    normalizeVertices(vertices);

    return vertices;
}

function generateSphere(numPoints)
{
    const POINT_RADIUS = 0.01;

    let icosahedronVerticesNum = icosahedron.length;
    let vertices = new Array(numPoints * icosahedronVerticesNum);

    for(let i = 0; i < numPoints; i++)
    {
        let theta = GOLDEN_ANGLE * i;
        let y = lerp(-1, 1,  i / numPoints);
        let radius = Math.sqrt(1 - y * y);
        let x = radius * Math.cos(theta);
        let z = radius * Math.sin(theta);

        for(let j = 0; j < icosahedronVerticesNum; j += 3)
        {
            vertices[i * icosahedronVerticesNum + j] = icosahedron[j] * POINT_RADIUS + x;
            vertices[i * icosahedronVerticesNum + j + 1] = icosahedron[j + 1] * POINT_RADIUS + y;
            vertices[i * icosahedronVerticesNum + j + 2] = icosahedron[j + 2] * POINT_RADIUS + z;
        }
    }

    normalizeVertices(vertices);
    return vertices;
}

self.onmessage = function(message)
{
    if(!started);
    {
        generateVertices();
        started = true;
    }

    startGeneration(message.data);
}

function generateVertices()
{
    vertices = generateSphere(numPoints);
    self.postMessage(vertices);
    numPoints++;
    numPoints = numPoints > maxNumPoints ? minNumPoints : numPoints;
}

function startGeneration(interval)
{
    if(generationInterval != null)
    {
        clearInterval(generationInterval);
    }

    generationInterval = setInterval(generateVertices, interval);
}

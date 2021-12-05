let $radioButtons = $(".poll_form_option[name=\"color\"]");
let $submitButton = $(".poll_form #form_submit_button");
let $pollResultsCanvas = $("#poll_results_canvas")
let canvasContext = $pollResultsCanvas[0].getContext("2d");
let canvasWidth;
let canvasHeight;
let requests = {};
let colors = {"red": 1, "green": 1, "blue": 1, "yellow": 1};

function isButtonChecked()
{
    let buttonChecked = false;
    $radioButtons.each(function()
    {
        if($(this).is(":checked"))
        {
            buttonChecked = true;
        }
    })

    return buttonChecked;
}

function updateSubmitButton()
{
    if(isButtonChecked())
    {
        $submitButton.attr("class", "submit_button_active");
    }
    else
    {
        $submitButton.attr("class", "submit_button_inactive");
    }
}

function submitButtonOnClick()
{
    if(! isButtonChecked()) return;

    let url = "../../cgi-bin/lab7_add_vote.cgi";
    data = {"color": $(".poll_form_option[name=\"color\"]:checked").val()}
    dataJson = "data=" + JSON.stringify(data);
    sendPostRequest("add vote", url, dataJson, handleAddVoteResponse);
}

function requestColors()
{
    let url = "../../cgi-bin/lab7_get_colors.cgi";
    sendPostRequest("get colors", url, "", handleGetColorsResponse);
}

function handleAddVoteResponse()
{
    request = requests["add vote"];

    if(request.readyState == 4)
    {
        if(request.status == 200)
        {
            console.log(request.responoseText);
            requestColors();
        }
        else
        {
            console.log("Bad response: " + request.responoseText);
        }

        request = null;
    }
}

function handleGetColorsResponse()
{
    request = requests["get colors"];

    if(request.readyState == 4)
    {
        if(request.status == 200)
        {
            color_json = request.responseText;
            colors = JSON.parse(color_json);
            updateCanvas();
        }
        else
        {
            console.log("Bad response: " + request.responoseText);
        }

        request = null;
    }
}

function sendPostRequest(requestName, url, messagePayload, responseHandler)
{
    if(! (requestName in requests))
    {
    	requests[requestName] = null;
    }

    if(requests[requestName] != null)
    {
    	console.log("request is not nutll");
    	return;
    }

    request requests[requestName] = new XMLHttpRequest();
    try
    {
        request.onreadystatechange = responseHandler;
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        request.send(messagePayload);
    }
    catch(error)
    {
        console.log("Sending post request failed:" + error);
    }
}

function initCanvas()
{
    canvasWidth = parseInt($pollResultsCanvas.css('width'));
    canvasHeight = canvasWidth / 2;
    canvasContext.canvas.width = canvasWidth;
    canvasContext.canvas.height = canvasHeight;

    updateCanvas();
}

function updateCanvas()
{
    let columnWidth = canvasWidth / 5;
    let columnSpace = (canvasWidth - 4 * columnWidth) / 5;
    let columnMaxHeight = canvasHeight * 0.8
    let colorsSum = colors["red"] + colors["green"] + colors["blue"] + colors["yellow"];
    let redHeight = colors["red"] / colorsSum * columnMaxHeight;
    let greenHeight = colors["green"] / colorsSum * columnMaxHeight;
    let blueHeight = colors["blue"] / colorsSum * columnMaxHeight;
    let yellowHeight = colors["yellow"] / colorsSum * columnMaxHeight;
    let captionY = columnMaxHeight + (canvasHeight - columnMaxHeight) / 2;
    
    canvasContext.font = "bold 24px sans-serif";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(columnSpace, columnMaxHeight - redHeight, columnWidth, redHeight);
    canvasContext.fillText("Czerwony", columnSpace + columnWidth / 2, captionY);
    
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(columnSpace * 2 + columnWidth, columnMaxHeight - greenHeight, columnWidth, greenHeight);
    canvasContext.fillText("Zielony", columnSpace * 2 + columnWidth + columnWidth / 2, captionY);
    
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(columnSpace * 3 + columnWidth * 2, columnMaxHeight - blueHeight, columnWidth, blueHeight);
    canvasContext.fillText("Niebieski", columnSpace * 3 + columnWidth * 2 + columnWidth / 2, captionY);
    
    canvasContext.fillStyle = "yellow";
    canvasContext.fillRect(columnSpace * 4 + columnWidth * 3, columnMaxHeight - yellowHeight, columnWidth, yellowHeight);
    canvasContext.fillText("Żółty", columnSpace * 4 + columnWidth * 3 + columnWidth / 2, captionY);
}

$radioButtons.on("click", function()
{
    updateSubmitButton();
});

$submitButton.on("click", function()
{
    submitButtonOnClick();
});

initCanvas();
requestColors();

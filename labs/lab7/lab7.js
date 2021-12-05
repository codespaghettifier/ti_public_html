let $radioButtons = $(".poll_form_option[name=\"color\"]");
let $submitButton = $(".poll_form #form_submit_button");
let $pollResultsCanvas = $("#poll_results_canvas")
let canvasContext = $pollResultsCanvas[0].getContext("2d");
let canvasWidth;
let canvasHeight;
let postRequest = null;
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
    sendPostRequest(url, dataJson, handleAddVoteResponse);
}

function requestColors()
{
    let url = "../../cgi-bin/lab7_get_colors.cgi";
    sendPostRequest(url, "", handleGetColorsResponse);
}

function handleAddVoteResponse()
{
    if(postRequest.readyState == 4)
    {
        if(postRequest.status == 200)
        {
            console.log(postRequest.responoseText);
            requestColors();
        }
        else
        {
            console.log("Bad response: " + postRequest.responoseText);
        }

        postRequest = null;
    }
}

function handleGetColorsResponse()
{
    if(postRequest.readyState == 4)
    {
        if(postRequest.status == 200)
        {
            console.log(postRequest.responoseText);
            colors = JSON.parse(postRequest.responoseText)
            console.log(colors);
        }
        else
        {
            console.log("Bad response: " + postRequest.responoseText);
        }

        postRequest = null;
    }
}

function sendPostRequest(url, messagePayload, responseHandler)
{
    if(postRequest)
    {
    	console.log("post is not nutll");
    	return;
    }

    postRequest = new XMLHttpRequest();
    try
    {
        postRequest.onreadystatechange = responseHandler;
        postRequest.open("POST", url, true);
        postRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        postRequest.send(messagePayload);
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
    let colors = {"red": 1, "green": 2, "blue": 3, "yellow": 4};
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

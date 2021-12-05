let $radioButtons = $(".poll_form_option[name=\"color\"]");
let $submitButton = $(".poll_form #form_submit_button");

let postRequest = null;

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

    data = {"color": $(".poll_form_option[name=\"color\"]:checked").val()}
    dataJson = "data=" + JSON.stringify(data);
    console.log(dataJson);
    sendPostRequest(dataJson);
}

function handlePostResponse()
{
    if(postRequest.readyState == 4)
    {
        if(postRequest.status == 200)
        {
            console.log(postRequest.responoseText);
        }
        else
        {
            console.log("Bad response: " + postRequest.responoseText);
            return;
        }

        postRequest = null;
    }
}

function sendPostRequest(messagePayload)
{
    if(postRequest) return;

    postRequest = new XMLHttpRequest();
    try
    {
        let url = "../../cgi-bin/lab7_add_vote.cgi";
        postRequest.onreadystatechange = handlePostResponse;
        postRequest.open("POST", url, true);
        postRequest.setRequestHeader("Content-Type","application/json");
        postRequest.send(messagePayload);
    }
    catch(error)
    {
        console.log("Sending post request failed:" + error);
    }
}


$radioButtons.on("click", function()
{
    updateSubmitButton();
});

$submitButton.on("click", function()
{
    submitButtonOnClick();
});

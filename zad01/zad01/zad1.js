let $inputTabButton = $("#input_tab_button");
let $listTabButton = $("#list_tab_button");
let $inputFormContainer = $("#input_form_container");
let $listContainer = $("#list_container");

let $nameInput = $("[name=\"figure_name\"]");
let $x1Input = $("[name=\"x_1_input\"]");
let $y1Input = $("[name=\"y_1_input\"]");
let $x2Input = $("[name=\"x_2_input\"]");
let $y2Input = $("[name=\"y_2_input\"]");
let $x3Input = $("[name=\"x_3_input\"]");
let $y3Input = $("[name=\"y_3_input\"]");
let $submitButton = $("#form_submit_button");

function updateList(records)
{

}

function requestAndLoadList()
{
    console.log("Submit button clicked");

    data = {"name": $nameInput.val()
                , "x1": $x1Input.val(), "y1": $y1Input.val()
                , "x2": $x2Input.val(), "y2": $y2Input.val()
                , "x3": $x3Input.val(), "y3": $y3Input.val()};
    dataJson = "data=" + JSON.stringify(data);
    console.log(data);

    // get?
    $.post("../cgi-bin/zad01/read_get.cgi", "", function(result, status)
    {
        if(status != "success")
        {
            console.log("Failed to get data: " + status);
            return;
        }

        console.log("request result: " + result);
        updateList(data);
    });
}

function onInputTabButtonClick()
{
    $inputFormContainer.css("display", "block");
    $listContainer.css("display", "none");
}

function onListTabButtonClick()
{
    $listContainer.css("display", "block");
    $inputFormContainer.css("display", "none");
    requestAndLoadList();
}

function submitButtonOnClick()
{
    console.log("Submit button clicked");

    data = {"name": $nameInput.val()
                , "x1": $x1Input.val(), "y1": $y1Input.val()
                , "x2": $x2Input.val(), "y2": $y2Input.val()
                , "x3": $x3Input.val(), "y3": $y3Input.val()};
    dataJson = "data=" + JSON.stringify(data);
    console.log(data);

    $.post("../cgi-bin/zad01/save_post.cgi", dataJson, function(result)
    {
        console.log("post result: " + result);
    });
}



$submitButton.on("click", function()
{
    submitButtonOnClick();
});

$inputTabButton.on("click", function()
{
    onInputTabButtonClick();
});

$listTabButton.on("click", function()
{
    onListTabButtonClick();
});

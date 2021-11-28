let $dataform = $(".data_form");
let $form_tab_button = $("#form_tab_button");
let $inspector_tab_button = $("#inspector_tab_button");
let $firstNameInput = $dataform.find("[name=\"first name\"]");
let $lastNameInput = $dataform.find("[name=\"last name\"]");
let $emailInput = $dataform.find("[name=\"email\"]");
let $yearSelect = $dataform.find("[name=\"year\"]");
let $submitButton = $dataform.find("#form_submit_button");

function isFirstNameValid()
{
    return $firstNameInput.val().length > 0;
}

function isLastNameValid()
{
    return $lastNameInput.val().length > 0;
}

function isEmailValid()
{
    return $emailInput.val().length > 0;
}

function isFormValid()
{
    return isFirstNameValid() && isLastNameValid() && isEmailValid();
}

function onFirstNameInput()
{
    if(isFirstNameValid())
    {
        $dataform.find("#no_first_name_error_info").css("display", "none");
        $firstNameInput.attr("class", "valid_text_input");
    }
    else
    {
        $dataform.find("#no_first_name_error_info").css("display", "inline");
        $firstNameInput.attr("class", "invalid_text_input");
    }
}

function onLastNameInput()
{
    if(isLastNameValid())
    {
        $dataform.find("#no_last_name_error_info").css("display", "none");
        $lastNameInput.attr("class", "valid_text_input");
    }
    else
    {
        $dataform.find("#no_last_name_error_info").css("display", "inline");
        $lastNameInput.attr("class", "invalid_text_input");
    }
}

function onEmailInput()
{
    if(isEmailValid())
    {
        $dataform.find("#no_email_error_info").css("display", "none");
        $emailInput.attr("class", "valid_text_input");
    }
    else
    {
        $dataform.find("#no_email_error_info").css("display", "inline");
        $emailInput.attr("class", "invalid_text_input");
    }
}

function updateSubmitButton()
{
    if(isFormValid())
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
    if(!isFormValid()) return;

    data = {"firstName": $firstNameInput.val(), "lastName": $lastNameInput.val(), "email": $emailInput.val(), "year": $yearSelect.val()};
    dataJson = "data=" + JSON.stringify(data);
    $.post("../../cgi-bin/lab6_add_data.cgi", dataJson, function(result)
    {
        console.log(result);
    });
}

$firstNameInput.on("input", function()
{
    onFirstNameInput();
    updateSubmitButton();
});

$firstNameInput.on("blur", function()
{
    onFirstNameInput();
    updateSubmitButton();
});

$lastNameInput.on("input", function()
{
    onLastNameInput();
    updateSubmitButton();
});

$lastNameInput.on("blur", function()
{
    onLastNameInput();
    updateSubmitButton();
});

$emailInput.on("input", function()
{
    onEmailInput();
    updateSubmitButton();
});

$emailInput.on("blur", function()
{
    onEmailInput();
    updateSubmitButton();
});

$submitButton.on("click", function()
{
    submitButtonOnClick();
});

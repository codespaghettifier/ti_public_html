let $dataFormContainer = $(".data_form_container")
let $dataTableContainer = $(".data_table_container")
let $dataForm = $(".data_form");
let $formTabButton = $("#form_tab_button");
let $inspectorTabButton = $("#inspector_tab_button");
let $firstNameInput = $dataForm.find("[name=\"first name\"]");
let $lastNameInput = $dataForm.find("[name=\"last name\"]");
let $emailInput = $dataForm.find("[name=\"email\"]");
let $yearSelect = $dataForm.find("[name=\"year\"]");
let $submitButton = $dataForm.find("#form_submit_button");

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
        $dataForm.find("#no_first_name_error_info").css("display", "none");
        $firstNameInput.attr("class", "valid_text_input");
    }
    else
    {
        $dataForm.find("#no_first_name_error_info").css("display", "inline");
        $firstNameInput.attr("class", "invalid_text_input");
    }
}

function onLastNameInput()
{
    if(isLastNameValid())
    {
        $dataForm.find("#no_last_name_error_info").css("display", "none");
        $lastNameInput.attr("class", "valid_text_input");
    }
    else
    {
        $dataForm.find("#no_last_name_error_info").css("display", "inline");
        $lastNameInput.attr("class", "invalid_text_input");
    }
}

function onEmailInput()
{
    if(isEmailValid())
    {
        $dataForm.find("#no_email_error_info").css("display", "none");
        $emailInput.attr("class", "valid_text_input");
    }
    else
    {
        $dataForm.find("#no_email_error_info").css("display", "inline");
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
        //console.log(result);
    });
}

function fillTable(records)
{   
    $tableBody = $dataTableContainer.find(".data_table tbody");
    $tableBody.empty();
    records.forEach(function(record)
    {
        $tableBody.append($('<tr>'));
        $row = $tableBody.find("tr:last-child");
        $row.append($('<td>' + record['firstName'] + '</td>'));
        $row.append($('<td>' + record['lastName'] + '</td>'));
        $row.append($('<td>' + record['email'] + '</td>'));
        $row.append($('<td>' + record['year'] + '</td>'));
    });
}

function requestAndLoadData()
{
    $.get("../../cgi-bin/lab6_get_data.cgi", function(data, status)
    {
        if(status != "success")
        {
            console.log("Failed to get data: " + status);
            return
        }

        fillTable(data);
    });
}

function onFormTabButtonClick()
{
    $formTabButton.attr("class", "menu_option_active");
    $inspectorTabButton.attr("class", "menu_option_inactive");
    $dataFormContainer.css("display", "flex");
    $dataTableContainer.css("display", "none");
}

function onInspectorTabButtonClick()
{
    $inspectorTabButton.attr("class", "menu_option_active");
    $formTabButton.attr("class", "menu_option_inactive");
    $dataTableContainer.css("display", "flex");
    $dataFormContainer.css("display", "none");
    requestAndLoadData();
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

$formTabButton.on("click", function()
{
    onFormTabButtonClick();
});

$inspectorTabButton.on("click", function()
{
    onInspectorTabButtonClick();
});

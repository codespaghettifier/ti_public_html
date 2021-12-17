function isInputEmpty($input)
{
    return $input.val().length == 0;
}

function isAnyInpuEmpty($inputs)
{
    let empty = false;
    $inputs.each(function()
    {
        if(isInputEmpty($(this)))
        {
            empty = true;
            return;
        };
    });

    return empty;
}

function updateSubmitButton($form)
{
    let $button = $form.find(".submit_button_inactive");
    if(!$button.length)
    {
        $button = $form.find(".submit_button_active");
    }

    if(isAnyInpuEmpty($form.find(".data_form_input")))
    {
        $button.attr("class", "submit_button_inactive");
    }
    else
    {
        $button.attr("class", "submit_button_active");
    }
}

function onInputInput($label_input_pair)
{
    let $input = $label_input_pair.find(".data_form_input");
    let $errorInfo = $label_input_pair.find("span.error_info");
    if(!isInputEmpty($input))
    {
        $input.attr("class", "valid_text_input data_form_input");
        $errorInfo.css("display", "none");
    }
    else
    {
        $input.attr("class", "invalid_text_input data_form_input");
        $errorInfo.css("display", "inline");
    }

    updateSubmitButton($label_input_pair.parent());
}

function submitRegisterForm()
{
    let $registerForm = $("#register_form");
    let data = {}
    data["firstName"] = $registerForm.find("[name=\"first name\"]").val();
    data["lastName"] = $registerForm.find("[name=\"last name\"]").val();
    data["email"] = $registerForm.find("[name=\"email\"]").val();
    data["password"] = $registerForm.find("[name=\"password\"]").val();
    dataJson = "data=" + JSON.stringify(data);
    $.post("zad04reg.php", dataJson, function(result)
    {
        console.log(result);
    });
}

function submitLoginForm()
{
    let $loginForm = $("#login_form");
    let data = {};
    data["email"] = $loginForm.find("[name=\"email\"]").val();
    data["password"] = $loginForm.find("[name=\"password\"]").val();
    dataJson = "data=" + JSON.stringify(data);
    $.post("zad04log.php", dataJson, function(result)
    {
        console.log(result);
    });
}

function submitNewEntryForm()
{
    let $loginForm = $("#new_entry_form");
    let data = {};
    data["entry"] = $loginForm.find("[name=\"entry\"]").val();
    dataJson = "data=" + JSON.stringify(data);
    $.post("newEntry.php", dataJson, function(result)
    {
        console.log(result);
    });
}

function onSubmitButtonClick($form)
{
    if(isAnyInpuEmpty($form.find(".label_input_pair .data_form_input"))) return;

    if($form.attr("id") == "register_form")
    {
        submitRegisterForm();
        return;
    }

    if($form.attr("id") == "login_form")
    {
        submitLoginForm();
        return;
    }

    if($form.attr("id") == "new_entry_form")
    {
        submitNewEntryForm();
        return;
    }
}

function dateString(date)
{
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	return year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second;
}


function fillEntriesTable(records)
{
    $tableBody = $("#entries_table_container .data_table tbody");
    $tableBody.empty();
    records.forEach(function(record)
    {
        $tableBody.append($('<tr>'));
        $row = $tableBody.find("tr:last-child");
        $row.append($('<td>' + record['entry'] + '</td>'));
        $row.append($('<td>' + record['user'] + '</td>'));
        let date = new Date(record['time'] * 1000);
        $row.append($('<td>' + dateString(date) + '</td>'));
    });
}

function requestAndLoadEntries()
{
    $.post("getEntries.php", function(data, status)
    {
        if(status != "success")
        {
            console.log("Failed to get entries: " + status);
            return;
        }

        fillEntriesTable($.parseJSON(data));
    });
}

function onRegisterTabButtonClick()
{

}

function onLoginTabButtonClick()
{

}

function onNewEntryTabButtonClick()
{

}

function onEntriesTabButtonClick()
{
    requestAndLoadEntries();
}

function onLogoutButtonClick()
{
	$.post("zad04out.php", function(result)
	{
		console.log(result);
	});
}

$(".label_input_pair").each(function()
{
    $(this).find(".data_form_input").on("input", function()
    {
        onInputInput($(this).parent());
    });
    $(this).find(".data_form_input").on("blur", function()
    {
        onInputInput($(this).parent());
    });
});

$(".label_input_pair_stretched").each(function()
{
    $(this).find(".data_form_input").on("input", function()
    {
        onInputInput($(this).parent().parent());
    });
    $(this).find(".data_form_input").on("blur", function()
    {
        onInputInput($(this).parent().parent());
    });
});

$(".data_form").each(function()
{
    let $button = $(this).find(".submit_button_inactive");
    if(!$button.length)
    {
        $button = $(this).find(".submit_button_active");
    }
    $button.on("click", function()
    {
        onSubmitButtonClick($(this).parent().parent());
    });
});

$(".menu_bar #register_tab_button").on("click", function()
{
    onRegisterTabButtonClick();
});

$(".menu_bar #login_tab_button").on("click", function()
{
    onLoginTabButtonClick();
});

$(".menu_bar #new_entry_tab_button").on("click", function()
{
    onNewEntryTabButtonClick();
});

$(".menu_bar #entries_tab_button").on("click", function()
{
    onEntriesTabButtonClick();
});

$(".menu_bar #logout_button").on("click", function()
{
    onLogoutButtonClick();
});

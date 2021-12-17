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

    if(isAnyInpuEmpty($form.find(".label_input_pair input")))
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
    let $input = $label_input_pair.find("input");
    let $errorInfo = $label_input_pair.find("span.error_info");
    if(!isInputEmpty($input))
    {
        $input.attr("class", "valid_text_input");
        $errorInfo.css("display", "none");
    }
    else
    {
        $input.attr("class", "invalid_text_input");
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

function onSubmitButtonClick($form)
{
    if(isAnyInpuEmpty($form.find(".label_input_pair input"))) return;

    if($form.attr("id") == "register_form")
    {
        submitRegisterForm();
    }

    if($form.attr("id") == "login_form")
    {
        submitRegisterForm();
    }
}

$(".label_input_pair").each(function()
{
    $(this).find("input").on("input", function()
    {
        onInputInput($(this).parent());
    });
    $(this).find("input").on("blur", function()
    {
        onInputInput($(this).parent());
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

// $(".data_form input[type=\"button\"")

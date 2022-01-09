<div class="center_content">
    <form class="data_form" id="login_form" name="login_form">
        <div class="label_input_pair">
            <p>*E-mail: <span class="error_info" id="no_email_name_error_info">Brak adresu e-mail</span></p>
            <input type="text" size="50" name="email" class="valid_text_input data_form_input"/>
        </div>
        <div class="label_input_pair">
            <p>*Hasło: <span class="error_info" id="no_password_name_error_info">Brak hasła</span></p>
            <input type="text" size="50" name="password" class="valid_text_input data_form_input"/>
        </div>
        <div class="center_content">
            <input class="submit_button_inactive" id="register_submit_button" type="button" value="Zaloguj" onclick="login()"/>
        </div>
        <div class="center_content">
            <p>* pole wymagane</p>
        </div>
    </form>
</div>

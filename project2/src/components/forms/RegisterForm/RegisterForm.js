import React, {useState, useCallback} from 'react'
import LabelInputPair from "../../LabelInputPair/LabelInputPair.js"
import "../FormContainer.css"
import "../SubmitButton.css"

function RegisterForm()
{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitStatus, setSubmitStatus] = useState("")

    const submitButtonActive = firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0;

    const handleSubmitClick = () => {
        if(!submitButtonActive) return

        const data = {'firstName': firstName, 'lastName': lastName, 'email': email, 'password': password}
        const dataJson = JSON.stringify(data)
        fetch(`/~9libucha/cgi-bin/register`, {method: 'post', headers: {'Content-Type': 'application/json'}, body: dataJson})
            .then(response => {
                if(!response.ok)
                {
                    throw new Error("Fetch error")
                }
                return response.json()
            })
            .then(response => {
                if(response['success'])
                {
                    setSubmitStatus("Zarejestrowano")
                }
                else
                {
                    console.log(response)
                    if(response['erorr'] == 'Email used')
                    {
                        setSubmitStatus("Email jest już zajęty")
                    }
                    else
                    {
                        setSubmitStatus("Nie udało się zarejestrować")
                    }
                }
            })
            .catch(error => {
                setSubmitStatus("Nie udało się zarejestrować")
                console.log(error)
            })
    }

    return (
        <div className="form_container">
            <form action="" className="register_form">
                <LabelInputPair label="*Imię: " errorLabel="Brak imienia" valueChangeCallback={(value) => {setFirstName(value)}} />
                <LabelInputPair label="*Nazwisko: " errorLabel="Brak nazwiska" valueChangeCallback={(value) => {setLastName(value)}} />
                <LabelInputPair label="*Email: " errorLabel="Brak adresu email" valueChangeCallback={(value) => {setEmail(value)}} />
                <LabelInputPair label="*Hasło: " errorLabel="Brak hasła" valueChangeCallback={(value) => {setPassword(value)}} />
                <div className="center_content">
                    <button type="button" className={"submit_button " + (submitButtonActive ? "submit_button_active" : "submit_button_inactive")} onClick={handleSubmitClick}>Zarejestruj</button>
                </div>
                <div className="center_content">
                    <p>{submitStatus}</p>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;

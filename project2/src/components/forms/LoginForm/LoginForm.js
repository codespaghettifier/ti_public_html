import React, {useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import LabelInputPair from "../../LabelInputPair/LabelInputPair.js"
import "../FormContainer.css"
import "../SubmitButton.css"

// class LoginForm extends React.Component
// {
//     constructor(props)
//     {
//         super(props)
//         this.state = {
//             email: '',
//             password: '',
//             submitStatus: '',
//
//         }
//     }
// }

function LoginForm(props)
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitStatus, setSubmitStatus] = useState("")
    const [redirectToHome, setRedirectToHome] = useState(false)
    const navigate = useNavigate()

    const submitButtonActive = email.length > 0 && password.length > 0;

    const handleSubmitClick = () => {
        if(!submitButtonActive) return

        const data = {'email': email, 'password': password}
        const dataJson = JSON.stringify(data)
        fetch(`/~9libucha/cgi-bin/login`, {method: 'post', headers: {'Content-Type': 'application/json'}, body: dataJson})
            .then(response => {
                if(!response.ok)
                {
                    throw new Error("Fetch error")
                }
                return response.json()
            })
            .then(response => {
                setRedirectToHome(true)
                setSubmitStatus('Zalogowano')
            })
            .catch(error => {
                setSubmitStatus("Nie udało się zalogować")
                console.log(error)
            })
    }

    if(redirectToHome)
    {
        navigate(`${props.homePath}/`)
        props.updateLogged()
    }

    return (
        <div className="form_container">
            <form action="" className="login_form">
                <LabelInputPair label="*Email: " errorLabel="Brak adresu email" valueChangeCallback={(value) => {setEmail(value)}} />
                <LabelInputPair label="*Hasło: " errorLabel="Brak hasła" valueChangeCallback={(value) => {setPassword(value)}} />
                <div className="center_content">
                    <button type="button" className={"submit_button " + (submitButtonActive ? "submit_button_active" : "submit_button_inactive")} onClick={handleSubmitClick}>Zaloguj</button>
                </div>
                <div className="center_content">
                    <p>{submitStatus}</p>
                </div>
            </form>
        </div>
    );
}
export default LoginForm;

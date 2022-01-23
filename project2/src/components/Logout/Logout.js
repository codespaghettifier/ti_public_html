import React from "react"
import {useNavigate} from 'react-router-dom'

class Logout extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            result: 'Wylogowywanie',
            redirectToHome: false
        }
    }

    componentDidMount()
    {
        fetch(`/~9libucha/cgi-bin/logout`, {method: 'delete', credentials: 'include'})
            .then(response => {
                if(!response.ok)
                {
                    throw new Error("Fetch error")
                }
                return response.json()
            })
            .then(response => {
                this.state.result = 'Wylogowano'
                this.state.redirectToHome = true
                this.setState(this.state)
            })
            .catch((error) => {
                console.log(error)
                this.state.result = 'Nie udało się wyglogować'
                this.setState(this.state)
            })
    }

    render()
    {
        if(this.state.redirectToHome)
        {
            this.props.navigate(`${this.props.homePath}/`)
            this.props.updateLogged()
        }

        return (
            <div className='center_content'>
                <h3>{this.state.result}</h3>
            </div>
        )
    }
}

export default function(props) {
    const navigate = useNavigate()
    return <Logout {...props} navigate={navigate} />
}

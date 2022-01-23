import React, {useState} from "react"
import {Routes, Route} from 'react-router-dom'
import './App.css';
import MainMenu from './components/MainMenu/MainMenu.js'
import RegisterForm from './components/forms/RegisterForm/RegisterForm.js'
import LoginForm from './components/forms/LoginForm/LoginForm.js'
import PollMenu from './components/PollMenu/PollMenu.js'
import Poll from './components/Poll/Poll.js'
import DataView from './components/DataView/DataView.js'
import Documentation from './components/Documentation/Documentation.js'
import Logout from './components/Logout/Logout.js'

function App()
{
    const [logged, setLogged] = useState(false)

    const updateLogged = () => {
        const newLogged = document.cookie.match(/^(.*;)?\s*Session\s*=\s*[^;]+(.*)?$/) != null
        if(newLogged != logged) setLogged(newLogged)
    }

    updateLogged()

    let menuOptions;
    if(logged)
    {
        menuOptions = [['Ankiety', '/polls'], ['Podgląd danych', '/data'], ['Dokumentacja', '/doc'], ['Wyloguj', '/logout']]
    }
    else
    {
        menuOptions = [['Rejestracja', '/register'], ['Logowanie', '/login'], ['Dokumentacja', '/doc']]
    }

    const homePath = "/~9libucha/project2"

    const Main = () => {
        return (
            <Routes>
                <Route exact path={`${homePath}/`} element={logged ? <PollMenu homePath={homePath} /> : <RegisterForm />}></Route>
                <Route exact path={`${homePath}/register`} element={<RegisterForm/>}></Route>
                <Route exact path={`${homePath}/login`} element={<LoginForm  homePath={homePath} updateLogged={() => {updateLogged()}} />}></Route>
                <Route exact path={`${homePath}/polls`} element={<PollMenu homePath={homePath} />}></Route>
                <Route exact path={`${homePath}/poll/*`} element={<Poll homePath={homePath} />}></Route>
                <Route exact path={`${homePath}/data`} element={<DataView />}></Route>
                <Route exact path={`${homePath}/doc`} element={<Documentation />}></Route>
                <Route exact path={`${homePath}/logout`} element={<Logout homePath={homePath} updateLogged={() => {updateLogged()}} />}></Route>
            </Routes>
    )}

    return (
    <div className="App">
        <MainMenu menuOptions={menuOptions} homePath={homePath} />
        <Main />
    </div>
    )
}

export default App;

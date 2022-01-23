import {NavLink, useLocation} from 'react-router-dom'
import "./TabButton.css"

function TabButton(props)
{
    const path = useLocation().pathname;

    return (
        <NavLink to={props.link} className={'tab_button ' + (path == props.link ? 'tab_button_active' : 'tab_button_inactive')}>{props.tabName}</NavLink>
    )
}

export default TabButton;

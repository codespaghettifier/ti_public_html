import {NavLink} from 'react-router-dom'
import './PollMenu.css'

function PollMenu(props)
{
    return (
        <div className='center_content'>
            <div className='poll_menu_items'>
                <NavLink to={`${props.homePath}/poll/template`}>
                    <h4 className='poll_link'>Template</h4>
                </NavLink>
                <NavLink to={`${props.homePath}/poll/test_poll`}>
                    <h4 className='poll_link'>Ankieta testowa</h4>
                </NavLink>
            </div>
        </div>
    )
}

export default PollMenu

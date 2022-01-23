import TabButton from '../TabButton/TabButton.js'
import './MainMenu.css'

function MainMenu(props)
{
    return (
        <nav className='main_menu'>
            {props.menuOptions.map(item => {return <TabButton tabName={item[0]} link={`${props.homePath}${item[1]}`} key={item[0]} />})}
        </nav>
    )
}

export default MainMenu

import './PollNavigationButton.css'

function PollNavigationButton(props)
{
    return (
        <div className={'button ' + (props.active ? 'button_active' : 'button_inactive')} style={props.style} onClick={props.active ? props.clickCallback : () => {}}>
            <p>{props.text}</p>
        </div>
    )
}

export default PollNavigationButton;

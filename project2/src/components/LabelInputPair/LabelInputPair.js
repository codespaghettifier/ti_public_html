import React, {useState} from "react"
import "./LabelInputPair.css"

function LabelInputPair(props)
{
    const [showValidity, setShowValidity] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleBlur = () => {
        if(!showValidity) setShowValidity(true);
    }

    const handleInput = (event) => {
        const newValid = event.target.value.length > 0;
        setIsValid(newValid)

        props.valueChangeCallback(event.target.value);
    }

    return (
        <div className="label_input_pair">
            <p>{props.label}<span className="error_info">{props.errorLabel}</span></p>
            <input type="text" size="32" className={isValid || !showValidity ? 'valid_text_input' : 'invalid_text_input'} onBlur={handleBlur} onInput={handleInput}/>
        </div>
    );
}

export default LabelInputPair

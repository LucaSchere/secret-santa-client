import React, {ChangeEventHandler, ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';
import './Input.scss';
import {InputRule, ValidationHandle} from "../../types";

interface IInputProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    validation?: { rules: InputRule[], invalidMessage: string };
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef((props: IInputProps, ref: ForwardedRef<ValidationHandle>) => {

    const [isInvalid, setIsInvalid] = useState(true);
    const [validated, setValidated] = useState(false);

    useImperativeHandle(ref, () => ({
        validate: () => {
            let isValid = false;
            props.validation?.rules.forEach(rule => {
                switch (rule) {
                    case 'required':
                        isValid = props.value.length > 0;
                        break;
                    default:
                        if (rule.startsWith('min-length:')) {
                            const minLength = parseInt(rule.split(':')[1]);
                            isValid = props.value.length >= minLength;
                        }
                        if (rule.startsWith('regex:')) {
                            const regex = new RegExp(rule.split(':')[1]);
                            isValid = regex.test(props.value);
                        }
                }
            });
            setValidated(true);
            setIsInvalid(!isValid);
            return isValid;
        }
    }));

    return (
        <div className={`input ${(isInvalid && validated) && 'invalid'}`}>
            <input type="text" id={props.id}
                   className="input-text"
                   placeholder={props.placeholder}
                   onChange={props.onChange}
                   value={props.value}/>
            <label htmlFor={props.id}
                   className="input-label"><span className='label-text'>{props.validation && (isInvalid && validated)
                ? props.validation?.invalidMessage : props.label}</span></label>
        </div>
    );
});
export default Input;
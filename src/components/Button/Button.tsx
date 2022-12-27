import React, {MouseEventHandler} from "react";
import './Button.scss';

interface IButtonProps {
    text: string;
    danger?: boolean;
    transparent?: boolean;
    matchContent?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButtonProps) => {
    return (
        <button className={`button ${props.transparent && 'transparent'} ${props.matchContent && 'match-content'} ${props.danger && 'danger'}`} onClick={props.onClick}>{props.text}</button>
    );
}
export default Button;
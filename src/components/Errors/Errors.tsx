import React from 'react';
import {Popup} from "../Popup/Popup";
import {Error} from "../../types";

interface IErrorsProps {
    errors: Error[];
}

const Errors = (props: IErrorsProps) => {
    return (
        <>
            {props.errors.map( (error, index) => {
                return <Popup key={index} error={error}/>
            })}
        </>
    );
}

export default Errors;
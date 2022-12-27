import React from 'react';
import './Popup.scss';
import {Error} from "../../types";

interface IPopupProps {
    error: Error;
}

export const Popup = (props: IPopupProps) => {
    return (
        <div className='popup'>
            {props.error.message}
        </div>
    );
}
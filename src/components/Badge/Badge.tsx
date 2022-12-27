import React, {useState} from 'react';
import './Badge.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList, faClipboardCheck} from "@fortawesome/free-solid-svg-icons";

interface IBadgeProps {
    text: string;
}

const Badge = (props: IBadgeProps) => {

    const [icon, setIcon] = useState(faClipboardList);

    const handleBadgeClick = () => {
        navigator.clipboard.writeText(props.text).then(() => {
            setIcon(faClipboardCheck);
            setTimeout(() => setIcon(faClipboardList), 1000);
        });
    };

    return (
        <span onClick={handleBadgeClick} className='badge'>
            <span className='badge-text'>{props.text}</span>
            <div className='badge-icon'>
                <FontAwesomeIcon icon={icon}/>
            </div>
        </span>
    );
}

export default Badge;
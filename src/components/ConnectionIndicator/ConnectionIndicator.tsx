import React, {useContext, useState} from 'react';
import './ConnectionIndicator.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi} from "@fortawesome/free-solid-svg-icons";
import {StringsContext} from "../App/App";

interface IConnectionIndicatorProps {
    isConnected: boolean;
}

const ConnectionIndicator = (props: IConnectionIndicatorProps) => {

    const strings = useContext(StringsContext);

    const [showIcon, setShowIcon] = useState(true);
    const handleIconClick = () => setShowIcon(false);
    const handleTextClick = () => setShowIcon(true);

    return (
        <>
            {showIcon ?
                <FontAwesomeIcon onClick={handleIconClick} icon={faWifi}
                                 className={`icon ${!props.isConnected && 'inactive'}`}/>
                :
                <span onClick={handleTextClick}
                      className='indicator-text'>{props.isConnected ? strings.connected : strings.not_connected}</span>
            }
        </>
    );
};

export default ConnectionIndicator;
import React from 'react';
import './Member.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown} from "@fortawesome/free-solid-svg-icons";

interface IMemberProps {
    name: string;
    size: 1 | 2 | 3;
    position: number;
    key?: string;
    santaOf?: boolean;
    crown?: boolean;
}

const Member = (props: IMemberProps) => {

    const delayType = props.position % 3 === 0 ? '3' : props.position % 2 === 0 ? '2' : '1';

    return (
        <div className={`member member-${props.size}`}>
            <span className={`delay-${delayType} ${props.santaOf && 'santa-of'}`}>{props.name}</span>
            <div className='crown'>
                {props.crown && <FontAwesomeIcon icon={faCrown}/>}
            </div>
        </div>
    );
}

export default Member;
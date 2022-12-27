import React, {useContext} from 'react';
import './Room.scss';
import {SocketContext, StringsContext} from "../App/App";
import Member from "../Member/Member";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";

interface IRoomProps {
    leaveRoomHandler: () => void;
}

const Room = (props: IRoomProps) => {

    const context = useContext(SocketContext);
    const strings = useContext(StringsContext);

    const SMALL_AMOUNT_OF_MEMBERS = 6;
    const MEDIUM_AMOUNT_OF_MEMBERS = 12;

    const memberSize =
        context.room.members.length < SMALL_AMOUNT_OF_MEMBERS ? 3
            : context.room.members.length < MEDIUM_AMOUNT_OF_MEMBERS ? 2
                : 1;

    // TODO
    const handleLeaveClick = () => {
        window.confirm(strings.room.leave_confirm) && props.leaveRoomHandler();
    }

    const handleDrawClick = () => {
        context.socket.emit('draw-room', {roomId: context.room.roomId});
    }

    return (
        <div className='room-container'>
            <div className='status'>
                <div className='lock'>
                    <FontAwesomeIcon icon={context.room.started ? faLock : faLockOpen}/>
                </div>
                {context.room.started ? strings.room.room_locked : strings.room.room_open}
            </div>
            <div className='room-name'>
                <span className='no-wrap'>{context.room.name}</span>
                <Badge text={context.room.roomId}/>
            </div>
            <div className={`members ${context.room.started && context.santaOf === '' && 'started'}`}>
                {context.room.members.map((member, index: number) => {
                    return <Member name={member.name}
                                   size={memberSize}
                                   key={member.id}
                                   crown={context.room.owner === member.id}
                                   santaOf={context.santaOf === member.id}
                                   position={index}/>
                })}
            </div>
            <div className='actions'>
                {context.room.owner === context.room.you && !context.room.started && <Button text={strings.room.draw} onClick={handleDrawClick}/>}
                <Button text={strings.room.leave} danger={true} onClick={handleLeaveClick}/>
            </div>
        </div>
    );
}
export default Room;
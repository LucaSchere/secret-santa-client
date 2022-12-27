import React, {createRef, FormEvent, useContext, useEffect, useState} from 'react';
import {SocketContext, StringsContext} from "../App/App";
import './Entrance.scss';
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Mode, ValidationHandle} from "../../types";


const Entrance = () => {
    const socketContext = useContext(SocketContext);
    const strings = useContext(StringsContext);

    const [mode, setMode] = useState<Mode>('join');

    const [changes, setChanges] = useState(false);

    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [nickName, setNickName] = useState('');

    const nickNameRef = createRef<ValidationHandle>();
    const roomNameRef = createRef<ValidationHandle>();
    const roomIdRef = createRef<ValidationHandle>();

    const handleRoomNameChange = (event: FormEvent<HTMLInputElement>) => setRoomName(event.currentTarget.value);
    const handleRoomIdChange = (event: FormEvent<HTMLInputElement>) => setRoomId(event.currentTarget.value);
    const handleNickNameChange = (event: FormEvent<HTMLInputElement>) => setNickName(event.currentTarget.value);
    const handleModeClick = () => setMode(mode => mode === 'join' ? 'create' : 'join');

    const checkForRoomIdParameter = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('roomId');
        setRoomId(roomId || '');
    }

    useEffect(() => {
       checkForRoomIdParameter();
    }, []);

    useEffect(() => {
        setChanges(true);
    }, [roomName, roomId, nickName]);

    const handleJoinClick = () => {
        const nickNameIsValid = nickNameRef.current?.validate();
        const roomIdIsValid = roomIdRef.current?.validate();
        if (nickNameIsValid && roomIdIsValid && changes) {
            setChanges(false);
            socketContext.socket.emit('join-room', {nickName: nickName, roomId: roomId});
        }
    }
    const handleCreateClick = () => {
        const roomNameIsValid = roomNameRef.current?.validate();
        const nickNameIsValid = nickNameRef.current?.validate();
        if (roomNameIsValid && nickNameIsValid && changes) {
            setChanges(false);
            socketContext.socket.emit('create-room', {nickName: nickName, roomName: roomName});
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (mode === 'join') {
                    handleJoinClick();
                } else if (mode === 'create') {
                    handleCreateClick();
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div className='entrance-container'>
            <Input ref={nickNameRef} id='nickName' value={nickName} placeholder={strings.entrance.nick_name.placeholder}
                   label={strings.entrance.nick_name.label}
                   validation={{rules: ['required'], invalidMessage: strings.entrance.nick_name.validation}}
                   onChange={handleNickNameChange}/>
            {mode === 'create' ?
                <section id='create-section' className='section'>
                    <Input ref={roomNameRef} id='roomName' value={roomName}
                           placeholder={strings.entrance.room_name.placeholder}
                           label={strings.entrance.room_name.label}
                           validation={{
                               rules: ['required', 'min-length:3'],
                               invalidMessage: strings.entrance.room_name.validation
                           }}
                           onChange={handleRoomNameChange}/>
                    <div className='buttons'>
                        <Button text={strings.entrance.room_create_short} onClick={handleCreateClick}/>
                        <Button text={strings.entrance.room_join} transparent={true} matchContent={true}
                                onClick={handleModeClick}/>
                    </div>
                </section>
                :
                <section id='join-section' className='section'>
                    <Input ref={roomIdRef} id='roomId' value={roomId}
                           placeholder={strings.entrance.room_id.placeholder}
                           label={strings.entrance.room_id.label}
                           validation={{
                               rules: ['required', 'regex:^[0-9A-Z]{6}$'],
                               invalidMessage: strings.entrance.room_id.validation
                           }}
                           onChange={handleRoomIdChange}/>
                    <div className='buttons'>
                        <Button text={strings.entrance.room_join_short} onClick={handleJoinClick}/>
                        <Button text={strings.entrance.room_create} transparent={true} matchContent={true}
                                onClick={handleModeClick}/>
                    </div>
                </section>
            }
        </div>
    );
}

export default Entrance;
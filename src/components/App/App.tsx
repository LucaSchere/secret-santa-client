import React, {useEffect, useState} from 'react';
import './App.scss';
import Entrance from "../Entrance/Entrance";
import io, {Socket} from 'socket.io-client';
import {IClientToServerEvents, IServerToClientEvents} from "../../socketTypes";
import ConnectionIndicator from "../ConnectionIndicator/ConnectionIndicator";
import * as types from "../../types";
import Room from "../Room/Room";
import {Error} from "../../types";
import {Strings, languages} from "../../strings";
import Errors from "../Errors/Errors";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const websocketUrl: string = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:8080';

export const SocketContext = React.createContext({
    socket: {} as Socket<IServerToClientEvents, IClientToServerEvents>,
    room: {} as types.Room,
    santaOf: ''
});

export const StringsContext = React.createContext(
    {} as Strings
);

const App = () => {

    const defaultRoom: types.Room = {roomId: '', members: [], name: '', owner: '', you: '', started: false};

    const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(websocketUrl);
    const [room, setRoom] = useState(defaultRoom);
    const [santaOf, setSantaOf] = useState('');
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [errors, setErrors] = useState([] as Error[]);

    const storedLang = window.localStorage.getItem('lang') || 'en';
    const [strings, setStrings] = useState(languages[storedLang] || languages['en']);

    const leaveRoom = () => {setRoom(defaultRoom)};

    const handleErrors = (error: Error) => {
        if (strings.errors.hasOwnProperty(error.message)) {
            error.slug = error.message;
            error.message = strings.errors[error.message];
            setErrors([...errors, error])
        }
    }

    const handleResults = (args: {room: types.Room, santaOf: string}) => {
        setRoom(args.room);

        setTimeout(() => {
            setSantaOf(args.santaOf);
        }, 3000);
    };

    useEffect(() => {
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));
        socket.on('changed-room', room => setRoom(room));
        socket.on('draw-results', handleResults);
        socket.on('error', handleErrors);
    });

    return (
        <StringsContext.Provider value={strings}>
            <header>
                <LanguageSelector onLanguageChange={(lang: string) => {
                    setStrings(languages[lang] || languages['en']);
                    window.localStorage.setItem('lang', lang);
                }}/>
            </header>
            <div className='container'>
                <SocketContext.Provider value={{socket, room, santaOf}}>
                    {room.roomId === '' && <Entrance/>}
                    {room.roomId.length > 0 && <Room leaveRoomHandler={leaveRoom}/>}
                </SocketContext.Provider>
            </div>
            <footer>
                <ConnectionIndicator isConnected={isConnected}/>
                <span className='footer-text'>by <a href="https://github.com/LucaSchere" target='_blank'
                                                    rel='noreferrer'>Luca Scherer</a></span>
            </footer>
            <Errors errors={errors}/>
        </StringsContext.Provider>
    );
}

export default App;

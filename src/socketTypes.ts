import {Room} from "./types";
import {Error} from "./types";

export interface IClientToServerEvents {
    'create-room': (args: {nickName: string, roomName: string}) => void;
    'join-room': (args: {nickName: string, roomId: string}) => void;
    'draw-room': (args: {roomId: string}) => void;
}

export interface IServerToClientEvents {
    'changed-room': (room: Room) => void;
    'draw-results': (args: {room: Room, santaOf: string}) => void;
    'error': (error: Error) => void;
}
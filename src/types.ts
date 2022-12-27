export type Room = {
    roomId: string;
    members: { name: string, id:string }[];
    name: string;
    owner: string;
    you: string;
    started: boolean;
}

export type Error = {
    slug?: string;
    message: string;
}

export type Mode = 'join' | 'create';

export type InputRule = 'required' | `min-length:${string}` | `regex:${string}`;

export type ValidationHandle = { validate: () => void };
declare type FrameParts = "info"|"action"|"display"

declare type FrameTypes = "normal"|"dialog"|"action"|"cg"

interface Window{
    gameConfig:Config
}

declare interface Config {
    window?: {
        canvas?: boolean,
        html_window?: boolean,
        frame?:{
            framesMax?:number,
            infoMax?:number
        }
    },
    text?: {
        size?: "S" | "M" | "L"
    }
}

declare interface GameEvent {
    frameType: FrameTypes,
    info?: {
        default?: {
            style?: {}
        },
        infos: Info[]
    },
    display?: {
        default?: {
            style?: {}
        },
        content:DisplayContent[]
    },
    action?: {
        default?: {
            style?: {}
        },
        actions:Action[]
    }
}

type Info = {
    char?: string|number,
    content: ({
        style?: {},
        text: string
    } | string)[]
} | string

type DisplayContentType = "line"|"title"|"bar"|"card"

type DisplayContent = {
    type:DisplayContentType,
    detail?:{},
    args?:{}
}

type ActionType = "loadEvent"|"loadMap"|"loadDialog"|"function"

type Action = {
    index:number,
    text:string,
    type:ActionType,
    targt:string,
    args?:{}
}
declare type FrameParts = "info"|"action"|"display"

declare type normalFrame = "normal" // 普通帧，上方一行info，中间大面积display，下方一行action
declare type dialogFrame = "dialog" // 对话帧，隐藏display，上面大面积info，下方一行action
declare type actionFrame = "action" // 行动帧，上方一行info，下方分两块，左边为display，右边为action
declare type cgFrame ="cg" // CG帧，隐藏action，上方大面积display，下方一行info

declare type FrameTypes = normalFrame|dialogFrame|actionFrame|cgFrame

declare interface Config {
    window?: {
        canvas?: boolean,
        html_window?: boolean,
        frame?:{
            framesMax?:number
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
    dispaly?: {
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
    content: {
        style?: {},
        text: string
    } | string[]
} | string

type DisplayContentType = "line"|"title"|"bar"|"card"

type DisplayContent = {
    type:DisplayContentType,
    detail:{},
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
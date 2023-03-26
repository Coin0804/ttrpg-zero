import path from "path"
import { Frame } from "./Frame"

export default class H5window{
    element:HTMLElement
    frameId:number = 0
    frames:Frame[] = []
    frame:Frame
    
    config:Config

    rootDir = "/game"

    constructor(h5w:HTMLElement,config:Config){
        this.element = h5w
        this.config = config
    }

    newFrame(frametype?:FrameTypes){
        this.frame = new Frame(this.frameId,frametype)
        if(this.frames.length > (this.config?.window?.frame?.framesMax || 50)){
            let f = this.frames.shift()
            f.element.remove()
        }
        this.frames.push(this.frame)
        this.element.appendChild(this.frame.element)
    }

    loadEvent(fileName:string,dir:string = "event"){
        const event:GameEvent = require(path.join(process.cwd(),this.rootDir,dir,fileName+".json"))
        this.newFrame(event.frameType)

    }


}
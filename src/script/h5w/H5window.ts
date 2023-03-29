import path from "path"
import { Frame } from "./Frame"
import { bindStyle } from "./Tool"

export class H5window{
    element:HTMLElement
    frameId:number = 0
    frames:Frame[] = []
    frame:Frame
    
    rootDir = "/game"

    constructor(h5w:HTMLElement){
        this.element = h5w
    }

    newFrame(frametype?:FrameTypes){
        if(this.frames.length > (window.gameConfig?.window?.frame?.framesMax || 50)){
            let f = this.frames.shift()
            f.element.remove()
        }
        this.frame = new Frame(this.frameId++,frametype)
        this.frames.push(this.frame)
        this.element.appendChild(this.frame.element)
    }

    loadEvent(fileName:string,dir:string = "event"){
        const event:GameEvent = require(path.join(process.cwd(),this.rootDir,dir,fileName+".json"))
        this.newFrame(event.frameType)
        // readinfo
        if(event.info){
            let style = event.info?.default?.style
            bindStyle(this.frame.parts.info,style)
            for(let i of event.info.infos){
                this.frame.addInfoContent(i)
            }
        }
        //





    }

    

}
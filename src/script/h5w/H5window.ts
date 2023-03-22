import { Frame } from "./Frame"

export default class H5window{
    main:HTMLElement
    frameId:number = 0
    frames:Frame[] = []
    frame:Frame
    
    constructor(h5w:HTMLElement){
        this.main = h5w
        this.newFrame()
    }

    newFrame(){
        this.frame = new Frame(this.main,this.frameId)
        this.frames[this.frameId++]=this.frame
    }



}
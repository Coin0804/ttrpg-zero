import { bindStyle } from "./Tool"

export function blankFrameParts():{[key in FrameParts]:HTMLDivElement}{
    return {
        info:undefined,
        action:undefined,
        display:undefined
    }
}

export class Frame{
    id:number
    element:HTMLDivElement
    parts = blankFrameParts()
    content:{[key in FrameParts]:HTMLDivElement[]} = {
        info:[],
        action:[],
        display:[]
    }
    contentId = 0;
    constructor(id:number,type:FrameTypes="normal"){
        // bind basic attr
        this.id = id
        this.element = document.createElement("div")
        this.element.classList.add("frame")
        this.element.id = "frame_"+this.id
        // create all parts & appendChild
        for(let n in this.parts){
            this.newpart(n as FrameParts)
        }
        this.switchFrameType(type)
    }

    switchFrameType(type:FrameTypes){
        if(type == "normal"){
            this.element.style.flexDirection = "column"
            // this.parts.info.style.
        }
    }

    newpart(name:FrameParts){
        let temp = document.createElement("div")
        temp.classList.add("part"+name)
        temp.id = "frame_"+this.id+"_"+name
        this.parts[name] = temp
        this.element.appendChild(temp)
    }

    addInfoContent(info:Info){
        if(typeof(info) == "string"){
            this.newInfoElement(info)
        }else{
            let head = info.char ? (info.char+" : ") : ""
            for(let c of info.content){
                if(typeof(c) == "string"){
                    this.newInfoElement(head+c)
                }else{
                    let temp = this.newInfoElement(head+c.text)
                    bindStyle(temp,c.style)
                }
            }
        }
    }

    newInfoElement(text:string){
        if(this.content.info.length > (window.gameConfig?.window?.frame?.infoMax||50)){
            let i = this.content.info.shift()
            i.remove()
        }
        let temp = document.createElement("div")
        temp.classList.add("infocontent")
        temp.id = "frame_"+this.id+"_content_"+this.contentId++
        temp.appendChild(document.createTextNode(text))
        this.content.info.push(temp)
        this.parts.info.appendChild(temp)
        return temp
    }

    addActionContent(){

    }

    addDispalyContent(){
        
    }

}




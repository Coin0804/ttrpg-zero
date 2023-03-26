export const FramePartsList:readonly FrameParts[] = ["info","display","action"] as const

export class Frame{
    id:number
    element:HTMLDivElement
    parts:{[key in FrameParts]?:HTMLDivElement} = {}
    constructor(id:number,type:FrameTypes="normal"){
        // bind basic attr
        this.id = id
        this.element = document.createElement("div")
        this.element.classList.add("frame")
        this.element.id = "frame_"+this.id
        // create all parts & appendChild
        for(let p of FramePartsList){
            this.newpart(p)
        }
        this.switchFrameType(type)
    }

    switchFrameType(type:FrameTypes){
        switch (type) {
            case "normal":
                
                break;
        
            default:
                break;
        }
    }

    newpart(name:FrameParts){
        let temp = document.createElement("div")
        temp.classList.add[name]
        temp.id = "frame_"+this.id+"_"+name
        this.parts[name] = temp
        this.element.appendChild(temp)
    }


}




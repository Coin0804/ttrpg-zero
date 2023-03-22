export class Frame{
    id:number
    parent:HTMLElement
    info:HTMLDivElement
    display:HTMLDivElement
    action:HTMLDivElement
    constructor(parent:HTMLElement,id:number,type:FrameTypes="normal"){
        this.id = id
        this.parent = parent
        this.info = this.newpart("info")
        this.display = this.newpart("display")
        this.action = this.newpart("action")
        parent.appendChild(this.info)
        parent.appendChild(this.display)
        parent.appendChild(this.action)
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
        return temp
    }


}




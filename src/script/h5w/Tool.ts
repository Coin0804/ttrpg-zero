export function bindStyle(element:HTMLElement,style:{} = {}){
    for(let i in style){
        element.style[i] = style[i]
    }
}
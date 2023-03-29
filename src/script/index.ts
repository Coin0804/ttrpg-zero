import {H5window} from "./h5w/H5window";
import path from "path";

function main(){
    // Check config file
    const config:Config = require(path.join(process.cwd(),"game.config.json"));
    if(!config) throw new Error(`No "game.config.json" found. Please check the file.`)
    window.gameConfig = config
    // Check canvas & window
    const canvas = config?.window?.canvas ? document.getElementById("canvas") : undefined
    if(canvas) canvas.style.display = "block"
    const h5w = !canvas&&config?.window?.html_window ? document.getElementById("html_window") : undefined
    if(h5w) h5w.style.display = "block"
    if(!canvas&&!h5w) throw new Error(`No useable window.Please check "game.config.json".`)
    // init for h5w
    const win = new H5window(h5w)
    win.loadEvent("Title")
}
// run
try{main()}catch(e){alert(e)}



















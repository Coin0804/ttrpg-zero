'use strict';

var path = require('path');

const FramePartsList = ["info", "display", "action"];
class Frame {
    constructor(id, type = "normal") {
        this.parts = {};
        // bind basic attr
        this.id = id;
        this.element = document.createElement("div");
        this.element.classList.add("frame");
        this.element.id = "frame_" + this.id;
        // create all parts & appendChild
        for (let p of FramePartsList) {
            this.newpart(p);
        }
        this.switchFrameType(type);
    }
    switchFrameType(type) {
    }
    newpart(name) {
        let temp = document.createElement("div");
        temp.classList.add[name];
        temp.id = "frame_" + this.id + "_" + name;
        this.parts[name] = temp;
        this.element.appendChild(temp);
    }
}

class H5window {
    constructor(h5w, config) {
        this.frameId = 0;
        this.frames = [];
        this.rootDir = "/game";
        this.element = h5w;
        this.config = config;
    }
    newFrame(frametype) {
        var _a, _b, _c;
        this.frame = new Frame(this.frameId, frametype);
        if (this.frames.length > (((_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.frame) === null || _c === void 0 ? void 0 : _c.framesMax) || 50)) {
            let f = this.frames.shift();
            f.element.remove();
        }
        this.frames.push(this.frame);
        this.element.appendChild(this.frame.element);
    }
    loadEvent(fileName, dir = "event") {
        const event = require(path.join(process.cwd(), this.rootDir, dir, fileName + ".json"));
        this.newFrame(event.frameType);
    }
}

function main() {
    var _a, _b;
    // Check config file
    const config = require(path.join(process.cwd(), "game.config.json"));
    if (!config)
        throw new Error(`No "game.config.json" found. Please check the file.`);
    // Check canvas & window
    const canvas = ((_a = config === null || config === void 0 ? void 0 : config.window) === null || _a === void 0 ? void 0 : _a.canvas) ? document.getElementById("canvas") : undefined;
    if (canvas)
        canvas.style.display = "block";
    const h5w = !canvas && ((_b = config === null || config === void 0 ? void 0 : config.window) === null || _b === void 0 ? void 0 : _b.html_window) ? document.getElementById("html_window") : undefined;
    if (h5w)
        h5w.style.display = "block";
    if (!canvas && !h5w)
        throw new Error(`No useable window.Please chek "game.config.json".`);
    // init for h5w
    const win = new H5window(h5w, config);
    win.loadEvent("Title");
}
// run
try {
    main();
}
catch (e) {
    alert(e);
}
//# sourceMappingURL=main.js.map

'use strict';

var path = require('path');

function bindStyle(element, style = {}) {
    for (let i in style) {
        element.style[i] = style[i];
    }
}

function blankFrameParts() {
    return {
        info: undefined,
        action: undefined,
        display: undefined
    };
}
class Frame {
    constructor(id, type = "normal") {
        this.parts = blankFrameParts();
        this.content = {
            info: [],
            action: [],
            display: []
        };
        this.contentId = 0;
        // bind basic attr
        this.id = id;
        this.element = document.createElement("div");
        this.element.classList.add("frame");
        this.element.id = "frame_" + this.id;
        // create all parts & appendChild
        for (let n in this.parts) {
            this.newpart(n);
        }
        this.switchFrameType(type);
    }
    switchFrameType(type) {
        if (type == "normal") {
            this.element.style.flexDirection = "column";
            // this.parts.info.style.
        }
    }
    newpart(name) {
        let temp = document.createElement("div");
        temp.classList.add("part" + name);
        temp.id = "frame_" + this.id + "_" + name;
        this.parts[name] = temp;
        this.element.appendChild(temp);
    }
    addInfoContent(info) {
        if (typeof (info) == "string") {
            this.newInfoElement(info);
        }
        else {
            let head = info.char ? (info.char + " : ") : "";
            for (let c of info.content) {
                if (typeof (c) == "string") {
                    this.newInfoElement(head + c);
                }
                else {
                    let temp = this.newInfoElement(head + c.text);
                    bindStyle(temp, c.style);
                }
            }
        }
    }
    newInfoElement(text) {
        var _a, _b, _c;
        if (this.content.info.length > (((_c = (_b = (_a = window.gameConfig) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.frame) === null || _c === void 0 ? void 0 : _c.infoMax) || 50)) {
            let i = this.content.info.shift();
            i.remove();
        }
        let temp = document.createElement("div");
        temp.classList.add("infocontent");
        temp.id = "frame_" + this.id + "_content_" + this.contentId++;
        temp.appendChild(document.createTextNode(text));
        this.content.info.push(temp);
        this.parts.info.appendChild(temp);
        return temp;
    }
    addActionContent() {
    }
    addDispalyContent() {
    }
}

class H5window {
    constructor(h5w) {
        this.frameId = 0;
        this.frames = [];
        this.rootDir = "/game";
        this.element = h5w;
    }
    newFrame(frametype) {
        var _a, _b, _c;
        if (this.frames.length > (((_c = (_b = (_a = window.gameConfig) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.frame) === null || _c === void 0 ? void 0 : _c.framesMax) || 50)) {
            let f = this.frames.shift();
            f.element.remove();
        }
        this.frame = new Frame(this.frameId++, frametype);
        this.frames.push(this.frame);
        this.element.appendChild(this.frame.element);
    }
    loadEvent(fileName, dir = "event") {
        var _a, _b;
        const event = require(path.join(process.cwd(), this.rootDir, dir, fileName + ".json"));
        this.newFrame(event.frameType);
        // readinfo
        if (event.info) {
            let style = (_b = (_a = event.info) === null || _a === void 0 ? void 0 : _a.default) === null || _b === void 0 ? void 0 : _b.style;
            bindStyle(this.frame.parts.info, style);
            for (let i of event.info.infos) {
                this.frame.addInfoContent(i);
            }
        }
        //
    }
}

function main() {
    var _a, _b;
    // Check config file
    const config = require(path.join(process.cwd(), "game.config.json"));
    if (!config)
        throw new Error(`No "game.config.json" found. Please check the file.`);
    window.gameConfig = config;
    // Check canvas & window
    const canvas = ((_a = config === null || config === void 0 ? void 0 : config.window) === null || _a === void 0 ? void 0 : _a.canvas) ? document.getElementById("canvas") : undefined;
    if (canvas)
        canvas.style.display = "block";
    const h5w = !canvas && ((_b = config === null || config === void 0 ? void 0 : config.window) === null || _b === void 0 ? void 0 : _b.html_window) ? document.getElementById("html_window") : undefined;
    if (h5w)
        h5w.style.display = "block";
    if (!canvas && !h5w)
        throw new Error(`No useable window.Please check "game.config.json".`);
    // init for h5w
    const win = new H5window(h5w);
    win.loadEvent("Title");
}
// run
try {
    main();
}
catch (e) {
    alert(e);
}
//# sourceMappingURL=core.js.map

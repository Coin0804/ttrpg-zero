import path from 'path';

class Frame {
    constructor(parent, id, type = "normal") {
        this.id = id;
        this.parent = parent;
        this.info = this.newpart("info");
        this.display = this.newpart("display");
        this.action = this.newpart("action");
        parent.appendChild(this.info);
        parent.appendChild(this.display);
        parent.appendChild(this.action);
        this.switchFrameType(type);
    }
    switchFrameType(type) {
    }
    newpart(name) {
        let temp = document.createElement("div");
        temp.classList.add[name];
        temp.id = "frame_" + this.id + "_" + name;
        return temp;
    }
}

class H5window {
    constructor(h5w) {
        this.frameId = 0;
        this.frames = [];
        this.rootDir = "/src/game/";
        this.main = h5w;
        this.newFrame();
    }
    newFrame() {
        this.frame = new Frame(this.main, this.frameId);
        this.frames[this.frameId++] = this.frame;
    }
    loadEvent(fileName, dir = "event") {
        require(path.join(this.rootDir, dir, fileName + ".json"));
    }
}

function main() {
    var _a, _b;
    // Check config file
    const config = require("../game.config.json");
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
//# sourceMappingURL=main.js.map

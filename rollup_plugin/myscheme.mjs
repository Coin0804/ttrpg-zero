import tjs from "typescript-json-schema"
import path from 'path'
import fs from "fs"

export default function myscheme(){
    return {
        name: "rollup-plugin-myscheme",
        buildStart() {
            // 输出json模板文件
            const typefiles = ["src/script/types.d.ts"]
            const outDir = "./src"
            const myTypes = [
                { typeName: "Config", dir: "" },
                { typeName: "GameEvent", dir: "game/event" },
            ]
            for (let i of myTypes) {
                let program = tjs.getProgramFromFiles(typefiles)
                const a = tjs.generateSchema(program, i.typeName, { required: true })
                fs.writeFile(path.join(outDir, i.dir, "schema.json"), JSON.stringify(a), () => {
                    console.log(path.join(outDir, i.dir, "schema.json"))
                })
            }
        }
    }
}
import clear from 'rollup-plugin-clear'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import tjs from "typescript-json-schema"
import path from 'path'
import fs from "fs"


/**
 * 实际上的入口
 * 编译的过程实际上就是运行了这个文件
 * 再从编译的入口开始打包所需的文件
 */

// 输出json模板文件
const typefiles = ["src/script/types.d.ts"]
const outDir = "./src/game"
const myTypes = [
    {typeName:"GameEvent",dir:"event"},
]
for(let i of myTypes){
    let program = tjs.getProgramFromFiles(typefiles)
    const a = tjs.generateSchema(program,i.typeName,{required: true})
    fs.writeFile(path.join(outDir,i.dir,"schema.json"),JSON.stringify(a),()=>{
        console.log(path.join(outDir,i.dir,"schema.json"))
    })
}

export default {
    input: 'src/script/index.ts',//入口
    output: {
        file: 'src/page/js/main.js',//出口
        format: 'es',//以es形式编译
        sourcemap: true
    },
    plugins: [
        clear({ targets: ["src/page/js","dist"] }),// 清除上次编译成果，顺带把输出也清一下
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),//编译ts
    ]
};
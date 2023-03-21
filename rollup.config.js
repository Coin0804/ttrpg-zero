import clear from 'rollup-plugin-clear'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

/*
function pluginDev(){
    
}
*/

/**
 * 实际上的入口
 * 编译的过程实际上就是运行了这个文件
 * 再从编译的入口开始打包所需的文件
 */

export default {
    input: 'src/script/index.ts',//入口
    output: {
        file: 'src/page/js/main.js',//出口
        format: 'es',//以es形式编译
        sourcemap: true
    },
    plugins: [
        clear({ targets: ["src/page/js"] }),// 清除上次编译成果
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),//编译ts
    ]
};
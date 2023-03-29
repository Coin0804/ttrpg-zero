import clear from 'rollup-plugin-clear'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import dts from 'rollup-plugin-dts';
import myscheme from './rollup_plugin/myscheme.mjs';


/**
 * 实际上的入口
 * 编译的过程实际上就是运行了这个文件
 * 再从编译的入口开始打包所需的文件
 */
export default [
    {
        input: 'src/script/index.ts',//入口
        output: [
            {
                file: 'src/page/js/core.js',//出口
                format: 'cjs',//以cjs形式编译
                sourcemap: true
            },
        ],
        plugins: [
            myscheme(),
            clear({ targets: ["src/page/js","dist"] }),// 清除上次编译成果，顺带把输出也清一下
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),//编译ts
        ]
    },
    /* {
        input: 'src/script/index.ts',
        plugins:[
            dts({ tsconfig: "./tsconfig.json" }),
        ],
        output:{
            format: 'esm',
            file: 'src/page/js/core.d.ts'
        }
    }, */

]
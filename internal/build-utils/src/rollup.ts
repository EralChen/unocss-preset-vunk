
import { fixPath } from  './alias'
import { rollup, InputOptions, OutputOptions } from 'rollup'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import { libExternal } from '@lib-env/build-constants'
import commonjs from '@rollup/plugin-commonjs'

export function rollupComponents (opts: {
  files: string[],
  format?: OutputOptions['format'] 
  entry: (file: string) => string,
  outputFile: (file: string) => string,
  external?: (string|RegExp)[]
}) {
  const builds = opts.files.map(async (file: string) => {
    const entry = opts.entry(file)  // 入口
    const inputConfig: InputOptions = {
      input: entry,
      plugins: [
        css({
          output: 'index.css',
        }),
        vue({
          preprocessStyles: false,
        }),
        nodeResolve({
          extensions: ['.json', '.js',  '.ts'],
        }),
        esbuild(),
      ],
      external: [
        ...libExternal, 
        ...opts.external ?? [],
      ],
    }
    const bundle = await rollup(inputConfig)

    const outputConfig: OutputOptions = {
      format: opts.format || 'esm',
      file: opts.outputFile(file),
      paths: fixPath, // 修改别名到真实路径
    }
    await bundle.write(outputConfig)
  })
  return Promise.all(builds)
}

export async function rollupFile (opts: {
  inputFile: string,
  outputFile: string
  external?: (string|RegExp)[]
  format: OutputOptions['format'] 
}) {
  const inputConfig = {
    input: opts.inputFile,
    
    plugins: [
      nodeResolve({
        extensions: ['.js', '.json', '.ts'],
        browser: true,
      }),
      css({
        output: 'index.css',
      }),
      vue(),
      esbuild(), 
      commonjs(),
    ],
    external: [
      ...libExternal,
      ...opts.external ?? [],
    ],
  }
  const outConfig: OutputOptions = {
    format: opts.format || 'esm',
    file: opts.outputFile,
    paths: fixPath,
  } 
  const bundle = await rollup(inputConfig)
  return bundle.write(outConfig)

}

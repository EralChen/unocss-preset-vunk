import { series, parallel } from 'gulp'
import path from 'path'
import { taskWithName } from '@lib-env/shared'
import { genTypes, rollupFile } from '@lib-env/build-utils'
import { distDir, pkgsEntryDir } from '@lib-env/path'
import { LIB_ENTRY_FLIENAME } from '@lib-env/build-constants'

export default series(
  taskWithName('bundleFullEntry', async ()=> {
    rollupFile({
      inputFile: path.resolve(pkgsEntryDir, `./${LIB_ENTRY_FLIENAME}.ts`),
      outputFile: path.resolve(distDir, './index.cjs.js'),
      format: 'cjs',
    })
  }),
  parallel(
    taskWithName('genEntryTypes', async () => { // 生成入口 .d.ts
      genTypes({
        filesRoot: path.resolve(__dirname),
      })
    }),

  ),

)
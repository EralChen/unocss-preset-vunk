import { series } from 'gulp'
import { taskWithName } from '@lib-env/shared'
import fsp from 'fs/promises'
import fs from 'fs'
import { distDir, distTypesDir } from '@lib-env/path'
import { fixDtsPaths } from '@lib-env/build-utils'
import path from 'path'
import { LIB_ENTRY_DIRNAME, LIB_ENTRY_FLIENAME } from '@lib-env/build-constants'

export default series(
  taskWithName('fix dts path in distTypesDir', async () => {
    await fixDtsPaths({
      filesRoot: distTypesDir,
    })
  }),

  taskWithName('to-dist-type', async () => {
    const distDirFiles = await fsp.readdir(distDir, { withFileTypes: true })

    const coreDirNames = distDirFiles.filter(item => {
      return item.isDirectory() 
      && 
      path.resolve(distDir, item.name) !== distTypesDir
    }).map(item => item.name)

    const cpIntoCoreDir = async (dir: string) => {
      const files = await fsp.readdir(dir, { withFileTypes: true })
      await Promise.all(
        files.map(async item => {
          if (item.isDirectory() && coreDirNames.includes(item.name)) {
            await fsp.cp(path.resolve(dir, item.name), path.resolve(distDir, item.name), {
              recursive: true,
            })
          }
        }),
      )
    }

    await cpIntoCoreDir(distTypesDir)
    /* 有可能 type打包目录在 packages */
    const distTypesPkgsDir = path.resolve(distTypesDir, 'packages')
    if (fs.existsSync(distTypesPkgsDir)) {
      await cpIntoCoreDir(distTypesPkgsDir)
    }

    /* 如果 distTypesDir 中存在 entry, 将entry中的文件 拷贝到dist */
    const distTypesEntryDirs = [
      path.resolve(distTypesDir, LIB_ENTRY_DIRNAME),
      path.resolve(distTypesDir, 'packages', LIB_ENTRY_DIRNAME),
    ]

    await Promise.all(

      distTypesEntryDirs.map(async item => {
        if (fs.existsSync(item)) {
          return fsp.cp(item, distDir, {
            recursive: true,
          })
        }
      }),
      
    )


    /* rename */
    const distEntryDts = path.resolve(distDir, `${LIB_ENTRY_FLIENAME}.d.ts`)
    if (fs.existsSync(distEntryDts)) {
      await fsp.rename(distEntryDts, path.resolve(distDir, `index.d.ts`))
    }

    
  }),

  // taskWithName('clear types', async () => {
  //   await fsp.rm(distTypesDir, {
  //     force: true,
  //     recursive: true,
  //   })
  // }),
)
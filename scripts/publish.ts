import {series} from 'gulp'
import fsp from 'fs/promises'
import path from 'path'
import { entryPackage, distDir } from '@lib-env/path'
import { readJson, run, taskWithName, writeJson } from '@lib-env/shared'

export default series(
  taskWithName('update:vision', async () => {

    const fileObj = readJson(entryPackage) as { version: string; module: string }
    
    // 默认小版本+1
    const versionList = fileObj.version.split('.')
    const sVersion = versionList.at(-1)
    if (sVersion) {
      versionList[versionList.length - 1] = +sVersion + 1 + ''
    }
    fileObj.version = versionList.join('.')
 
    await writeJson(entryPackage, fileObj, 2)

  }),
  taskWithName('destPkg', async () => {
    const distPkgFile = path.resolve(distDir, './package.json')

    await fsp.cp(
      entryPackage,
      distPkgFile,
    )
    // 处理 pkg
    const jsonObj = readJson(distPkgFile) as { module: string, main: string, types: string }
    jsonObj.module = 'index.esm.js'
    jsonObj.main = 'index.esm.js'
    jsonObj.types = 'types/index'
    await writeJson(distPkgFile, jsonObj, 2)
    
  }),
  taskWithName('publish', async () => {
    run(
      'npm publish --tag alpha --registry https://registry.npmjs.org --access public',
      distDir,
    )
  }),
)

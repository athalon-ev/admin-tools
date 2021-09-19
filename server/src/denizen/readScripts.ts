import type { Dependencies } from '../dependencies'

async function recursiveReaddir(dependencies: Dependencies, dir: string, allFiles: string[] = []) {
    const files = (await dependencies.lib.fs.readdir(dir)).map(f => dependencies.lib.path.join(dir, f))
    allFiles.push(...files)
    await Promise.all(files.map(async f => (
        (await dependencies.lib.fs.stat(f)).isDirectory() && recursiveReaddir(dependencies, f, allFiles)
    )))
    return allFiles
}

export const listScripts = async (dependencies: Dependencies) =>
    recursiveReaddir(dependencies, dependencies.config.denizen.scriptFilesFolderPath)

export const readScript = async (dependencies: Dependencies, file: string) =>
    dependencies.lib.fs.readFile(file, 'utf8')

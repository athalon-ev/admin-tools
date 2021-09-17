import type { Dependencies } from '../dependencies'

const minecraftApiUrl = 'https://sessionserver.mojang.com/session/minecraft/profile'
const datFileEnding = '.dat'
export const listPlayers = async (dependencies: Dependencies) => {
    const files = await dependencies.lib.fs.readdir(dependencies.config.player.datFilesFolderPath)
    return await Promise.all(files
        .filter(f => !f.endsWith('_old'))
        .map(async file => ({
            file,
            info: (await dependencies.lib.axios.get(`${minecraftApiUrl}/${file.replace(datFileEnding, '')}`)).data
        }))
    )
}

export const getPlayerData = async (dependencies: Dependencies, uuid: string) => {
    const nbtBuffer = await dependencies.lib.fs.readFile(dependencies.lib.path.join(dependencies.config.player.datFilesFolderPath, uuid + datFileEnding))
    const { parsed } = await dependencies.lib.nbt.parse(nbtBuffer)
    return parsed.value
}

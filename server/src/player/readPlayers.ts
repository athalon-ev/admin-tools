import type { Dependencies } from '../dependencies'

const minecraftApiUrl = 'https://sessionserver.mojang.com/session/minecraft/profile'
const datFileEnding = '.dat'
interface PlayerInfo {
    id: string
    name: string
    properties: {
        name: string
        value: string
    }[]
}

const uuidCache: Record<string, PlayerInfo> = {}

const getPlayerInfoByUuid = async (dependencies: Dependencies, uuid: string) => {
    if (uuid in uuidCache) return uuidCache[uuid]
    uuidCache[uuid] = (await dependencies.lib.axios.get(`${minecraftApiUrl}/${uuid}`)).data
    return uuidCache[uuid]
}

export const listPlayers = async (dependencies: Dependencies) => {
    const files = await dependencies.lib.fs.readdir(dependencies.config.player.datFilesFolderPath)
    return await Promise.all(files
        .filter(f => !f.endsWith('_old'))
        .map(async file => ({
            file,
            uuid: file.replace(datFileEnding, ''),
            info: await getPlayerInfoByUuid(dependencies, file.replace(datFileEnding, ''))
        }))
    )
}

export const getPlayerData = async (dependencies: Dependencies, uuid: string) => {
    const nbtBuffer = await dependencies.lib.fs.readFile(dependencies.lib.path.join(dependencies.config.player.datFilesFolderPath, uuid + datFileEnding))
    const { parsed } = await dependencies.lib.nbt.parse(nbtBuffer)
    return parsed.value
}

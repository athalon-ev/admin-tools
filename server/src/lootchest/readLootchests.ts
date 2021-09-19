import type { Dependencies } from '../dependencies'
import * as R from 'ramda'

interface LootchestUnparsed {
    position: {
        world: string
        x: number
        y: number
        z: number
    }
    inventory: Record<string, {
        v: number
        amount: number
        meta: any
    }>
}

interface Lootchest extends LootchestUnparsed {
    id: string
}

interface LootchestYaml {
    chests: Record<string, LootchestUnparsed>
}

const getLootchestsYaml = (dependencies: Dependencies) =>
    dependencies.lib.fs.readFile(
        dependencies.config.lootchests.dataFilePath,
        'utf8'
    )

const getIndexedLootchests = (chests: LootchestYaml['chests']) =>
    Object.entries(chests)
        .map((chest) => ({ id: chest[0], ...chest[1] })) as Lootchest[]

const getLootchestMap = (chests: Lootchest[]) =>
    Object.fromEntries(chests.map(lootchest => [lootchest.id, lootchest]))

export const retrieveLootchests = async (dependencies: Dependencies) => {
    const buffer = await getLootchestsYaml(dependencies)
    const yaml = dependencies.lib.yaml.load(buffer) as LootchestYaml
    const lootchests = getIndexedLootchests(yaml.chests)
    return lootchests
}

export const listLootchests = async (dependencies: Dependencies) =>
    (await retrieveLootchests(dependencies)).map(R.pick(['id', 'position']))

export const getLootchestById = async (dependencies: Dependencies, id: string) => {
    const lootchests = getLootchestMap(await retrieveLootchests(dependencies))
    return lootchests[id]
}

export const saveLootchest = async (dependencies: Dependencies, id: string, lootchest: Lootchest) => {
    const lootchests = await retrieveLootchests(dependencies)
    const lootchestsObject = getLootchestMap(lootchests)
    lootchestsObject[id] = lootchest
    return dependencies.lib.fs.writeFile(dependencies.config.lootchests.dataFilePath, dependencies.lib.yaml.dump({ chests: lootchestsObject }))
}

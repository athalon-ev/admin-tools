import type { Dependencies } from '../dependencies'
import type * as KoaRouter from '@koa/router'

export default (dependencies: Dependencies, router: KoaRouter) => {
    router.get('/players', async ctx => {
        ctx.body = await dependencies.services.playerService.listPlayers(dependencies)
    })
    router.get('/players/:uuid', async ctx => {
        ctx.body = await dependencies.services.playerService.getPlayerData(dependencies, ctx.params.uuid)
    })
    router.get('/scripts', async ctx => {
        ctx.body = await dependencies.services.denizenService.listScripts(dependencies)
    })
    router.get('/lootchests', async ctx => {
        ctx.body = await dependencies.services.lootchestService.listLootchests(dependencies)
    })
    router.get('/lootchests/:id', async ctx => {
        ctx.body = await dependencies.services.lootchestService.getLootchestById(dependencies, ctx.params.id)
    })
    router.put('/lootchests/:id', async ctx => {
        await dependencies.services.lootchestService.saveLootchest(dependencies, ctx.params.id, ctx.request.body)
        ctx.response.status = 200
    })
    // router.get('/scripts/:id', async ctx => {
    //     ctx.body = await dependencies.services.denizenService.listScripts(dependencies)
    // })
}

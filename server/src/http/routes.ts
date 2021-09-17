import type { Dependencies } from '../dependencies'
import type * as KoaRouter from '@koa/router'

export default (dependencies: Dependencies, router: KoaRouter) => {
    router.get('/players', async ctx => {
        ctx.body = await dependencies.services.playerService.listPlayers(dependencies)
    })
    router.get('/players/:uuid', async ctx => {
        ctx.body = await dependencies.services.playerService.getPlayerData(dependencies, ctx.params.uuid)
    })
}

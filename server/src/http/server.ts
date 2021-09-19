import type { Dependencies } from '../dependencies'
import type Routes from './routes'

export default (dependencies: Dependencies, routes: typeof Routes) => {
    const { lib: { Koa, KoaRouter, console }, config } = dependencies
    const app = new Koa()
    app.use(dependencies.config.server.globalMiddlewares.KoaCors())
    app.use(dependencies.config.server.globalMiddlewares.KoaBody())
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            // @ts-ignore
            ctx.status = err.status || 500
            ctx.body = {
                // @ts-ignore
                message: err.message,
                status: ctx.status,
            }
            ctx.app.emit('error', err, ctx)
        }
    })
    app.on('error', err => {
        err.expose = true
        if (err.response) err.message = err.response.data
        console.error(err)
    })

    const router = new KoaRouter({ prefix: config.server.pathPrefix })
    routes(dependencies, router)
    app.use(router.routes())
    return app.listen(
        config.server.port,
        config.server.host,
        () => console.log(`Server listening on ${config.server.host}:${config.server.port}${config.server.pathPrefix}`))
}

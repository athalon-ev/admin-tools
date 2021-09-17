import * as fs from 'fs-extra'
import * as Koa from 'koa'
import * as KoaCors from '@koa/cors'
import * as KoaRouter from '@koa/router'
import * as KoaBody from 'koa-body'
import * as KoaJWT from 'koa-jwt'
import * as KoaStatic from 'koa-static-server'
import * as path from 'path'
import axios from 'axios'
// @ts-ignore
import * as concordance from 'concordance'
import * as nbt from 'prismarine-nbt'

import * as playerService from './player/readPlayers'

const rootPath = path.resolve(__dirname, '..')

const getContainer = () => ({
    lib: {
        fs,
        Koa,
        KoaStatic,
        KoaRouter,
        KoaJWT,
        console,
        path,
        axios,
        concordance,
        nbt,
    },
    services: {
        playerService,
    },
    config: {
        player: {
            datFilesFolderPath: path.resolve(rootPath, 'data')
        },
        server: {
            port: parseInt(process.env.PORT || '3000'),
            host: process.env.HOST || '0.0.0.0',
            pathPrefix: '',
            globalMiddlewares: {
                KoaCors,
                KoaBody,
            },
        }
    },
})

export type Dependencies = ReturnType<typeof getContainer>
export default getContainer

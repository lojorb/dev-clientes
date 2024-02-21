import fastify from "fastify";
import { routes } from "./router";
import cors from '@fastify/cors';


const app = fastify({ logger: true });

const start = async () => {

    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({ port: 3333 });
    }catch(err){
        process.exit(1);
    }
}

start();
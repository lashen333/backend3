// src\server.ts
import {env} from "./config/env.js";
import app from "./app.js";
import {dbConnect} from "./lib/mongodb.js";

async function bootstrap(){
    try{
        await dbConnect();
        console.log(`[db] connected to ${env.MONGODB_DB}`);

        const server = app.listen(env.PORT,() =>{
            console.log(`API listening on http://localhost:${env.PORT}`);
        });

        const shutdown =() =>{
            console.log("\nShutting down...");
            server.close(()=>process.exit(0));
        };
        process.on("SIGINT",shutdown);
        process.on("SIGTERM",shutdown);
    }catch(err){
        console.error("Startup error:",err);
        process.exit(1);
    }
}
bootstrap();
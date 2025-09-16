// src\config\env.ts
import 'dotenv/config';
import {z} from 'zod';

const EnvSchema = z.object({
    NODE_ENV:z.enum(['development','test','production']).default('development'),
    PORT:z.coerce.number().default(4000),

    //Mongo
    MONGODB_URI:z.string().url({message:'MONGODB_URI must be a valid URL'}),
    MONGODB_DB:z.string().default('landingpage-optimization3'),

    //App
    PUBLIC_BASE_URL:z.string().url().optional(),
});

const parsed = EnvSchema.safeParse(process.env);

if(!parsed.success){
    console.error('Invalid environmentvariables:\n',parsed.error.format());
    process.exit(1);
}
export const env = parsed.data;
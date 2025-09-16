// src\lib\mongodb.ts
import mongoose from "mongoose";
import {env} from "../config/env.js";

const URI = env.MONGODB_URI;
const DB_NAME = env.MONGODB_DB;
// Reuse connection in dev (nodemon/tsx hot reload)
let cached = (global as any)._mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(URI, { dbName:DB_NAME,serverSelectionTimeoutMS:5000 })
      .then((m) => {
        mongoose.set("strictQuery", true);
        return m;
      })
      .catch((err) => {
        cached!.promise = null;
        throw err;
      });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

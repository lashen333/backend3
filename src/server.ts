// src\server.ts
import app from "./app.js";
import dotenv from "dotenv/config.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`API listening on http://localhost:${PORT}`);
});
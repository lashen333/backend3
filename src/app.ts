// src\app.ts
import express from "express";
import variantRouter from "./routes/variant.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health",(_req, res) => {
    res.json({ok:true,service:"backend",time:new Date().toISOString()});
});

app.use("/api", variantRouter);

export default app;
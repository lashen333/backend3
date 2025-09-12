// src\routes\variant.routes.ts
import {Router} from "express";
import {resolveVarantHandler} from "../controllers/variant.controller.js";

const router =Router();

router.post("/resolve",resolveVarantHandler);

export default router;
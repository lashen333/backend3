// src\routes\variant.routes.ts
import {Router} from "express";
import {resolveVariantHandler} from "../controllers/variant.controller.js";

const router =Router();

router.get("/resolve",resolveVariantHandler);
router.post("/resolve",resolveVariantHandler);

export default router;
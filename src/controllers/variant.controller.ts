// src\controllers\variant.controller.ts
import type {Request,Response} from "express";
import {z} from "zod";
import {resolveVariant} from "../services/variant.service.js";
import path from "path";

const ResolveSchema =z.object({
  site_id:z.string().min(1),
  raw_url:z.string().min(1),
  path:z.string().optional(),
  referrer:z.string().optional(),
  user_agent:z.string().optional(),
  utm_campaign:z.string().optional(),
});

export async function resolveVarantHandler(req:Request,res:Response){
  try{
    const input = ResolveSchema.parse(req.body);
    const base = process.env.PUBLIC_BASE_URL ?? "http://localhost:3000";
    const url = new URL(input.raw_url,base);

    const qp = url.searchParams;

    const ctx = {
      siteId:input.site_id,
      path:input.path ?? url.pathname,
      referrer:input.referrer,
      userAgent:input.user_agent,
      utm:{
        source:qp.get("utm_source") ?? undefined,
        medium:qp.get("utm_medium") ?? undefined,
        campaign:input.utm_campaign ?? qp.get("utm_campaign") ?? undefined,
        content:qp.get("utm_content") ?? undefined,
        term:qp.get("utm_term") ?? undefined,
        gclid:qp.get("gclid") ?? undefined,
        fbclid:qp.get("fbclid") ?? undefined,
      },
    };
    const variant  = await resolveVariant(ctx);
    res.setHeader("Cache-Control","no-store");
    }catch (e:any){
      console.error("[resolveVariantHandler] error:",e?.message ?? e);
      res.setHeader("Cache-Control","no-store");
      return res.json({
        variant:{
          id:"default",
          title:"AI-Driven Landing Page Optimization",
          subheading:"Serve the best hero for every visitor—UTM & behavior aware.",
          ctaText:"Start Optimizing",
        },
      });
    }
  }


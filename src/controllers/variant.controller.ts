// src\controllers\variant.controller.ts
import type {Request,Response} from "express";
import {resolveVariant} from "../services/variant.service.js";
import type {UTM} from "../types/variant.js";

export const resolveVariantHandler = (req:Request,res:Response) =>{
  const{
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term

  } = (req.method === "POST" ? req.body : req.query) as Record<string,string | undefined>;

  const utm:UTM={
    source:utm_source,
    medium:utm_medium,
    campaign:utm_campaign,
    content:utm_content,
    term:utm_term
  };

  const variant =resolveVariant(utm);

  res.json({
    ok:true,
    variant,
    matchForm:{utm},
  });

};
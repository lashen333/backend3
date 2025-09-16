// src\services\variant.service.ts
import { VariantModel, type VariantDoc } from "../models/variant.js";
import type { Variant, DecisionContext } from "../types/variant.js";

const PROJECTION = { _id: 0, key: 1, title: 1, subheading: 1, ctaText: 1 } as const;

export function decideVariantKey(ctx: DecisionContext): string {
  if (ctx.utm.campaign?.toLowerCase().includes("black-friday")) return "hero_google_perfmax";
  if (ctx.utm.source === "facebook") return "hero_fb_brand";
  return "default";
}

export async function findVariantByKey(key: string): Promise<Variant> {
  const doc = await VariantModel.findOne({ key }).select(PROJECTION).lean<VariantDoc>().exec();
  if (doc) return { id: doc.key, title: doc.title, subheading: doc.subheading, ctaText: doc.ctaText };

  const d = await VariantModel.findOne({ key: "default" }).select(PROJECTION).lean<VariantDoc>().exec();
  if (d) return { id: d.key, title: d.title, subheading: d.subheading, ctaText: d.ctaText };

  return { id: "default", title: "AI-Driven Landing Page Optimization", subheading: "Serve the best hero for every visitor—UTM & behavior aware.", ctaText: "Start Optimizing" };
}

export async function resolveVariant(ctx: DecisionContext): Promise<Variant> {
  const key = decideVariantKey(ctx);
  return findVariantByKey(key);
}

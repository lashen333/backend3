// src/services/variant.service.ts
import { VariantModel, type VariantDoc } from "../models/variant.js";
import type { Variant } from "../types/variant.js";

// Optional: projection to fetch only needed fields
const PROJECTION = { _id: 0, key: 1, title: 1, subheading: 1, ctaText: 1 } as const;

export async function findVariantByKey(key: string): Promise<Variant> {
  // ✅ Tell TS what lean returns
  const doc = await VariantModel
    .findOne({ key })
    .select(PROJECTION)
    .lean<VariantDoc>()
    .exec();

  if (doc) {
    return {
      id: doc.key,
      title: doc.title,
      subheading: doc.subheading,
      ctaText: doc.ctaText,
    };
  }

  // fallback to default from DB
  const d = await VariantModel
    .findOne({ key: "default" })
    .select(PROJECTION)
    .lean<VariantDoc>()
    .exec();

  if (d) {
    const v: Variant = {
      id: d.key,
      title: d.title,
      subheading: d.subheading,
      ctaText: d.ctaText,
    };
    return v;
  }

  // last-resort hardcoded default
  return {
    id: "default",
    title: "AI-Driven Landing Page Optimization",
    subheading: "Serve the best hero for every visitor—UTM & behavior aware.",
    ctaText: "Start Optimizing",
  };
}

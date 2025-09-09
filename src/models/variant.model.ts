// src\models\variant.model.ts

import type { Variant, VariantRule } from "../types/variant.js";

export const VARIANTS: Record<string, Variant> = {
  default: {
    id: "default",
    title: "AI-Driven Landing Page Optimization",
    subheading: "Serve the best hero for every visitor—UTM & behavior aware.",
    ctaText: "Start Optimizing",
  },
  hero_fb_brand: {
    id: "hero_fb_brand",
    title: "Turn Facebook clicks into conversions",
    subheading: "Match landing hero to ad creative & intent—automatically.",
    ctaText: "See Live Demo",
  },
  hero_google_perfmax: {
    id: "hero_google_perfmax",
    title: "Maximize ROAS from Performance Max",
    subheading: "Align your hero with keyword + audience signals in real time.",
    ctaText: "Try It",
  },
};

export const RULES: VariantRule[] = [
  // Highest priority first (priority: 1)
  { id: "fb_brand", match: { source: "facebook", campaign: "brand" }, variantId: "hero_fb_brand", priority: 1 },
  { id: "g_perfmax", match: { source: "google", campaign: "pmax" }, variantId: "hero_google_perfmax", priority: 2 },
  // Add more rules as needed...
];

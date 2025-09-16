// src\models\variant.ts
import mongoose, { Schema, model, type Model, type InferSchemaType } from "mongoose";

const variantSchema = new Schema({
  key:        { type: String, required: true, unique: true },
  title:      { type: String, required: true },
  subheading: { type: String, required: true },
  ctaText:    { type: String, required: true },
}, { timestamps: true });

export type VariantDoc = InferSchemaType<typeof variantSchema>;

export const VariantModel: Model<VariantDoc> =
  mongoose.models.Variant || model<VariantDoc>("Variant", variantSchema);

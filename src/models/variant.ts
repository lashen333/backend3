// src\models\variant.ts
import { Schema, model, models,type Model,type InferSchemaType  } from "mongoose";


const VariantSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subheading: { type: String, required: true },
    ctaText: { type: String, required: true },
  },
  { timestamps: true }
);

export type VariantDoc = InferSchemaType<typeof VariantSchema>;

export const VariantModel:Model<VariantDoc>=
  (models.Variant as Model <VariantDoc>) || model<VariantDoc>("Variant",VariantSchema);


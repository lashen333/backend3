// src\scripts\seedVariants.ts
import "dotenv/config";
import { dbConnect } from "../lib/mongodb.js";
import { VariantModel } from "../models/variant.js";
import { SEED_VARIANTS } from "../seed/variants.seed.js";

async function main() {
  await dbConnect();

  const ops = SEED_VARIANTS.map((v) => ({
    updateOne: {
      filter: { key: v.key },
      update: { $set: v },
      upsert: true,
    },
  }));

  const res = await VariantModel.bulkWrite(ops,{ordered:false});
  console.log({
    inserted:res.insertedCount,
    matched:res.matchedCount,
    modified:res.modifiedCount,
    upserts:res.upsertedCount,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

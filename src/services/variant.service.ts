// src\services\variant.service.ts
import type {UTM,Variant} from"../types/variant.js";
import {RULES,VARIANTS} from "../models/variant.model.js";

function norm(s?:string){
    return(s ?? "").trim().toLowerCase();
}

export function resolveVariant(utm:UTM):Variant{
    const u ={
        source:norm(utm.source),
        medium:norm(utm.medium),
        campaign:norm(utm.campaign),    
        content:norm(utm.content),
        term:norm(utm.term),
    };

    const sorted = [...RULES].sort((a,b) => a.priority - b.priority);

    for (const r of sorted){
        const m = r.match;
        const ok = 
            (m.source ? norm(m.source) === u.source : true) &&
            (m.medium ? norm(m.medium) === u.medium : true) &&
            (m.campaign ? norm(m.campaign) === u.campaign : true) &&
            (m.content ? norm(m.content) === u.content : true) &&
            (m.term ? norm(m.term) === u.term : true);
        if (ok) {
            return VARIANTS[r.variantId] ?? VARIANTS["default"];
        }
    }
    return VARIANTS["default"];
}

// src\types\variant.ts
export type UTM = {
    source?:string;
    medium?:string;
    campaign?:string;
    content?:string;
    term?:string;
};
export type Variant = {
    id: string;
    title:string;
    subheading:string;
    ctaText:string;
};
export type VariantRule ={
    id: string;
    match:Partial<UTM>;
    variantId:string;
    priority:number;
};
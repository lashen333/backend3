// src\types\variant.ts

export type Variant = {
    id: string;
    title:string;
    subheading:string;
    ctaText:string;
};
export type DecisionContext ={
    siteId:string;
    path:string;
    referrer?:string;
    userAgent?:string;
    utm:{
        source?:string;
        medium?:string;
        campaign?:string;
        content?:string;
        term?:string;
        gclid?:string;
        fbclid?:string;
    };
};
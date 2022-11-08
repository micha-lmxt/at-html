import type { HtmlTagHydration } from "svelte/internal";

export function findSlots(html:HtmlTagHydration){
    const slots = recursiveSlot(html.n)
    return slots;
}
const recursiveSlot = (x:NodeList | Node[])=>{
    let result :Node[]= [];
    x.forEach((v)=>{
        if ((v as any).tagName && (v as any).tagName === "SLOT"){
            result.push(v);
        }else{
            result = result.concat(recursiveSlot(v.childNodes))
        }
    })
    return result;
}
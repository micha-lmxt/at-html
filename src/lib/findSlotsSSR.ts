import type { HtmlTagHydration } from "svelte/internal";

export function findSlotsSSR(nodes:Node[]) {
    const slots = recursiveSlot(nodes)
    return slots;
}
const recursiveSlot = (x: NodeList | Node[]): Node[][] => {
    let result: Node[][] = [];
    let found = false;
    let resultnodes: Node[] = [];
    for (let i = 0; i < x.length; i++) {
        let v = x[i];
        if (!found) {
            if (v.nodeType === 8 /* comment node */ && v.textContent?.trim() === "HTML_SLOT_START") {
                result.push(resultnodes);
                found = true;
            } else {
                result = result.concat(recursiveSlot(v.childNodes))
            }
        } else {
            if (v.nodeType === 8 /* comment node */ && v.textContent?.trim() === "HTML_SLOT_END") {
                found = false;
                resultnodes = [];
            } else {
                resultnodes.push(v);
            }
        }
        
    }
    return result;
}
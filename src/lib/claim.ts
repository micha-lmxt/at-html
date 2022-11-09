import { findSlotsSSR } from "./findSlotsSSR";

export function claim_html_tag_slot(slots:any[],nodes:Node[]):(undefined|Node)[]{
    
    const targets = findSlotsSSR(nodes);
    let i = 0;
    return slots.map(v=>{
        if (v){
            
            const targ = targets[i];
            const par = (targets[i] as any).parentElement;
            //targ.claim_info = {last_index:0,total_claimed:0}
            v.l(targ)
            i++;
            return par
        }
        return undefined;
    })
}
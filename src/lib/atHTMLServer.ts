/* App.svelte generated by Svelte v3.52.0 */
import { create_ssr_component } from "svelte/internal";
import parse from 'node-html-parser';


export function atHTMLServer(htmltag: string) {

    const App = create_ssr_component(($$result:any, $$props:any, $$bindings:any, slots:any) => {
        const doc = parse(htmltag,{comment:true});
        const _slots = doc.getElementsByTagName("slot");
        const getName = (v:any)=>v.attributes?.name||"default";
        _slots.forEach(v=>{
            if (getName(v) in slots){
                const string = slots[getName(v)]();
                v.replaceWith("<!-- HTML_SLOT_START -->" +
                    string +
                    "<!-- HTML_SLOT_END -->")
            }else{
                v.replaceWith(v.innerHTML);
            }
        })        
        
        return `<!-- HTML_TAG_START -->${doc.toString()}<!-- HTML_TAG_END -->`;
    });

    return App
}
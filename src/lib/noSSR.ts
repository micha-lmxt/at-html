/* App.svelte generated by Svelte v3.52.0 */
import {
    HtmlTag,
    SvelteComponent,
    create_slot,
    detach,
    get_all_dirty_from_scope,
    get_slot_changes,
    init,
    insert,
    safe_not_equal,
    transition_in,
    transition_out,
    update_slot_base,
    empty
} from "svelte/internal";
import { findSlots } from "./findSlots";



export function atHTML(htmltag: string) {

    const parser = new DOMParser();

    const slots = Array.from(
        parser.parseFromString(htmltag, "text/html")
            .getElementsByTagName("slot")
    ).map(v => v.name || "default")

    const get_my_slot_changes = slots.map(v => ((dirty: number) => ({})))
    const get_slot_context = slots.map(v => ((ctx: any[]) => ({})))

    function create_fragment(ctx: any[]) {

        let html_tag: HtmlTag;
        let html_anchor: Text;
        let current: boolean;
        const slot_template = /*#slots*/ slots.map(v => ctx[1][v]);
        const slot = slots.map(
            (v, i) => create_slot(slot_template[i], ctx, /*$$scope*/ ctx[0], get_slot_context[i])
        );

        return {
            c() {

                html_tag = new HtmlTag(false);
                html_anchor = empty();
                slot.forEach(v => {
                    if (v) { v.c() }
                });
                html_tag.a = html_anchor as any;
            },
            m(target: HTMLElement | SVGElement, anchor?: HTMLElement | SVGElement) {
                html_tag.m(htmltag, target, anchor);
                insert(target, html_anchor, anchor);


                const slot_targets = findSlots(html_tag);
                slots.forEach((v, i) => {
                    const index = slot_targets.findIndex((w: any) => v === "default" ? w.name === "" : w.name === v);
                    if (index >= 0) {
                        const tar = slot_targets.splice(index, 1)[0];
                        if (slot[i]) {
                            slot[i].m(tar.parentElement, tar);

                        } else {
                            const s = tar.childNodes.length;
                            for (let q = 0; q < s; q++) {
                                tar.parentElement?.insertBefore(tar.childNodes[0], tar)
                            }

                        }
                        tar.parentElement?.removeChild(tar);
                    } else {
                        throw (`Slot ${v} could not be found`)
                    }
                })



                current = true;
            },
            p(ctx: any[], [dirty]: number[]) {
                if (!current || dirty & /*$$scope*/ 1) {
                    let i = 0;
                    for (let s of slot) {
                        if (s && s.p) {
                            update_slot_base(
                                s,
                                slot_template[i],
                                ctx,
						/*$$scope*/ ctx[0],
                                !current
                                    ? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
                                    : get_slot_changes(slot_template[i], /*$$scope*/ ctx[0], dirty, get_my_slot_changes[i]),
                                get_slot_context[i]
                            );
                        }
                        i++;
                    }
                }
            },
            i(local?: 0 | 1) {
                if (current) return;
                slot.forEach(v => transition_in(v, local));
                current = true;
            },
            o(local: 0 | 1) {
                slot.forEach(v => transition_out(v, local));
                current = false;
            },
            d(detaching: boolean) {
                if (detaching) detach(html_anchor);
                if (detaching) html_tag.d();
                slot.forEach(v => v.d(detaching));
            }
        };
    }

    function instance($$self: any, $$props: { $$slots: object, $$scope: any }, $$invalidate: (a?: number, b?: any) => any) {
        let { $$slots: slots = {}, $$scope } = $$props;

        $$self.$$set = ($$props: { $$scope?: any }) => {
            if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
        };

        return [$$scope, slots];
    }

    class App extends SvelteComponent {
        constructor(options: any) {
            super();
            init(this, options, instance, create_fragment, safe_not_equal, {}, undefined);
        }
    }

    return App
}
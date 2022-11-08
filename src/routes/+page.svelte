<script>
    import {onMount} from 'svelte'
    import {atHTML } from '$lib/index.js';
    const htmlstring = `
        <h3>Before - <slot>
            Fallback <strong style="color:red;">content</strong>
        </slot> - <div>After</div> <slot name="xx"> Backfall </slot></h3>
        `
        const SSRTest = atHTML(htmlstring);
    let noSSRtest;
    onMount(()=>{
        noSSRtest = atHTML(htmlstring)
    })
    let text = "some text";
</script>
<h1>at-html</h1>
<p>Create @html tags with slots for your Svelte App</p>
<p>Visit <a href="https://github.com/micha-lmxt/at-html">at-html</a> to read the documentation</p>

<svelte:component this={noSSRtest}>
{text}
</svelte:component>
<svelte:component this={noSSRtest}/>
<button on:click={()=>text+="!"}>click</button>
<h1>SSR:</h1>
<SSRTest>{text}</SSRTest>
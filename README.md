# at-html

Use `{@html }` tags with slots in Svelte apps 

> ⚠️Same security concerns as with normal @html tags apply, so I repeat it:
Svelte doesn't perform any sanitization of the expression inside {@html ...} before it gets inserted into the DOM. In other words, if you use this feature it's critical that you manually escape HTML that comes from sources you don't trust, otherwise you risk exposing your users to XSS attacks.

## Installation

```bash
npm I --save-dev at-html
```

## Usage

The atHTML factory function creates a Svelte Component,
which renders the supplied html string. 
Slot tags in the html template are replaced.
The component accepts no props.

```svelte
<script>
    import {atHTML} from 'at-html'

    // Create a Svelte Component from html string
    // start variable with capital letter
    const C = atHTML('<h1><slot></slot></h1>')
</script>
<C>Some slotted content</C>
```

If you change the html string a new Svelte Component is created.
So, if you want to call atHTML in a reactive statement,
you should use `<svelte:component>`

> Note: the html string is applied via innerHtml.
That means the string must be proper html code,
especially most elements need open *and* closing tags.
Self-closing elements like `<slot/>` might not
work as expected. Use `<slot></slot>` instead.

### Named slots

Named slots are supported, use the normal Svelte syntax.
Eg. `<slot name='title'>' in the html string and
prop `slot='title'` on the slotted component.

### Fallback 

Content within the slot tags in the html string
is shown as fallback, if the slot is not filled.

### Server-Side-Rendering (SSR)

SSR is fully supported. 

### Non-SSR

There is a simplified component factory, if you want to use this library in a non-SSR environment,
eg. in a Svelte single-page-application. It can be imported like this:

```javascript
import {atHTML} from 'at-html/noSSR';
```

> ⚠️This library currently is optimized for the use of Vite. It is highly recommended to use the non-SSR components if you don't use Vite. It uses  `if (import.meta.env.SSR) {...}`, which removes the server side code via tree-shaking. Non-Vite environments will pack the whole svelte compiler code into the client-side code.


## How it works

This library modifies an already compiled component. As such, it uses methods from `svelte/internal`. These don't have the same stability guarantees as user-land methods, so this library may be more likely to be incompatible with future versions of Svelte. 

## License

MIT

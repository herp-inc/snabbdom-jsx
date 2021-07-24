# @herp-inc/snabbdom-jsx [![npm](https://img.shields.io/npm/v/@herp-inc/snabbdom-jsx)](https://www.npmjs.com/package/@herp-inc/snabbdom-jsx)

Yet another [JSX](https://facebook.github.io/jsx/) pragma for [Snabbdom](https://www.npmjs.com/package/snabbdom)

## Features

- Supports recent major versions of Snabbdom
- Attributes on intrinsic elements are typechecked (only for HTML elements for now)
- `className` and `id` will be the part of the `sel`
- Type-safe custom modules via module augmentation
- Experimental support for [React 17 style new JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

## Example

```tsx
import { jsx } from '@herp-inc/snabbdom-jsx';

const vnode = (
  <div id="container" className="two classes" onclick={someFn}>
    <span $style={{ fontWeight: 'bold' }}>This is bold</span> and this is just normal text
    <a href="/foo">I'll take you places!</a>
  </div>
);
```

## Installation

Note that the following packages are peer dependencies of this library, which need to be installed separately.

| Package                                              | Version |
| ---------------------------------------------------- | ------- |
| [`csstype`](https://www.npmjs.com/package/csstype)   | `3`     |
| [`snabbdom`](https://www.npmjs.com/package/snabbdom) | `*`     |

### With [npm](https://www.npmjs.com/)

```sh
npm install @herp-inc/snabbdom-jsx
```

### With [yarn](https://yarnpkg.com/)

```sh
$ yarn add @herp-inc/snabbdom-jsx
```

## Usage

### With [TypeScript](https://www.typescriptlang.org/)

#### Classic runtime

Add the following options to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "jsx"
  }
}
```

Then import the `jsx` function in your `.tsx` file.

```tsx
import { jsx } from '@herp-inc/snabbdom-jsx';

const vnode = <div>Hello, JSX!</div>;
```

#### Automatic runtime (experimental)

Make sure you are using TypeScript v4.1+ and add the following options to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@herp-inc/snabbdom-jsx"
  }
}
```

Then the `jsx` and the `jsxs` functions will automatically be imported.

#### Using with older versions of Snabbdom

If you are using Snabbdom older than v3, you also need to import the polyfill that provides the compatible type information. Add the following import statement to the entry point.

```ts
import '@herp-inc/snabbdom-jsx/polyfills/older-snabbdom';
```

### With [Babel](https://babeljs.io/)

Add [`@babel/plugin-transform-react-jsx`](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx) to your `devDependencies`.

#### Classic runtime

Make sure are using Babel v7.9.0+ and add the following options to your Babel configuration:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx",
        "runtime": "classic"
      }
    ]
  ]
}
```

Then import the `jsx` function in your file.

```jsx
import { jsx } from '@herp-inc/snabbdom-jsx';

const vnode = <div>Hello, JSX!</div>;
```

#### Automatic runtime (experimental)

Add the following options to your Babel configuration:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "importSource": "@herp-inc/snabbdom-jsx",
        "runtime": "automatic"
      }
    ]
  ]
}
```

Then the `jsx` and the `jsxs` functions will automatically be imported.

## Attributes mapping

By default, an attribute will be passed to [the props module](https://github.com/snabbdom/snabbdom#the-props-module).

```tsx
<input type="text" />
// { props: { type: 'text' } }
```

However, certain attributes will be treated differently.

### `className` and `id`

`className` and `id` attributes will be appended to the [`sel`](https://github.com/snabbdom/snabbdom#sel--string), and won't be passed to any modules. For example, the expression `<div id="foo" className="bar baz" />` will yield a virtual node with `{ sel: 'div#foo.bar.baz' }`

### `aria-*`

An attribute starting with `aria-` will be passed to [the props module](https://github.com/snabbdom/snabbdom#the-props-module). Note that dashes will be converted to camel case.

```tsx
<button aria-label="Send" />
// { ariaLabel: 'Send' }
```

### `data-*`

An attribute starting with `data-` will be passed to [the dataset module](https://github.com/snabbdom/snabbdom#the-dataset-module). Note that the `data-` prefix will be removed and dashes will be converted to camel case.

```tsx
<div data-foo-bar="baz" />
// { dataset: { fooBar: 'baz' } }
```

### `is`

The `is` attribute can be used when you want to instantiate your customized built-in elements.

```tsx
<div is="custom-element" />
// { is: 'custom-element' }
```

### `on*`

An attribute starting with `on` will passed to [the event listeners module](https://github.com/snabbdom/snabbdom#the-eventlisteners-module).

```tsx
<div
  onclick={(e) => {
    console.log(e);
  }}
/>
// { on: { click: f } }
```

### `role`

The `role` attribute will be passed to [the attributes module](https://github.com/snabbdom/snabbdom#the-attributes-module).

```tsx
<div role="button" />
// { attrs: { role: 'button' } }
```

### `$hook`

The `$hook` attribute is treated as [hooks](https://github.com/snabbdom/snabbdom#hooks).

```tsx
<div $hook={{ insert(vnode) { console.log(vnode); } }}>
// { hook: { insert: f } }
```

For the sake of backward compatibility, `hook` (without the dollar sign) also behaves the same. However it is deprecated and will be removed in the future.

### `$key`

The `$key` attribute is treated as [a key](https://github.com/snabbdom/snabbdom#key--string--number).

```tsx
<div $key="foo" />
// { key: 'foo' }
```

For the sake of backward compatibility, `key` (without the dollar sign) also behaves the same. However it is deprecated and will be removed in the future.

### Built-in modules

In Snabbdom, different functionalities are delegated to separate modules. Values can be passed to them via attributes starting with `$`.

#### `$attrs` ([the attributes module](https://github.com/snabbdom/snabbdom#the-attributes-module))

```tsx
<div $attrs={{ class: 'foo' }} />
// { attrs: { class: 'foo' } }
```

#### `$class` ([the class module](https://github.com/snabbdom/snabbdom#the-class-module))

```tsx
<div $class={{ foo: true }} />
// { class: { foo: true } }
```

#### `$dataset` ([the dataset module](https://github.com/snabbdom/snabbdom#the-dataset-module))

```tsx
<div $dataset={{ foo: 'bar' }} />
// { dataset: { foo: 'bar' } }
```

#### `$on` ([the event listeners module](https://github.com/snabbdom/snabbdom#the-eventlisteners-module))

```tsx
<div
  $on={{
    click: (e) => {
      console.log(e);
    },
  }}
/>
// { on: { click: f } }
```

#### `$props` ([the props module](https://github.com/snabbdom/snabbdom#the-props-module))

```tsx
<div $props={{ className: 'foo' }} />
// { props: { className: 'foo' } }
```

#### `$style` ([the style module](https://github.com/snabbdom/snabbdom#the-style-module))

```tsx
<div $style={{ opacity: '0', delayed: { opacity: '1' }, remove: { opacity: '0' } }} />
// { style: { opacity: '0', delayed: { opacity: '1' }, remove: { opacity: '0' } } }
```

#### Aliases

For the sake of backward compatibility, the following aliases are also defined. However they are deprecated and will be removed in the future.

| Attribute  | Alias(es)         |
| ---------- | ----------------- |
| `$attrs`   | `attrs`           |
| `$class`   | `class`           |
| `$dataset` | `data`, `dataset` |
| `$on`      | `on`              |
| `$props`   | `props`           |
| `$style`   | `style`           |

### Custom modules

Just like built-in modules, you can pass an arbitrary value to your custom modules via an attribute starting with `$`. For example, the expression `<div $custom={{ foo: 'bar' }} />` will yield `{ custom: { foo: 'bar' } }`.

#### Note for TypeScript users

Unlike built-in modules, we have no assumptions about what kind of values should be passed to custom modules. You have to augment `jsx.CustomModules` interface so that it will typecheck.

```ts
declare module '@herp-inc/snabbdom-jsx' {
  namespace jsx {
    interface CustomModules {
      // Add your custom modules here
      custom: {
        foo: string;
      };
    }
  }
}
```

## Components

A component can be defined with a function with the signature of `<Props>(props: Props, children: Snabbdom.Node[]): Snabbdom.Node`.

```tsx
import Snabbdom, { jsx } from '@herp-inc/snabbdom-jsx';

type Props = {
  name: string;
};

const Component: Snabbdom.Component<Props> = ({ name }, children) => (
  <div>
    Hello, {name}!<div>{children}</div>
  </div>
);

const vnode = <Component />;
```

A primitive value can also returned from a component. It will be treated as a text node.

```tsx
const Answer = () => 42;

const vnode = <Answer />;
// { children: undefined, data: undefined, elm: undefined, key: undefined, sel: undefined, text: '42' }
```

## Caveats

- `boolean`, `null`, and `undefined` values are not be filtered out of the tree and rendered as comment nodes (for the sake of correct diffing)
- `snabbdom-pragma`-style `MODULE-PROPERTY` notation is not supported.

## Acknowledgements

The code base is based on these libraries:

- [`snabbdom`](https://www.npmjs.com/package/snabbdom)
- [`snabbdom-pragma`](https://www.npmjs.com/package/snabbdom-pragma)
- [`@types/react`](https://www.npmjs.com/package/@types/react)

# @herp-inc/snabbdom-jsx [![npm](https://img.shields.io/npm/v/@herp-inc/snabbdom-jsx)](https://www.npmjs.com/package/@herp-inc/snabbdom-jsx)

Yet another [JSX](https://facebook.github.io/jsx/) pragma for [Snabbdom](https://www.npmjs.com/package/snabbdom)

## Features

- Straightforward and intuitive syntax
  - `<input type="text" />` rather than `<input props={{ type: 'text' }}>`
- Typechecked attributes on intrinsic elements
  - Only for HTML elements for now
- Typechecked children
- `className` and `id` will be the part of the [`sel`](https://github.com/snabbdom/snabbdom#sel--string)
- [Type-safe custom modules via module augmentation](#custom-modules)
- Support for [React 17 style automatic runtime](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

## Example

```tsx
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
| [`snabbdom`](https://www.npmjs.com/package/snabbdom) | `3`     |

### With [npm](https://www.npmjs.com/)

```sh
$ npm install @herp-inc/snabbdom-jsx
```

### With [yarn](https://yarnpkg.com/)

```sh
$ yarn add @herp-inc/snabbdom-jsx
```

## Usage

Note that fragments are still experimental. Make sure you are using Snabbdom v3.2+ and opt it in to enable the feature.

```ts
const patch = init(modules, undefined, {
  experimental: {
    fragments: true,
  },
});
```

### With [TypeScript](https://www.typescriptlang.org/)

Add the following options to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@herp-inc/snabbdom-jsx"
  }
}
```

### With [Babel](https://babeljs.io/)

Add [`@babel/plugin-transform-react-jsx`](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx) to your `devDependencies`.

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

## Attributes mapping

By default, an attribute will be passed to [the props module](https://github.com/snabbdom/snabbdom#the-props-module).

```tsx
<input type="text" />
// { props: { type: 'text' } }
```

However, certain attributes will be treated differently.

### `className` and `id`

`className` and `id` attributes will be concatenated to the [`sel`](https://github.com/snabbdom/snabbdom#sel--string) with `.` and `#` respectively, and won't be passed to any modules. For example, the expression `<div id="foo" className="bar baz" />` will yield a virtual node with `{ sel: 'div#foo.bar.baz' }`

### `aria-*`

An attribute starting with `aria-` will be passed to [the attributes module](https://github.com/snabbdom/snabbdom#the-attributes-module).

```tsx
<button aria-label="Send" />
// { attrs: { 'aria-label': 'Send' } }
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

### `list` and `role`

The `list` and the `role` attributes will be passed to [the attributes module](https://github.com/snabbdom/snabbdom#the-attributes-module).

```tsx
<div role="button" />
// { attrs: { role: 'button' } }

<input list="options" />
// { attrs: { list: 'options' } }
```

### `$hook`

The `$hook` attribute is treated as [hooks](https://github.com/snabbdom/snabbdom#hooks).

```tsx
<div
  $hook={{
    insert(vnode) {
      console.log(vnode);
    },
  }}
/>
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

### SVG elements

Attributes of `<svg>` and its descendant elements are passed to [the attributes module](https://github.com/snabbdom/snabbdom#the-attributes-module).

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

Unlike built-in modules, we have no assumptions on what kind of values should be passed to custom modules. You have to augment `jsx.CustomModules` interface so that it will typecheck.

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

A JSX component can be defined with a function with the signature of `<Props>(props: Props) => Snabbdom.VNodeChildElement`.

```tsx
import type Snabbdom from '@herp-inc/snabbdom-jsx';

type Props = {
  children: Snabbdom.Node;
  name: string;
};

const Component: Snabbdom.Component<Props> = ({ children, name }) => (
  <div>
    Hello, {name}!<div>{children}</div>
  </div>
);

const vnode = <Component />;
```

## Caveats

- `boolean`, `null`, and `undefined` values are not be filtered out of the tree but rendered as comment nodes (for the sake of correct diffing)
- `snabbdom-pragma`-style `MODULE-PROPERTY` notation is not supported.

## Acknowledgements

The code base is based on these libraries:

- [`snabbdom`](https://www.npmjs.com/package/snabbdom)
- [`snabbdom-pragma`](https://www.npmjs.com/package/snabbdom-pragma)
- [`@types/react`](https://www.npmjs.com/package/@types/react)

import { jsx } from '@herp-inc/snabbdom-jsx';

declare global {
    namespace JSX {
        type Element = jsx.JSX.Element;
        type IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;
        type IntrinsicElements = jsx.JSX.IntrinsicElements;
    }
}

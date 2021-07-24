import { jsx as createElement } from './index.js';

const jsx = (tag, props, key) => {
    if (key !== undefined) {
        props.key = key;
    }

    if ('children' in props) {
        const { children, ...data } = props;
        return createElement(tag, data, children);
    } else {
        return createElement(tag, props);
    }
};

const jsxs = jsx;

export { jsx, jsxs };

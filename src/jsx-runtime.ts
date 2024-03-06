import type { Key, VNode, VNodeData } from 'snabbdom';

import type Snabbdom from './types';
import type { JSX } from './types';

const isArrayChildren = (children: Snabbdom.Node): children is readonly Snabbdom.Node[] => Array.isArray(children);

const kebab2camel = (kebab: string): string => {
    const [hd, ...tl] = kebab.split('-');
    let camel = hd ?? '';

    for (const x of tl) {
        camel += x.substring(0, 1).toUpperCase() + x.substring(1);
    }

    return camel;
};

const canonicalizeVNodeData = (orig: VNodeData): VNodeData => {
    const data: VNodeData = {};

    for (const key in orig) {
        const v = orig[key];

        if (v === undefined) {
            continue;
        }

        if (key === '$attrs' || key === 'attrs') {
            data.attrs = Object.assign(v, data.attrs ?? {});
        } else if (key.startsWith('aria-')) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            data.attrs ??= {};
            data.attrs[key] = v;
        } else if (key === 'children') {
            // skip
        } else if (key === '$class' || key === 'class') {
            data.class = v;
        } else if (key === 'className' || key === 'id') {
            // skipping in favor of sel
        } else if (key === '$data' || key === 'data' || key === 'dataset') {
            data.dataset = Object.assign(v, data.dataset ?? {});
        } else if (key.startsWith('data-')) {
            const k = kebab2camel(key.replace('data-', ''));
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            data.dataset ??= {};
            data.dataset[k] = v;
        } else if (key === '$hook' || key === 'hook') {
            data.hook = v;
        } else if (key === 'is') {
            data.is = v;
        } else if (key === '$key' || key === 'key') {
            data.key = v;
        } else if (key === '$on' || key === 'on') {
            data.on = Object.assign(v, data.on ?? {});
        } else if (key === '$props' || key === 'props') {
            data.props = Object.assign(v, data.props ?? {});
        } else if (key.startsWith('on')) {
            const k = key.replace('on', '');
            if (data.on === undefined) {
                data.on = { [k]: v };
            } else {
                data.on[k] = v;
            }
        } else if (key === 'list' || key === 'role') {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            data.attrs ??= {};
            data.attrs[key] = v;
        } else if (key === '$style' || key === 'style') {
            data.style = v;
        } else if (key.startsWith('$')) {
            const mod = key.substring(1);
            data[mod] = v;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            data.props ??= {};
            data.props[key] = v;
        }
    }

    return data;
};

const considerSVG = (vnode: VNode): VNode => {
    const { props: { className = undefined, ...attrs } = {}, ...data } = vnode.data ?? {};

    return {
        ...vnode,
        data: {
            ...data,
            attrs,
            ns: 'http://www.w3.org/2000/svg',
        },
        children: vnode.children?.map((child) => (typeof child === 'string' ? child : considerSVG(child))),
    };
};

const vnodify = (child: Snabbdom.VNodeChildElement): VNode => {
    if (typeof child === 'string' || typeof child === 'number' || typeof child === 'bigint') {
        return {
            children: undefined,
            data: undefined,
            elm: undefined,
            key: undefined,
            sel: undefined,
            text: String(child),
        };
    }

    if (child === undefined || child === null || child === false || child === true) {
        return {
            children: undefined,
            data: {},
            elm: undefined,
            key: undefined,
            sel: '!',
            text: String(child),
        };
    }

    return child;
};

const makeFragment = (children: Array<string | VNode>): VNode => ({
    children,
    data: {},
    elm: undefined,
    sel: undefined,
    key: undefined,
    text: undefined,
});

const flatten = (children: readonly Snabbdom.Node[]): VNode[] =>
    children.map((x) => (isArrayChildren(x) ? makeFragment(flatten(x)) : vnodify(x)));

export const jsx = (tag: string | JSX.ElementType, data: { [index: string]: unknown }, key?: Key): VNode => {
    data['key'] = key;

    const hasChildren = 'children' in data;

    // value-based elements
    if (typeof tag === 'function') {
        let vnode: VNode;

        if (tag.length === 1) {
            vnode = vnodify(tag(data));
        } else {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { children: _, ...props } = data;
            const children = data['children'] as Snabbdom.Node;

            if (hasChildren) {
                if (isArrayChildren(children)) {
                    vnode = vnodify(tag(props, flatten(children)));
                } else {
                    vnode = vnodify(tag(props, children));
                }
            } else {
                vnode = vnodify(tag(props, []));
            }
        }

        if (data['$key'] !== undefined) {
            vnode.key = data['$key'] as Key;
        } else if (data['key'] !== undefined) {
            vnode.key = data['key'] as Key;
        }

        return vnode;
    }

    // intrinsic elements
    let sel = tag;
    const id = data['id'] as string | undefined;
    if (id !== undefined) {
        sel += `#${id}`;
    }
    const className = data['className'] as string | undefined;
    if (className !== undefined) {
        for (const cls of className.trim().split(' ')) {
            sel += `.${cls}`;
        }
    }

    const canonicalizedData = canonicalizeVNodeData(data);
    const children = data['children'] as Snabbdom.Node;

    let vnode: VNode;

    if (hasChildren) {
        if (isArrayChildren(children)) {
            const flatChildren = flatten(children);

            if (
                flatChildren.length === 1 &&
                (typeof flatChildren[0] === 'number' || typeof flatChildren[0] === 'string')
            ) {
                vnode = {
                    children: undefined,
                    data: canonicalizedData,
                    elm: undefined,
                    sel,
                    key: canonicalizedData.key,
                    text: String(flatChildren[0]),
                };
            } else if (
                flatChildren.length === 1 &&
                typeof flatChildren[0] === 'object' &&
                flatChildren[0].sel === undefined
            ) {
                vnode = {
                    children: flatChildren[0].children,
                    data: canonicalizedData,
                    elm: undefined,
                    sel,
                    key: canonicalizedData.key,
                    text: undefined,
                };
            } else {
                vnode = {
                    children: flatChildren.map(vnodify),
                    data: canonicalizedData,
                    elm: undefined,
                    sel,
                    key: canonicalizedData.key,
                    text: undefined,
                };
            }
        } else if (children === undefined) {
            vnode = {
                children: undefined,
                data: canonicalizedData,
                elm: undefined,
                sel,
                key: canonicalizedData.key,
                text: undefined,
            };
        } else if (typeof children === 'bigint' || typeof children === 'number' || typeof children === 'string') {
            vnode = {
                children: undefined,
                data: canonicalizedData,
                elm: undefined,
                sel,
                key: canonicalizedData.key,
                text: String(children),
            };
        } else if (children === null || typeof children === 'boolean') {
            vnode = {
                children: [vnodify(children)],
                data: canonicalizedData,
                elm: undefined,
                sel,
                key: canonicalizedData.key,
                text: undefined,
            };
        } else if (children.sel === undefined && typeof children.text === 'string') {
            vnode = {
                children: undefined,
                data: canonicalizedData,
                elm: undefined,
                sel,
                key: (data['$key'] as Key | undefined) ?? (data['key'] as Key | undefined),
                text: children.text,
            };
        } else {
            vnode = {
                children: [children],
                data: canonicalizedData,
                elm: undefined,
                sel,
                key: (data['$key'] as Key | undefined) ?? (data['key'] as Key | undefined),
                text: undefined,
            };
        }
    } else {
        vnode = {
            children: undefined,
            data: canonicalizedData,
            elm: undefined,
            sel,
            key: canonicalizedData.key,
            text: undefined,
        };
    }

    if (vnode.children !== undefined && vnode.children.length === 1) {
        const child = vnode.children[0];

        if (typeof child === 'string') {
            vnode.text = child;
            vnode.children = undefined;
        } else if (typeof child === 'object' && child.sel === undefined && child.text !== undefined) {
            vnode.text = child.text;
            vnode.children = undefined;
        }
    }

    if (tag === 'svg') {
        return considerSVG(vnode);
    }

    return vnode;
};

export function jsxs(tag: string | JSX.ElementType, data: { [index: string]: unknown }): VNode {
    return jsx(tag, data);
}

export function Fragment({ children }: { children: Snabbdom.Node }): VNode {
    return {
        children: children === undefined ? [] : isArrayChildren(children) ? flatten(children) : [vnodify(children)],
        data: {},
        elm: undefined,
        sel: undefined,
        key: undefined,
        text: undefined,
    };
}

export type { JSX } from './types';

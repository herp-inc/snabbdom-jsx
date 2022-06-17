import type * as CSS from 'csstype';
import type { Attrs, Classes, Dataset, Hooks, Key, On, Props, VNode, VNodeData } from 'snabbdom';

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
            data.attrs ??= {};
            data.attrs[key] = v;
        } else if (key === '$class' || key === 'class') {
            data.class = v;
        } else if (key === 'className' || key === 'id') {
            // skipping in favor of sel
        } else if (key === '$data' || key === 'data' || key === 'dataset') {
            data.dataset = Object.assign(v, data.dataset ?? {});
        } else if (key.startsWith('data-')) {
            const k = kebab2camel(key.replace('data-', ''));
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
            data.attrs ??= {};
            data.attrs[key] = v;
        } else if (key === '$style' || key === 'style') {
            data.style = v;
        } else if (key.startsWith('$')) {
            const mod = key.substring(1);
            data[mod] = v;
        } else {
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

const flatten = (children: Array<Snabbdom.Node | Snabbdom.Node[]>, flattened: VNode[]): VNode[] => {
    for (const child of children) {
        if (Array.isArray(child)) {
            flatten(child, flattened);
        } else if (typeof child === 'string' || typeof child === 'number') {
            flattened.push({
                children: undefined,
                data: undefined,
                elm: undefined,
                key: undefined,
                sel: undefined,
                text: String(child),
            });
        } else if (child === undefined || child === null || child === false || child === true) {
            flattened.push({
                children: undefined,
                data: {},
                elm: undefined,
                key: undefined,
                sel: '!',
                text: String(child),
            });
        } else {
            flattened.push(child);
        }
    }
    return flattened;
};

export const jsx = (
    tag: string | Snabbdom.Component<unknown>,
    data: Record<string, unknown> | null,
    ...children: Array<Snabbdom.Node | Snabbdom.Node[]>
): VNode => {
    // eslint-disable-next-line no-param-reassign
    data ??= {};

    const flatChildren = flatten(children, []);

    // value-based elements
    if (typeof tag === 'function') {
        let vnode = tag(data, flatChildren);

        // when a primitive value is returned from the function component
        if (typeof vnode !== 'object' || vnode === null) {
            vnode = flatten([vnode], [])[0]!;
        }

        if (data.$key !== undefined) {
            vnode.key = data.$key as Key;
        } else if (data.key !== undefined) {
            vnode.key = data.key as Key;
        }

        return vnode;
    }

    // intrinsic elements
    let sel = tag;
    const id = data.id as string;
    if (id !== undefined) {
        sel += `#${id}`;
    }
    const className = data.className as string;
    if (className !== undefined) {
        for (const cls of className.trim().split(' ')) {
            sel += `.${cls}`;
        }
    }

    const canonicalizedData = canonicalizeVNodeData(data);

    if (flatChildren.length === 1 && flatChildren[0]?.sel === undefined && typeof flatChildren[0]?.text !== undefined) {
        return {
            children: undefined,
            data: canonicalizedData,
            elm: undefined,
            sel,
            key: undefined,
            text: flatChildren[0]?.text,
        };
    }

    const vnode: VNode = {
        children: flatChildren,
        data: canonicalizedData,
        elm: undefined,
        sel,
        key: (data?.$key as Key) ?? (data?.key as Key),
        text: undefined,
    };

    if (tag === 'svg') {
        return considerSVG(vnode);
    }

    return vnode;
};

export function Fragment(_: Record<string, unknown>, ...children: Array<Snabbdom.Node | Snabbdom.Node[]>): VNode {
    return {
        children: flatten(children, []),
        data: {},
        elm: undefined,
        sel: undefined,
        key: undefined,
        text: undefined,
    };
}

declare namespace Internal {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Whatever = string & {};

    type EventHandler<E extends Event, T extends EventTarget> = (event: Omit<E, 'target'> & { target: T }) => void;

    interface EventListeners<T extends Element> {
        onabort?: EventHandler<UIEvent, T> | undefined;
        onanimationcancel?: EventHandler<AnimationEvent, T> | undefined;
        onanimationend?: EventHandler<AnimationEvent, T> | undefined;
        onanimationiteration?: EventHandler<AnimationEvent, T> | undefined;
        onanimationstart?: EventHandler<AnimationEvent, T> | undefined;
        onauxclick?: EventHandler<MouseEvent, T> | undefined;
        onbeforeinput?: EventHandler<KeyboardEvent, T> | undefined;
        onblur?: EventHandler<FocusEvent, T> | undefined;
        oncancel?: EventHandler<Event, T> | undefined;
        oncanplay?: EventHandler<Event, T> | undefined;
        oncanplaythrough?: EventHandler<Event, T> | undefined;
        onchange?: EventHandler<Event, T> | undefined;
        onclick?: EventHandler<MouseEvent, T> | undefined;
        onclose?: EventHandler<Event, T> | undefined;
        oncompositionend?: EventHandler<CompositionEvent, T> | undefined;
        oncompositionstart?: EventHandler<CompositionEvent, T> | undefined;
        oncompositionupdate?: EventHandler<CompositionEvent, T> | undefined;
        oncontextmenu?: EventHandler<MouseEvent, T> | undefined;
        oncopy?: EventHandler<ClipboardEvent, T> | undefined;
        oncuechange?: EventHandler<Event, T> | undefined;
        oncut?: EventHandler<ClipboardEvent, T> | undefined;
        ondblclick?: EventHandler<MouseEvent, T> | undefined;
        ondoubleclick?: EventHandler<MouseEvent, T> | undefined;
        ondrag?: EventHandler<DragEvent, T> | undefined;
        ondragend?: EventHandler<DragEvent, T> | undefined;
        ondragenter?: EventHandler<DragEvent, T> | undefined;
        ondragexit?: EventHandler<DragEvent, T> | undefined;
        ondragleave?: EventHandler<DragEvent, T> | undefined;
        ondragover?: EventHandler<DragEvent, T> | undefined;
        ondragstart?: EventHandler<DragEvent, T> | undefined;
        ondrop?: EventHandler<DragEvent, T> | undefined;
        ondurationchange?: EventHandler<Event, T> | undefined;
        onemptied?: EventHandler<Event, T> | undefined;
        onencrypted?: EventHandler<Event, T> | undefined;
        onended?: EventHandler<Event, T> | undefined;
        onerror?: EventHandler<Event, T> | undefined;
        onfocus?: EventHandler<FocusEvent, T> | undefined;
        ongotpointercapture?: EventHandler<PointerEvent, T>;
        oninput?: EventHandler<InputEvent, T> | undefined;
        oninvalid?: EventHandler<Event, T> | undefined;
        onkeydown?: EventHandler<KeyboardEvent, T> | undefined;
        onkeypress?: EventHandler<KeyboardEvent, T> | undefined;
        onkeyup?: EventHandler<KeyboardEvent, T> | undefined;
        onload?: EventHandler<Event, T> | undefined;
        onloadeddata?: EventHandler<Event, T> | undefined;
        onloadedmetadata?: EventHandler<Event, T> | undefined;
        onloadstart?: EventHandler<Event, T> | undefined;
        onlostpointercapture?: EventHandler<PointerEvent, T> | undefined;
        onmousedown?: EventHandler<MouseEvent, T> | undefined;
        onmouseenter?: EventHandler<MouseEvent, T> | undefined;
        onmouseleave?: EventHandler<MouseEvent, T> | undefined;
        onmousemove?: EventHandler<MouseEvent, T> | undefined;
        onmouseout?: EventHandler<MouseEvent, T> | undefined;
        onmouseover?: EventHandler<MouseEvent, T> | undefined;
        onmouseup?: EventHandler<MouseEvent, T> | undefined;
        onpaste?: EventHandler<ClipboardEvent, T> | undefined;
        onpause?: EventHandler<Event, T> | undefined;
        onplay?: EventHandler<Event, T> | undefined;
        onplaying?: EventHandler<Event, T> | undefined;
        onpointercancel?: EventHandler<PointerEvent, T> | undefined;
        onpointerdown?: EventHandler<PointerEvent, T> | undefined;
        onpointerenter?: EventHandler<PointerEvent, T> | undefined;
        onpointerleave?: EventHandler<PointerEvent, T> | undefined;
        onpointermove?: EventHandler<PointerEvent, T> | undefined;
        onpointerout?: EventHandler<PointerEvent, T> | undefined;
        onpointerover?: EventHandler<PointerEvent, T> | undefined;
        onpointerup?: EventHandler<PointerEvent, T> | undefined;
        onprogress?: EventHandler<ProgressEvent, T> | undefined;
        onratechange?: EventHandler<Event, T> | undefined;
        onreset?: EventHandler<Event, T> | undefined;
        onresize?: EventHandler<UIEvent, T> | undefined;
        onscroll?: EventHandler<UIEvent, T> | undefined;
        onsecuritypolicyviolation?: EventHandler<SecurityPolicyViolationEvent, T> | undefined;
        onseeked?: EventHandler<Event, T> | undefined;
        onseeking?: EventHandler<Event, T> | undefined;
        onselect?: EventHandler<UIEvent, T> | undefined;
        onselectionchange?: EventHandler<FocusEvent, T> | undefined;
        onselectstart?: EventHandler<FocusEvent, T> | undefined;
        onstalled?: EventHandler<Event, T> | undefined;
        onsubmit?: EventHandler<Event, T> | undefined;
        onsuspend?: EventHandler<Event, T> | undefined;
        ontimeupdate?: EventHandler<Event, T> | undefined;
        ontouchcancel?: EventHandler<TouchEvent, T> | undefined;
        ontouchend?: EventHandler<TouchEvent, T> | undefined;
        ontouchmove?: EventHandler<TouchEvent, T> | undefined;
        ontouchstart?: EventHandler<TouchEvent, T> | undefined;
        ontransitioncancel?: EventHandler<TransitionEvent, T> | undefined;
        ontransitionend?: EventHandler<TransitionEvent, T> | undefined;
        ontransitionrun?: EventHandler<TransitionEvent, T> | undefined;
        ontransitionstart?: EventHandler<TransitionEvent, T> | undefined;
        onvolumechange?: EventHandler<Event, T> | undefined;
        onwaiting?: EventHandler<Event, T> | undefined;
        onwheel?: EventHandler<WheelEvent, T> | undefined;
    }

    type CommonProps = {
        $hook?: Hooks;
        $key?: Key;
        /**
         * @deprecated Use `$attrs` attribute instead.
         */
        attrs?: Attrs;
        /**
         * @deprecated Use `$class` attribute instead.
         */
        class?: Classes;
        /**
         * @deprecated Use `$dataset` attribute instead.
         */
        data?: Dataset;
        /**
         * @deprecated Use `$dataset` attribute instead.
         */
        dataset?: Dataset;
        /**
         * @deprecated Use `$hook` attribute instead.
         */
        hook?: Hooks;
        /**
         * @deprecated Use `$key` attribute instead.
         */
        key?: Key;
        /**
         * @deprecated Use `on*` attributes instead.
         */
        on?: On;
        /**
         * @deprecated Pass properties as JSX attributes instead.
         */
        props?: Props;
        /**
         * @deprecated Use `$style` instead.
         */
        style?: Style;
    };

    type Modularize<Modules extends Record<string, any>> = {
        [Mod in keyof Modules as Mod extends string ? `$${Mod}` : never]?: Modules[Mod];
    };

    type HTMLElementProps<E extends HTMLElement, Props> = Props &
        CommonProps &
        EventListeners<E> &
        Modularize<jsx.CustomModules>;

    type SVGElementProps<E extends SVGElement> = EventListeners<E> &
        CommonProps &
        Modularize<jsx.CustomModules> & { [_: string]: any };

    type Style = CSS.Properties<string | number> &
        Partial<Record<'delayed' | 'destroy' | 'remove', CSS.Properties<string | number>>>;

    type AutoComplete =
        | 'additional-name'
        | 'address-level1'
        | 'address-level2'
        | 'address-level3'
        | 'address-level4'
        | 'address-line1'
        | 'address-line2'
        | 'address-line3'
        | 'bday'
        | 'bday-day'
        | 'bday-month'
        | 'bday-year'
        | 'cc-additional-name'
        | 'cc-csc'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
        | 'cc-family-name'
        | 'cc-given-name'
        | 'cc-name'
        | 'cc-number'
        | 'cc-type'
        | 'country'
        | 'country-name'
        | 'current-password'
        | 'email'
        | 'family-name'
        | 'fax'
        | 'given-name'
        | 'home'
        | 'honorific-prefix'
        | 'honorific-suffix'
        | 'impp'
        | 'language'
        | 'mobile'
        | 'name'
        | 'new-password'
        | 'nickname'
        | 'off'
        | 'on'
        | 'one-time-code'
        | 'organization'
        | 'organization-title'
        | 'pager'
        | 'photo'
        | 'postal-code'
        | 'sex'
        | 'street-address'
        | 'tel'
        | 'tel-area-code'
        | 'tel-country-code'
        | 'tel-extension'
        | 'tel-local'
        | 'tel-local-prefix'
        | 'tel-local-suffix'
        | 'tel-national'
        | 'transaction-amount'
        | 'transaction-currency'
        | 'url'
        | 'username'
        | 'work'
        | Whatever;

    type AutoCorrect = 'off' | 'on' | Whatever;

    type CrossOrigin = 'anonymous' | 'use-credentials' | '' | Whatever;

    type Loading = 'eager' | 'lazy' | Whatever;

    type ReferrerPolicy =
        | ''
        | 'no-referrer'
        | 'no-referrer-when-downgrade'
        | 'origin'
        | 'origin-when-cross-origin'
        | 'same-origin'
        | 'strict-origin'
        | 'strict-origin-when-cross-origin'
        | 'unsafe-url'
        | Whatever;

    type Target = '_self' | '_blank' | '_parent' | '_top' | Whatever;

    namespace Element {
        export type Role =
            | 'alert'
            | 'alertdialog'
            | 'application'
            | 'article'
            | 'banner'
            | 'button'
            | 'cell'
            | 'checkbox'
            | 'columnheader'
            | 'combobox'
            | 'complementary'
            | 'contentinfo'
            | 'definition'
            | 'dialog'
            | 'directory'
            | 'document'
            | 'feed'
            | 'figure'
            | 'form'
            | 'grid'
            | 'gridcell'
            | 'group'
            | 'heading'
            | 'img'
            | 'link'
            | 'list'
            | 'listbox'
            | 'listitem'
            | 'log'
            | 'main'
            | 'marquee'
            | 'math'
            | 'menu'
            | 'menubar'
            | 'menuitem'
            | 'menuitemcheckbox'
            | 'menuitemradio'
            | 'navigation'
            | 'none'
            | 'note'
            | 'option'
            | 'presentation'
            | 'progressbar'
            | 'radio'
            | 'radiogroup'
            | 'region'
            | 'row'
            | 'rowgroup'
            | 'rowheader'
            | 'scrollbar'
            | 'search'
            | 'searchbox'
            | 'separator'
            | 'slider'
            | 'spinbutton'
            | 'status'
            | 'switch'
            | 'tab'
            | 'table'
            | 'tablist'
            | 'tabpanel'
            | 'term'
            | 'textbox'
            | 'timer'
            | 'toolbar'
            | 'tooltip'
            | 'tree'
            | 'treegrid'
            | 'treeitem'
            | Whatever;

        interface Props {
            className?: string | undefined;
            id?: string | undefined;
            innerHTML?: string | undefined;
            outerHTML?: string | undefined;
            role?: Role | undefined;
            slot?: string | undefined;
        }
    }

    namespace HTMLElement {
        type AutoCapitalize = 'characters' | 'none' | 'sentences' | 'words' | Whatever;
        type ContentEditable = 'false' | 'inherit' | 'true' | Whatever;
        type Dir = 'ltr' | 'rtl' | 'auto' | Whatever;
        type EnterKeyHint = 'done' | 'enter' | 'go' | 'next' | 'previous' | 'search' | 'send' | Whatever;
        type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | Whatever;

        interface Props extends Element.Props {
            accessKey?: string | undefined;
            autocapitalize?: AutoCapitalize | undefined;
            contentEditable?: ContentEditable | undefined;
            dir?: Dir | undefined;
            draggable?: boolean | undefined;
            enterKeyHint?: EnterKeyHint | undefined;
            hidden?: boolean | undefined;
            inert?: boolean | undefined;
            innerText?: string | boolean;
            inputmode?: InputMode | undefined;
            is?: string | undefined;
            lang?: string | undefined;
            noModule?: boolean | undefined;
            nonce?: string | undefined;
            outerText?: string | undefined;
            spellcheck?: boolean | undefined;
            tabIndex?: number | string | undefined;
            title?: string | undefined;
            translate?: boolean | undefined;
        }
    }

    namespace HTMLAnchorElement {
        interface Props extends HTMLElement.Props {
            download?: string | undefined;
            href?: string | undefined;
            hreflang?: string | undefined;
            media?: string | undefined;
            ping?: string | undefined;
            referrerPolicy?: ReferrerPolicy | undefined;
            rel?: string | undefined;
            target?: Target | undefined;
            type?: string | undefined;
        }
    }

    namespace HTMLAudioElement {
        interface Props extends HTMLMediaElement.Props {}
    }

    namespace HTMLAreaElement {
        interface Props extends HTMLElement.Props {
            alt?: string | undefined;
            coords?: string | undefined;
            download?: string | undefined;
            href?: string | undefined;
            media?: string | undefined;
            referrerPolicy?: ReferrerPolicy | undefined;
            rel?: string | undefined;
            shape?: string | undefined;
            target?: Target | undefined;
        }
    }

    namespace HTMLBaseElement {
        interface Props extends HTMLElement.Props {
            href?: string | undefined;
            target?: Target | undefined;
        }
    }

    namespace HTMLBodyElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLBRElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLButtonElement {
        type Type = 'button' | 'reset' | 'submit' | Whatever;

        interface Props extends HTMLElement.Props {
            autofocus?: boolean | undefined;
            disabled?: boolean | undefined;
            formAction?: string | undefined;
            formEnctype?: string | undefined;
            formMethod?: string | undefined;
            formNoValidate?: boolean | undefined;
            formTarget?: string | undefined;
            name?: string | undefined;
            type?: Type | undefined;
            value?: string;
        }
    }

    namespace HTMLCanvasElement {
        interface Props extends HTMLElement.Props {
            height?: number | string | undefined;
            width?: number | string | undefined;
        }
    }

    namespace HTMLDataElement {
        interface Props extends HTMLElement.Props {
            value?: string | undefined;
        }
    }

    namespace HTMLDataListElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLDetailsElement {
        interface Props extends HTMLElement.Props {
            open?: boolean | undefined;
        }
    }

    namespace HTMLDialogElement {
        interface Props extends HTMLElement.Props {
            open?: boolean | undefined;
            returnValue?: string | undefined;
        }
    }

    namespace HTMLDivElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLDListElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLEmbedElement {
        interface Props extends HTMLElement.Props {
            height?: number | string | undefined;
            src?: string | undefined;
            type?: string | undefined;
            width?: number | string | undefined;
        }
    }

    namespace HTMLFieldSetElement {
        interface Props extends HTMLElement.Props {
            disabled?: boolean | undefined;
            name?: string | undefined;
        }
    }

    namespace HTMLFormElement {
        type AutoComplete = 'off' | 'on' | Whatever;
        type Method = 'get' | 'post' | 'dialog' | Whatever;

        interface Props extends HTMLElement.Props {
            acceptCharset?: string | undefined;
            action?: string | undefined;
            autocomplete?: AutoComplete | undefined;
            enctype?: string | undefined;
            method?: Method | undefined;
            name?: string | undefined;
            noValidate?: boolean | undefined;
            target?: Target | undefined;
        }
    }

    namespace HTMLHeadElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLHeadingElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLHRElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLHtmlElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLIFrameElement {
        interface Props extends HTMLElement.Props {
            allow?: string | undefined;
            allowPaymentRequest?: boolean | undefined;
            allowfullscreen?: boolean | undefined;
            csp?: string | undefined;
            height?: number | string | undefined;
            loading?: Whatever | undefined;
            name?: string | undefined;
            referrerPolicy?: ReferrerPolicy | undefined;
            sandbox?: string | undefined;
            src?: string | undefined;
            srcdoc?: string | undefined;
            width?: number | string | undefined;
        }
    }

    namespace HTMLImageElement {
        type Decoding = 'async' | 'auto' | 'sync' | Whatever;

        interface Props extends HTMLElement.Props {
            alt?: string | undefined;
            crossOrigin?: CrossOrigin | undefined;
            decoding?: Decoding | undefined;
            height?: number | string | undefined;
            isMap?: boolean | undefined;
            loading?: Loading | undefined;
            referrerPolicy?: ReferrerPolicy | undefined;
            sizes?: string | undefined;
            src?: string | undefined;
            srcset?: string | undefined;
            useMap?: string | undefined;
            width?: number | string | undefined;
        }
    }

    namespace HTMLInputElement {
        interface Props extends HTMLElement.Props {
            accept?: string | undefined;
            alt?: string | undefined;
            autocomplete?: string | undefined;
            /**
             * ⚠️ Non-standard
             */
            autocorrect?: AutoCorrect | undefined;
            autofocus?: boolean | undefined;
            capture?: string | undefined;
            checked?: boolean | undefined;
            defaultChecked?: boolean | undefined;
            defaultValue?: string | undefined;
            disabled?: boolean | undefined;
            form?: string | undefined;
            formAction?: string | undefined;
            formEnctype?: string | undefined;
            formMethod?: string | undefined;
            formNoValidate?: boolean | undefined;
            formTarget?: string | undefined;
            height?: number | string | undefined;
            indeterminate?: boolean | undefined;
            list?: string | undefined;
            max?: number | string | undefined;
            maxLength?: number | string | undefined;
            min?: number | string | undefined;
            minLength?: number | string | undefined;
            multiple?: boolean | undefined;
            name?: string | undefined;
            pattern?: string | undefined;
            placeholder?: string | undefined;
            readOnly?: boolean | undefined;
            required?: boolean | undefined;
            size?: number | string | undefined;
            src?: string | undefined;
            step?: number | string | undefined;
            type?: string | undefined;
            value?: string | undefined;
            valueAsDate?: Date | undefined;
            valueAsNumber?: number | undefined;
            width?: number | string | undefined;
        }
    }

    namespace HTMLLabelElement {
        interface Props extends HTMLElement.Props {
            htmlFor?: string | undefined;
        }
    }

    namespace HTMLLegendElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLLIElement {
        interface Props extends HTMLElement.Props {
            value?: number | string | undefined;
        }
    }

    namespace HTMLLinkElement {
        interface Props extends HTMLElement.Props {
            as?: string | undefined;
            crossOrigin?: CrossOrigin | undefined;
            href?: string | undefined;
            hreflang?: string | undefined;
            integrity?: string | undefined;
            media?: string | undefined;
            referrerPolicy?: ReferrerPolicy | undefined;
            rel?: string | undefined;
            type?: string | undefined;
        }
    }

    namespace HTMLMapElement {
        interface Props extends HTMLElement.Props {
            name?: string | undefined;
        }
    }

    namespace HTMLMediaElement {
        interface Props extends HTMLElement.Props {
            autoplay?: boolean | undefined;
            controls?: boolean | undefined;
            controlsList?: string | undefined;
            crossOrigin?: CrossOrigin | undefined;
            loop?: boolean | undefined;
            muted?: boolean | undefined;
            preload?: string | undefined;
            src?: string | undefined;
            volume?: number | string | undefined;
        }
    }

    namespace HTMLMenuElement {
        interface Props extends HTMLElement.Props {
            type?: string | undefined;
        }
    }

    namespace HTMLMetaElement {
        interface Props extends HTMLElement.Props {
            charset?: string | undefined;
            content?: string | undefined;
            httpEquiv?: string | undefined;
            name?: string | undefined;
        }
    }

    namespace HTMLMeterElement {
        interface Props extends HTMLElement.Props {
            high?: number | string | undefined;
            low?: number | string | undefined;
            max?: number | string | undefined;
            min?: number | string | undefined;
            optimum?: number | string | undefined;
            value?: number | string | undefined;
        }
    }

    namespace HTMLModElement {
        interface Props extends HTMLElement.Props {
            cite?: string | undefined;
            dateTime?: string | undefined;
        }
    }

    namespace HTMLObjectElement {
        interface Props extends HTMLElement.Props {
            data?: string | undefined;
            height?: number | string | undefined;
            name?: string | undefined;
            type?: string | undefined;
            useMap?: string | undefined;
            width?: number | string | undefined;
        }
    }

    namespace HTMLOListElement {
        type Type = '1' | 'a' | 'A' | 'i' | 'I' | Whatever;

        interface Props extends HTMLElement.Props {
            reversed?: boolean | undefined;
            start?: number | string | undefined;
            type?: Type | undefined;
        }
    }

    namespace HTMLOptGroupElement {
        interface Props extends HTMLElement.Props {
            disabled?: boolean | undefined;
            label?: string | undefined;
        }
    }

    namespace HTMLOptionElement {
        interface Props extends HTMLElement.Props {
            disabled?: boolean | undefined;
            label?: string | undefined;
            selected?: boolean | undefined;
            value?: string | undefined;
        }
    }

    namespace HTMLOutputElement {
        interface Props extends HTMLElement.Props {
            defaultValue?: string | undefined;
            form?: string | undefined;
            htmlFor?: string | undefined;
            name?: string | undefined;
        }
    }

    namespace HTMLParagraphElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLParamElement {
        interface Props extends HTMLElement.Props {
            name?: string | undefined;
            value?: string | undefined;
        }
    }

    namespace HTMLPreElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLProgressElement {
        interface Props extends HTMLElement.Props {
            max?: number | string | undefined;
            value?: number | string | undefined;
        }
    }

    namespace HTMLQuoteElement {
        interface Props extends HTMLElement.Props {
            cite?: string | undefined;
        }
    }

    namespace HTMLScriptElement {
        interface Props extends HTMLElement.Props {
            async?: boolean | undefined;
            crossOrigin?: CrossOrigin | undefined;
            defer?: boolean | undefined;
            integrity?: string | undefined;
            referrerPolicy?: ReferrerPolicy | undefined;
            src?: string | undefined;
            type?: string | undefined;
        }
    }

    namespace HTMLSelectElement {
        interface Props extends HTMLElement.Props {
            autocomplete?: AutoComplete | undefined;
            autofocus?: boolean | undefined;
            disabled?: boolean | undefined;
            multiple?: boolean | undefined;
            name?: string | undefined;
            required?: boolean | undefined;
            selectedIndex?: number | undefined;
            size?: number | string | undefined;
            value?: string | undefined;
        }
    }

    namespace HTMLSlotElement {
        interface Props extends HTMLElement.Props {
            name?: string | undefined;
        }
    }

    namespace HTMLSourceElement {
        interface Props extends HTMLElement.Props {
            media?: string | undefined;
            sizes?: string | undefined;
            src?: string | undefined;
            srcset?: string | undefined;
            type?: string | undefined;
        }
    }

    namespace HTMLSpanElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLStyleElement {
        interface Props extends HTMLElement.Props {
            disabled?: boolean | undefined;
            media?: string | undefined;
            /**
             * ⚠️ Non-standard
             */
            scoped?: boolean | undefined;
        }
    }

    namespace HTMLTableColElement {
        interface Props extends HTMLElement.Props {
            span?: number | string | undefined;
        }
    }

    namespace HTMLTableCellElement {
        interface Props extends HTMLElement.Props {
            abbr?: string | undefined;
            colSpan?: number | string | undefined;
            rowSpan?: number | string | undefined;
            scope?: string | undefined;
        }
    }

    namespace HTMLTableDataCellElement {
        interface Props extends HTMLTableCellElement.Props {}
    }

    namespace HTMLTableElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLTableHeaderCellElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLTableRowElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLTableSectionElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLTemplateElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLTextAreaElement {
        type Wrap = 'off' | 'soft' | 'hard';

        interface Props extends HTMLElement.Props {
            autocomplete?: AutoComplete | undefined;
            autofocus?: boolean | undefined;
            cols?: number | string | undefined;
            defaultValue?: string | undefined;
            dirName?: string | undefined;
            disabled?: boolean | undefined;
            maxLength?: number | string | undefined;
            minLength?: number | string | undefined;
            name?: string | undefined;
            placeholder?: string | undefined;
            readOnly?: boolean | undefined;
            required?: boolean | undefined;
            rows?: number | string | undefined;
            value?: string | undefined;
            wrap?: Wrap | undefined;
        }
    }

    namespace HTMLTimeElement {
        interface Props extends HTMLElement.Props {
            dateTime?: string | undefined;
        }
    }

    namespace HTMLTitleElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLTrackElement {
        interface Props extends HTMLElement.Props {
            default?: boolean | undefined;
            kind?: string | undefined;
            label?: string | undefined;
            src?: string | undefined;
            srclang?: string | undefined;
        }
    }

    namespace HTMLUListElement {
        interface Props extends HTMLElement.Props {}
    }

    namespace HTMLVideoElement {
        interface Props extends HTMLMediaElement.Props {
            disablePictureInPicture?: boolean | undefined;
            disableRemotePlayback?: boolean | undefined;
            height?: number | string | undefined;
            playsInline?: boolean | undefined;
            poster?: string | undefined;
            width?: number | string | undefined;
        }
    }
}

declare namespace Snabbdom {
    type Component<Props> = (this: void, props: Readonly<Props>, children?: VNode[]) => VNode;
    type Node = boolean | null | number | string | undefined | VNode;
}
// eslint-disable-next-line import/no-default-export
export default Snabbdom;

export declare namespace jsx {
    export interface CustomModules {
        attrs: Attrs;
        class: Classes;
        dataset: Dataset;
        props: Props;
        on: On;
        style: Internal.Style;
    }

    namespace JSX {
        type Element = VNode;

        type IntrinsicAttributes = {
            $key?: Key;
        };

        interface IntrinsicElements {
            // HTML
            a: Internal.HTMLElementProps<HTMLAnchorElement, Internal.HTMLAnchorElement.Props>;
            abbr: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            address: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            area: Internal.HTMLElementProps<HTMLAreaElement, Internal.HTMLAreaElement.Props>;
            article: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            aside: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            audio: Internal.HTMLElementProps<HTMLAudioElement, Internal.HTMLAudioElement.Props>;
            b: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            base: Internal.HTMLElementProps<HTMLBaseElement, Internal.HTMLBaseElement.Props>;
            bdi: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            bdo: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            big: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            blockquote: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            body: Internal.HTMLElementProps<HTMLBodyElement, Internal.HTMLBodyElement.Props>;
            br: Internal.HTMLElementProps<HTMLBRElement, Internal.HTMLBRElement.Props>;
            button: Internal.HTMLElementProps<HTMLButtonElement, Internal.HTMLButtonElement.Props>;
            canvas: Internal.HTMLElementProps<HTMLCanvasElement, Internal.HTMLCanvasElement.Props>;
            caption: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            cite: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            code: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            col: Internal.HTMLElementProps<HTMLTableColElement, Internal.HTMLTableColElement.Props>;
            colgroup: Internal.HTMLElementProps<HTMLTableColElement, Internal.HTMLTableColElement.Props>;
            data: Internal.HTMLElementProps<HTMLDataElement, Internal.HTMLDataElement.Props>;
            datalist: Internal.HTMLElementProps<HTMLDataListElement, Internal.HTMLDataListElement.Props>;
            dd: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            del: Internal.HTMLElementProps<HTMLModElement, Internal.HTMLModElement.Props>;
            details: Internal.HTMLElementProps<HTMLDetailsElement, Internal.HTMLDetailsElement.Props>;
            dfn: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            dialog: Internal.HTMLElementProps<HTMLDialogElement, Internal.HTMLDialogElement.Props>;
            div: Internal.HTMLElementProps<HTMLDivElement, Internal.HTMLDivElement.Props>;
            dl: Internal.HTMLElementProps<HTMLDListElement, Internal.HTMLDListElement.Props>;
            dt: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            em: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            embed: Internal.HTMLElementProps<HTMLEmbedElement, Internal.HTMLEmbedElement.Props>;
            fieldset: Internal.HTMLElementProps<HTMLFieldSetElement, Internal.HTMLFieldSetElement.Props>;
            figcaption: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            figure: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            footer: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            form: Internal.HTMLElementProps<HTMLFormElement, Internal.HTMLFormElement.Props>;
            h1: Internal.HTMLElementProps<HTMLHeadingElement, Internal.HTMLHeadingElement.Props>;
            h2: Internal.HTMLElementProps<HTMLHeadingElement, Internal.HTMLHeadingElement.Props>;
            h3: Internal.HTMLElementProps<HTMLHeadingElement, Internal.HTMLHeadingElement.Props>;
            h4: Internal.HTMLElementProps<HTMLHeadingElement, Internal.HTMLHeadingElement.Props>;
            h5: Internal.HTMLElementProps<HTMLHeadingElement, Internal.HTMLHeadingElement.Props>;
            h6: Internal.HTMLElementProps<HTMLHeadingElement, Internal.HTMLHeadingElement.Props>;
            head: Internal.HTMLElementProps<HTMLHeadElement, Internal.HTMLHeadElement.Props>;
            header: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            hgroup: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            hr: Internal.HTMLElementProps<HTMLHRElement, Internal.HTMLHRElement.Props>;
            html: Internal.HTMLElementProps<HTMLHtmlElement, Internal.HTMLHtmlElement.Props>;
            i: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            iframe: Internal.HTMLElementProps<HTMLIFrameElement, Internal.HTMLIFrameElement.Props>;
            img: Internal.HTMLElementProps<HTMLImageElement, Internal.HTMLImageElement.Props>;
            input: Internal.HTMLElementProps<HTMLInputElement, Internal.HTMLInputElement.Props>;
            ins: Internal.HTMLElementProps<HTMLModElement, Internal.HTMLModElement.Props>;
            kbd: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            keygen: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            label: Internal.HTMLElementProps<HTMLLabelElement, Internal.HTMLLabelElement.Props>;
            legend: Internal.HTMLElementProps<HTMLLegendElement, Internal.HTMLLegendElement.Props>;
            li: Internal.HTMLElementProps<HTMLLIElement, Internal.HTMLLIElement.Props>;
            link: Internal.HTMLElementProps<HTMLLinkElement, Internal.HTMLLinkElement.Props>;
            main: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            map: Internal.HTMLElementProps<HTMLMapElement, Internal.HTMLMapElement.Props>;
            mark: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            menu: Internal.HTMLElementProps<HTMLMenuElement, Internal.HTMLMenuElement.Props>;
            menuitem: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            meta: Internal.HTMLElementProps<HTMLMetaElement, Internal.HTMLMetaElement.Props>;
            meter: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            nav: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            noindex: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            noscript: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            object: Internal.HTMLElementProps<HTMLObjectElement, Internal.HTMLObjectElement.Props>;
            ol: Internal.HTMLElementProps<HTMLOListElement, Internal.HTMLOListElement.Props>;
            optgroup: Internal.HTMLElementProps<HTMLOptGroupElement, Internal.HTMLOptGroupElement.Props>;
            option: Internal.HTMLElementProps<HTMLOptionElement, Internal.HTMLOptionElement.Props>;
            output: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            p: Internal.HTMLElementProps<HTMLParagraphElement, Internal.HTMLParagraphElement.Props>;
            param: Internal.HTMLElementProps<HTMLParamElement, Internal.HTMLParamElement.Props>;
            picture: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            pre: Internal.HTMLElementProps<HTMLPreElement, Internal.HTMLPreElement.Props>;
            progress: Internal.HTMLElementProps<HTMLProgressElement, Internal.HTMLProgressElement.Props>;
            q: Internal.HTMLElementProps<HTMLQuoteElement, Internal.HTMLQuoteElement.Props>;
            rp: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            rt: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            ruby: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            s: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            samp: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            slot: Internal.HTMLElementProps<HTMLSlotElement, Internal.HTMLSlotElement.Props>;
            script: Internal.HTMLElementProps<HTMLScriptElement, Internal.HTMLScriptElement.Props>;
            section: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            select: Internal.HTMLElementProps<HTMLSelectElement, Internal.HTMLSelectElement.Props>;
            small: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            source: Internal.HTMLElementProps<HTMLSourceElement, Internal.HTMLSourceElement.Props>;
            span: Internal.HTMLElementProps<HTMLSpanElement, Internal.HTMLSpanElement.Props>;
            strong: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            style: Internal.HTMLElementProps<HTMLStyleElement, Internal.HTMLStyleElement.Props>;
            sub: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            summary: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            sup: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            table: Internal.HTMLElementProps<HTMLTableElement, Internal.HTMLTableElement.Props>;
            template: Internal.HTMLElementProps<HTMLTemplateElement, Internal.HTMLTemplateElement.Props>;
            tbody: Internal.HTMLElementProps<HTMLTableSectionElement, Internal.HTMLTableSectionElement.Props>;
            td: Internal.HTMLElementProps<HTMLTableDataCellElement, Internal.HTMLTableDataCellElement.Props>;
            textarea: Internal.HTMLElementProps<HTMLTextAreaElement, Internal.HTMLTextAreaElement.Props>;
            tfoot: Internal.HTMLElementProps<HTMLTableSectionElement, Internal.HTMLTableSectionElement.Props>;
            th: Internal.HTMLElementProps<HTMLTableHeaderCellElement, Internal.HTMLTableHeaderCellElement.Props>;
            thead: Internal.HTMLElementProps<HTMLTableSectionElement, Internal.HTMLTableSectionElement.Props>;
            time: Internal.HTMLElementProps<HTMLTimeElement, Internal.HTMLTimeElement.Props>;
            title: Internal.HTMLElementProps<HTMLTitleElement, Internal.HTMLTitleElement.Props>;
            tr: Internal.HTMLElementProps<HTMLTableRowElement, Internal.HTMLTableRowElement.Props>;
            track: Internal.HTMLElementProps<HTMLTrackElement, Internal.HTMLTrackElement.Props>;
            u: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            ul: Internal.HTMLElementProps<HTMLUListElement, Internal.HTMLUListElement.Props>;
            var: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;
            video: Internal.HTMLElementProps<HTMLVideoElement, Internal.HTMLVideoElement.Props>;
            wbr: Internal.HTMLElementProps<HTMLElement, Internal.HTMLElement.Props>;

            // SVG
            animate: Internal.SVGElementProps<SVGAnimateElement>;
            animateMotion: Internal.SVGElementProps<SVGElement>;
            animateTransform: Internal.SVGElementProps<SVGAnimateTransformElement>;
            circle: Internal.SVGElementProps<SVGCircleElement>;
            clipPath: Internal.SVGElementProps<SVGClipPathElement>;
            defs: Internal.SVGElementProps<SVGDefsElement>;
            desc: Internal.SVGElementProps<SVGDescElement>;
            ellipse: Internal.SVGElementProps<SVGEllipseElement>;
            feBlend: Internal.SVGElementProps<SVGFEBlendElement>;
            feColorMatrix: Internal.SVGElementProps<SVGFEColorMatrixElement>;
            feComponentTransfer: Internal.SVGElementProps<SVGFEComponentTransferElement>;
            feComposite: Internal.SVGElementProps<SVGFECompositeElement>;
            feConvolveMatrix: Internal.SVGElementProps<SVGFEConvolveMatrixElement>;
            feDiffuseLighting: Internal.SVGElementProps<SVGFEDiffuseLightingElement>;
            feDisplacementMap: Internal.SVGElementProps<SVGFEDisplacementMapElement>;
            feDistantLight: Internal.SVGElementProps<SVGFEDistantLightElement>;
            feDropShadow: Internal.SVGElementProps<SVGFEDropShadowElement>;
            feFlood: Internal.SVGElementProps<SVGFEFloodElement>;
            feFuncA: Internal.SVGElementProps<SVGFEFuncAElement>;
            feFuncB: Internal.SVGElementProps<SVGFEFuncBElement>;
            feFuncG: Internal.SVGElementProps<SVGFEFuncGElement>;
            feFuncR: Internal.SVGElementProps<SVGFEFuncRElement>;
            feGaussianBlur: Internal.SVGElementProps<SVGFEGaussianBlurElement>;
            feImage: Internal.SVGElementProps<SVGFEImageElement>;
            feMerge: Internal.SVGElementProps<SVGFEMergeElement>;
            feMergeNode: Internal.SVGElementProps<SVGFEMergeNodeElement>;
            feMorphology: Internal.SVGElementProps<SVGFEMorphologyElement>;
            feOffset: Internal.SVGElementProps<SVGFEOffsetElement>;
            fePointLight: Internal.SVGElementProps<SVGFEPointLightElement>;
            feSpecularLighting: Internal.SVGElementProps<SVGFESpecularLightingElement>;
            feSpotLight: Internal.SVGElementProps<SVGFESpotLightElement>;
            feTile: Internal.SVGElementProps<SVGFETileElement>;
            feTurbulence: Internal.SVGElementProps<SVGFETurbulenceElement>;
            filter: Internal.SVGElementProps<SVGFilterElement>;
            foreignObject: Internal.SVGElementProps<SVGForeignObjectElement>;
            g: Internal.SVGElementProps<SVGGElement>;
            image: Internal.SVGElementProps<SVGImageElement>;
            line: Internal.SVGElementProps<SVGLineElement>;
            linearGradient: Internal.SVGElementProps<SVGLinearGradientElement>;
            marker: Internal.SVGElementProps<SVGMarkerElement>;
            mask: Internal.SVGElementProps<SVGMaskElement>;
            metadata: Internal.SVGElementProps<SVGMetadataElement>;
            mpath: Internal.SVGElementProps<SVGElement>;
            path: Internal.SVGElementProps<SVGPathElement>;
            pattern: Internal.SVGElementProps<SVGPatternElement>;
            polygon: Internal.SVGElementProps<SVGPolygonElement>;
            polyline: Internal.SVGElementProps<SVGPolylineElement>;
            radialGradient: Internal.SVGElementProps<SVGRadialGradientElement>;
            rect: Internal.SVGElementProps<SVGRectElement>;
            stop: Internal.SVGElementProps<SVGStopElement>;
            svg: Internal.SVGElementProps<SVGSVGElement>;
            switch: Internal.SVGElementProps<SVGSwitchElement>;
            symbol: Internal.SVGElementProps<SVGSymbolElement>;
            text: Internal.SVGElementProps<SVGTextElement>;
            textPath: Internal.SVGElementProps<SVGTextPathElement>;
            tspan: Internal.SVGElementProps<SVGTSpanElement>;
            use: Internal.SVGElementProps<SVGUseElement>;
            view: Internal.SVGElementProps<SVGViewElement>;
        }
    }
}

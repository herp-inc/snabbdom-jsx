import type * as CSS from 'csstype';
import type { Attrs, Classes, Dataset, Hooks, Key, On, Props, VNode, VNodeData } from 'snabbdom';

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
    $hook?: Hooks | undefined;
    $key?: Key | undefined;
    /**
     * @deprecated Use `$attrs` attribute instead.
     */
    attrs?: Attrs | undefined;
    children?: Snabbdom.Node;
    /**
     * @deprecated Use `$class` attribute instead.
     */
    class?: Classes | undefined;
    /**
     * @deprecated Use `$dataset` attribute instead.
     */
    data?: Dataset | undefined;
    /**
     * @deprecated Use `$dataset` attribute instead.
     */
    dataset?: Dataset | undefined;
    /**
     * @deprecated Use `$hook` attribute instead.
     */
    hook?: Hooks | undefined;
    /**
     * @deprecated Use `$key` attribute instead.
     */
    key?: Key | undefined;
    /**
     * @deprecated Use `on*` attributes instead.
     */
    on?: On | undefined;
    /**
     * @deprecated Pass properties as JSX attributes instead.
     */
    props?: Props | undefined;
    /**
     * @deprecated Use `$style` instead.
     */
    style?: Snabbdom.Style | undefined;
};

type Modularize<Modules extends Record<string, any>> = {
    [Mod in keyof Modules as Mod extends string ? `$${Mod}` : never]?: Modules[Mod] | undefined;
};

type HTMLElementProps<E extends HTMLElement, Props> = Props &
    CommonProps &
    EventListeners<E> &
    Modularize<jsx.CustomModules>;

type SVGElementProps<E extends SVGElement> = EventListeners<E> &
    CommonProps &
    Modularize<jsx.CustomModules> & { [_: string]: any };

type Target = '_self' | '_blank' | '_parent' | '_top' | Whatever;

declare namespace Snabbdom {
    type Component<Props> = (this: void, props: Readonly<Props>, children?: Node) => VNode;
    type Node = VNodeChildElement | readonly Node[];
    type VNodeChildElement = bigint | boolean | null | number | string | undefined | VNode;

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

    namespace Element {
        type Role =
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
        type Popover = 'auto' | 'manual';

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
            popover?: Popover | true | undefined;
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
        type PopoverTargetAction = 'hide' | 'show' | 'toggle';
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
            popoverTarget?: string | undefined;
            popoverTargetAction?: PopoverTargetAction | undefined;
            type?: Type | undefined;
            value?: string | undefined;
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
        interface Props extends HTMLTableCellElement.Props {}
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

declare namespace JSX {
    interface ElementChildrenAttribute {
        children: unknown;
    }

    /**
     * @deprecated
     */
    type Element = VNode;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ElementType = keyof IntrinsicElements | ((props: any, children?: Snabbdom.Node) => Snabbdom.VNodeChildElement);

    type IntrinsicAttributes = {
        $key?: Key | undefined;
        children?: unknown;
    };

    interface IntrinsicElements {
        // HTML
        a: HTMLElementProps<HTMLAnchorElement, Snabbdom.HTMLAnchorElement.Props>;
        abbr: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        address: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        area: HTMLElementProps<HTMLAreaElement, Snabbdom.HTMLAreaElement.Props>;
        article: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        aside: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        audio: HTMLElementProps<HTMLAudioElement, Snabbdom.HTMLAudioElement.Props>;
        b: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        base: HTMLElementProps<HTMLBaseElement, Snabbdom.HTMLBaseElement.Props>;
        bdi: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        bdo: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        big: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        blockquote: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        body: HTMLElementProps<HTMLBodyElement, Snabbdom.HTMLBodyElement.Props>;
        br: HTMLElementProps<HTMLBRElement, Snabbdom.HTMLBRElement.Props>;
        button: HTMLElementProps<HTMLButtonElement, Snabbdom.HTMLButtonElement.Props>;
        canvas: HTMLElementProps<HTMLCanvasElement, Snabbdom.HTMLCanvasElement.Props>;
        caption: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        cite: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        code: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        col: HTMLElementProps<HTMLTableColElement, Snabbdom.HTMLTableColElement.Props>;
        colgroup: HTMLElementProps<HTMLTableColElement, Snabbdom.HTMLTableColElement.Props>;
        data: HTMLElementProps<HTMLDataElement, Snabbdom.HTMLDataElement.Props>;
        datalist: HTMLElementProps<HTMLDataListElement, Snabbdom.HTMLDataListElement.Props>;
        dd: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        del: HTMLElementProps<HTMLModElement, Snabbdom.HTMLModElement.Props>;
        details: HTMLElementProps<HTMLDetailsElement, Snabbdom.HTMLDetailsElement.Props>;
        dfn: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        dialog: HTMLElementProps<HTMLDialogElement, Snabbdom.HTMLDialogElement.Props>;
        div: HTMLElementProps<HTMLDivElement, Snabbdom.HTMLDivElement.Props>;
        dl: HTMLElementProps<HTMLDListElement, Snabbdom.HTMLDListElement.Props>;
        dt: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        em: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        embed: HTMLElementProps<HTMLEmbedElement, Snabbdom.HTMLEmbedElement.Props>;
        fieldset: HTMLElementProps<HTMLFieldSetElement, Snabbdom.HTMLFieldSetElement.Props>;
        figcaption: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        figure: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        footer: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        form: HTMLElementProps<HTMLFormElement, Snabbdom.HTMLFormElement.Props>;
        h1: HTMLElementProps<HTMLHeadingElement, Snabbdom.HTMLHeadingElement.Props>;
        h2: HTMLElementProps<HTMLHeadingElement, Snabbdom.HTMLHeadingElement.Props>;
        h3: HTMLElementProps<HTMLHeadingElement, Snabbdom.HTMLHeadingElement.Props>;
        h4: HTMLElementProps<HTMLHeadingElement, Snabbdom.HTMLHeadingElement.Props>;
        h5: HTMLElementProps<HTMLHeadingElement, Snabbdom.HTMLHeadingElement.Props>;
        h6: HTMLElementProps<HTMLHeadingElement, Snabbdom.HTMLHeadingElement.Props>;
        head: HTMLElementProps<HTMLHeadElement, Snabbdom.HTMLHeadElement.Props>;
        header: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        hgroup: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        hr: HTMLElementProps<HTMLHRElement, Snabbdom.HTMLHRElement.Props>;
        html: HTMLElementProps<HTMLHtmlElement, Snabbdom.HTMLHtmlElement.Props>;
        i: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        iframe: HTMLElementProps<HTMLIFrameElement, Snabbdom.HTMLIFrameElement.Props>;
        img: HTMLElementProps<HTMLImageElement, Snabbdom.HTMLImageElement.Props>;
        input: HTMLElementProps<HTMLInputElement, Snabbdom.HTMLInputElement.Props>;
        ins: HTMLElementProps<HTMLModElement, Snabbdom.HTMLModElement.Props>;
        kbd: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        keygen: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        label: HTMLElementProps<HTMLLabelElement, Snabbdom.HTMLLabelElement.Props>;
        legend: HTMLElementProps<HTMLLegendElement, Snabbdom.HTMLLegendElement.Props>;
        li: HTMLElementProps<HTMLLIElement, Snabbdom.HTMLLIElement.Props>;
        link: HTMLElementProps<HTMLLinkElement, Snabbdom.HTMLLinkElement.Props>;
        main: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        map: HTMLElementProps<HTMLMapElement, Snabbdom.HTMLMapElement.Props>;
        mark: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        menu: HTMLElementProps<HTMLMenuElement, Snabbdom.HTMLMenuElement.Props>;
        menuitem: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        meta: HTMLElementProps<HTMLMetaElement, Snabbdom.HTMLMetaElement.Props>;
        meter: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        nav: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        noindex: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        noscript: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        object: HTMLElementProps<HTMLObjectElement, Snabbdom.HTMLObjectElement.Props>;
        ol: HTMLElementProps<HTMLOListElement, Snabbdom.HTMLOListElement.Props>;
        optgroup: HTMLElementProps<HTMLOptGroupElement, Snabbdom.HTMLOptGroupElement.Props>;
        option: HTMLElementProps<HTMLOptionElement, Snabbdom.HTMLOptionElement.Props>;
        output: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        p: HTMLElementProps<HTMLParagraphElement, Snabbdom.HTMLParagraphElement.Props>;
        param: HTMLElementProps<HTMLParamElement, Snabbdom.HTMLParamElement.Props>;
        picture: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        pre: HTMLElementProps<HTMLPreElement, Snabbdom.HTMLPreElement.Props>;
        progress: HTMLElementProps<HTMLProgressElement, Snabbdom.HTMLProgressElement.Props>;
        q: HTMLElementProps<HTMLQuoteElement, Snabbdom.HTMLQuoteElement.Props>;
        rp: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        rt: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        ruby: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        s: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        samp: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        slot: HTMLElementProps<HTMLSlotElement, Snabbdom.HTMLSlotElement.Props>;
        script: HTMLElementProps<HTMLScriptElement, Snabbdom.HTMLScriptElement.Props>;
        section: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        select: HTMLElementProps<HTMLSelectElement, Snabbdom.HTMLSelectElement.Props>;
        small: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        source: HTMLElementProps<HTMLSourceElement, Snabbdom.HTMLSourceElement.Props>;
        span: HTMLElementProps<HTMLSpanElement, Snabbdom.HTMLSpanElement.Props>;
        strong: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        style: HTMLElementProps<HTMLStyleElement, Snabbdom.HTMLStyleElement.Props>;
        sub: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        summary: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        sup: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        table: HTMLElementProps<HTMLTableElement, Snabbdom.HTMLTableElement.Props>;
        template: HTMLElementProps<HTMLTemplateElement, Snabbdom.HTMLTemplateElement.Props>;
        tbody: HTMLElementProps<HTMLTableSectionElement, Snabbdom.HTMLTableSectionElement.Props>;
        td: HTMLElementProps<HTMLTableCellElement, Snabbdom.HTMLTableDataCellElement.Props>;
        textarea: HTMLElementProps<HTMLTextAreaElement, Snabbdom.HTMLTextAreaElement.Props>;
        tfoot: HTMLElementProps<HTMLTableSectionElement, Snabbdom.HTMLTableSectionElement.Props>;
        th: HTMLElementProps<HTMLTableCellElement, Snabbdom.HTMLTableHeaderCellElement.Props>;
        thead: HTMLElementProps<HTMLTableSectionElement, Snabbdom.HTMLTableSectionElement.Props>;
        time: HTMLElementProps<HTMLTimeElement, Snabbdom.HTMLTimeElement.Props>;
        title: HTMLElementProps<HTMLTitleElement, Snabbdom.HTMLTitleElement.Props>;
        tr: HTMLElementProps<HTMLTableRowElement, Snabbdom.HTMLTableRowElement.Props>;
        track: HTMLElementProps<HTMLTrackElement, Snabbdom.HTMLTrackElement.Props>;
        u: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        ul: HTMLElementProps<HTMLUListElement, Snabbdom.HTMLUListElement.Props>;
        var: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;
        video: HTMLElementProps<HTMLVideoElement, Snabbdom.HTMLVideoElement.Props>;
        wbr: HTMLElementProps<HTMLElement, Snabbdom.HTMLElement.Props>;

        // SVG
        animate: SVGElementProps<SVGAnimateElement>;
        animateMotion: SVGElementProps<SVGElement>;
        animateTransform: SVGElementProps<SVGAnimateTransformElement>;
        circle: SVGElementProps<SVGCircleElement>;
        clipPath: SVGElementProps<SVGClipPathElement>;
        defs: SVGElementProps<SVGDefsElement>;
        desc: SVGElementProps<SVGDescElement>;
        ellipse: SVGElementProps<SVGEllipseElement>;
        feBlend: SVGElementProps<SVGFEBlendElement>;
        feColorMatrix: SVGElementProps<SVGFEColorMatrixElement>;
        feComponentTransfer: SVGElementProps<SVGFEComponentTransferElement>;
        feComposite: SVGElementProps<SVGFECompositeElement>;
        feConvolveMatrix: SVGElementProps<SVGFEConvolveMatrixElement>;
        feDiffuseLighting: SVGElementProps<SVGFEDiffuseLightingElement>;
        feDisplacementMap: SVGElementProps<SVGFEDisplacementMapElement>;
        feDistantLight: SVGElementProps<SVGFEDistantLightElement>;
        feDropShadow: SVGElementProps<SVGFEDropShadowElement>;
        feFlood: SVGElementProps<SVGFEFloodElement>;
        feFuncA: SVGElementProps<SVGFEFuncAElement>;
        feFuncB: SVGElementProps<SVGFEFuncBElement>;
        feFuncG: SVGElementProps<SVGFEFuncGElement>;
        feFuncR: SVGElementProps<SVGFEFuncRElement>;
        feGaussianBlur: SVGElementProps<SVGFEGaussianBlurElement>;
        feImage: SVGElementProps<SVGFEImageElement>;
        feMerge: SVGElementProps<SVGFEMergeElement>;
        feMergeNode: SVGElementProps<SVGFEMergeNodeElement>;
        feMorphology: SVGElementProps<SVGFEMorphologyElement>;
        feOffset: SVGElementProps<SVGFEOffsetElement>;
        fePointLight: SVGElementProps<SVGFEPointLightElement>;
        feSpecularLighting: SVGElementProps<SVGFESpecularLightingElement>;
        feSpotLight: SVGElementProps<SVGFESpotLightElement>;
        feTile: SVGElementProps<SVGFETileElement>;
        feTurbulence: SVGElementProps<SVGFETurbulenceElement>;
        filter: SVGElementProps<SVGFilterElement>;
        foreignObject: SVGElementProps<SVGForeignObjectElement>;
        g: SVGElementProps<SVGGElement>;
        image: SVGElementProps<SVGImageElement>;
        line: SVGElementProps<SVGLineElement>;
        linearGradient: SVGElementProps<SVGLinearGradientElement>;
        marker: SVGElementProps<SVGMarkerElement>;
        mask: SVGElementProps<SVGMaskElement>;
        metadata: SVGElementProps<SVGMetadataElement>;
        mpath: SVGElementProps<SVGElement>;
        path: SVGElementProps<SVGPathElement>;
        pattern: SVGElementProps<SVGPatternElement>;
        polygon: SVGElementProps<SVGPolygonElement>;
        polyline: SVGElementProps<SVGPolylineElement>;
        radialGradient: SVGElementProps<SVGRadialGradientElement>;
        rect: SVGElementProps<SVGRectElement>;
        stop: SVGElementProps<SVGStopElement>;
        svg: SVGElementProps<SVGSVGElement>;
        switch: SVGElementProps<SVGSwitchElement>;
        symbol: SVGElementProps<SVGSymbolElement>;
        text: SVGElementProps<SVGTextElement>;
        textPath: SVGElementProps<SVGTextPathElement>;
        tspan: SVGElementProps<SVGTSpanElement>;
        use: SVGElementProps<SVGUseElement>;
        view: SVGElementProps<SVGViewElement>;
    }
}

declare namespace jsx {
    interface CustomModules {
        attrs: Attrs;
        class: Classes;
        dataset: Dataset;
        props: Props;
        on: On;
        style: Snabbdom.Style;
    }
}

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
        } else if (key === 'popover' && v === true) {
            data.props ??= {};
            data.props['popover'] = 'auto';
        } else if (key === 'popoverTarget') {
            data.attrs ??= {};
            data.attrs['popovertarget'] = v;
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

const flatten = (children: readonly Snabbdom.Node[]): VNode[] =>
    children.flatMap((x) => (isArrayChildren(x) ? flatten(x) : vnodify(x)));

const jsx = (tag: JSX.ElementType, data: { [index: string]: unknown }, key?: Key): VNode => {
    data['key'] = key;

    const hasChildren = 'children' in data;

    // value-based elements
    if (typeof tag === 'function') {
        let vnode: VNode;

        if (tag.length === 1) {
            vnode = vnodify(tag(data));
        } else {
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

function jsxs(tag: JSX.ElementType, data: { [index: string]: unknown }): VNode {
    return jsx(tag, data);
}

function Fragment({ children }: { children: Snabbdom.Node }): VNode {
    return {
        children: children === undefined ? [] : isArrayChildren(children) ? flatten(children) : [vnodify(children)],
        data: {},
        elm: undefined,
        sel: undefined,
        key: undefined,
        text: undefined,
    };
}

// eslint-disable-next-line import/no-default-export
export default Snabbdom;
export { Fragment, jsx, jsxs };
export type { JSX };

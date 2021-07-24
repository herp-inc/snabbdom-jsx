import type { Hooks as _Hooks } from 'snabbdom/hooks';
import type { Attrs as _Attrs } from 'snabbdom/modules/attributes';
import type { Classes as _Classes } from 'snabbdom/modules/class';
import type { Dataset as _Dataset } from 'snabbdom/modules/dataset';
import type { On as _On } from 'snabbdom/modules/eventlisteners';
import type { Props as _Props } from 'snabbdom/modules/props';
import type { VNodeStyle as _VNodeStyle } from 'snabbdom/modules/style';
import type { Key as _Key, VNode as _VNode } from 'snabbdom/vnode';

declare module 'snabbdom' {
    export type Attrs = _Attrs;
    export type Classes = _Classes;
    export type Hooks = _Hooks;
    export type Key = _Key;
    export type Dataset = _Dataset;
    export type On = _On;
    export type Props = _Props;
    export type VNodeStyle = _VNodeStyle;
    export type VNode = _VNode;
}

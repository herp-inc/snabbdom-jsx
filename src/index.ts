import type { Attrs, Classes, Dataset, On, Props } from 'snabbdom';

import type Snabbdom from './types';
import type { Internal } from './types';

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
}

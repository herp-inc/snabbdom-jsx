import type { Attrs, Classes, Dataset, On, Props } from 'snabbdom';

import type Snabbdom from './jsx-runtime';

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

// eslint-disable-next-line import/no-default-export
export default Snabbdom;
export type { jsx };

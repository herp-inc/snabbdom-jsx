import type Snabbdom from '.';

declare module '.' {
    namespace jsx {
        interface CustomModules {
            custom: {
                foo: string;
            };
        }
    }
}

describe('automatic runtime', () => {
    test('sel', () => {
        expect(<div />).toStrictEqual({
            children: undefined,
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });

        expect(<div id="id" className="foo bar" />).toStrictEqual({
            children: undefined,
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'div#id.foo.bar',
            text: undefined,
        });
    });

    test('property', () => {
        expect(<div dir="ltr" />).toStrictEqual({
            children: undefined,
            data: {
                props: {
                    dir: 'ltr',
                },
            },
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });
    });

    test('key', () => {
        expect(<div $key="foo" />).toStrictEqual({
            children: undefined,
            data: {
                key: 'foo',
            },
            elm: undefined,
            key: 'foo',
            sel: 'div',
            text: undefined,
        });
    });

    describe('attributes passed not to props but to attrs', () => {
        test('list', () => {
            expect(<input list="options" />).toStrictEqual({
                children: undefined,
                data: {
                    attrs: {
                        list: 'options',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'input',
                text: undefined,
            });
        });

        test('role', () => {
            expect(<div role="button" />).toStrictEqual({
                children: undefined,
                data: {
                    attrs: {
                        role: 'button',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });
    });

    test('aria', () => {
        expect(<div aria-label="Send" />).toStrictEqual({
            children: undefined,
            data: {
                attrs: {
                    'aria-label': 'Send',
                },
            },
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });
    });

    test('hooks', () => {
        const onInsert = (): void => {
            console.log('inserted');
        };

        expect(<div $hook={{ insert: onInsert }} />).toStrictEqual({
            children: undefined,
            data: {
                hook: {
                    insert: onInsert,
                },
            },
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });
    });

    describe('modules', () => {
        test('attributes module', () => {
            expect(<div $attrs={{ class: 'foo' }} />).toStrictEqual({
                children: undefined,
                data: {
                    attrs: {
                        class: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('class module', () => {
            expect(<div className="foo" $class={{ bar: true, baz: false }} />).toStrictEqual({
                children: undefined,
                data: {
                    class: {
                        bar: true,
                        baz: false,
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div.foo',
                text: undefined,
            });
        });

        test('event listeners', () => {
            const onclick = (e: MouseEvent) => {
                console.log(e);
            };

            expect(<div onclick={onclick} />).toStrictEqual({
                children: undefined,
                data: {
                    on: {
                        click: onclick,
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        describe('dataset module', () => {
            test('data-* attribute', () => {
                expect(<div data-foo="bar" data-foo-bar="baz" />).toStrictEqual({
                    children: undefined,
                    data: {
                        dataset: {
                            foo: 'bar',
                            fooBar: 'baz',
                        },
                    },
                    elm: undefined,
                    key: undefined,
                    sel: 'div',
                    text: undefined,
                });
            });

            test('$dataset attribute', () => {
                expect(<div $dataset={{ foo: 'bar' }} />).toStrictEqual({
                    children: undefined,
                    data: {
                        dataset: {
                            foo: 'bar',
                        },
                    },
                    elm: undefined,
                    key: undefined,
                    sel: 'div',
                    text: undefined,
                });
            });
        });

        test('props module', () => {
            expect(<div $props={{ dir: 'ltr' }} />).toStrictEqual({
                children: undefined,
                data: {
                    props: {
                        dir: 'ltr',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('style module', () => {
            expect(<div $style={{ backgroundColor: 'red', delayed: { backgroundColor: 'blue' } }} />).toStrictEqual({
                children: undefined,
                data: {
                    style: {
                        backgroundColor: 'red',
                        delayed: {
                            backgroundColor: 'blue',
                        },
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('custom modules', () => {
            expect(<div $custom={{ foo: 'bar' }} />).toStrictEqual({
                children: undefined,
                data: {
                    custom: {
                        foo: 'bar',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });
    });

    describe('backward compatibility', () => {
        test('key', () => {
            expect(<div key="foo" />).toStrictEqual({
                children: undefined,
                data: {
                    key: 'foo',
                },
                elm: undefined,
                key: 'foo',
                sel: 'div',
                text: undefined,
            });
        });

        test('hooks', () => {
            const onInsert = (): void => {
                console.log('inserted');
            };

            expect(<div hook={{ insert: onInsert }} />).toStrictEqual({
                children: undefined,
                data: {
                    hook: {
                        insert: onInsert,
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('attributes module', () => {
            expect(<div attrs={{ class: 'foo' }} />).toStrictEqual({
                children: undefined,
                data: {
                    attrs: {
                        class: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('class module', () => {
            expect(<div className="foo" class={{ bar: true, baz: false }} />).toStrictEqual({
                children: undefined,
                data: {
                    class: {
                        bar: true,
                        baz: false,
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div.foo',
                text: undefined,
            });
        });

        test('dataset module', () => {
            const vnode = {
                children: undefined,
                data: {
                    dataset: {
                        foo: 'bar',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            };

            expect(<div data={{ foo: 'bar' }} />).toStrictEqual(vnode);
            expect(<div dataset={{ foo: 'bar' }} />).toStrictEqual(vnode);
        });

        test('event listeners module', () => {
            const onclick = (e: MouseEvent) => {
                console.log(e);
            };

            expect(<div on={{ click: onclick }} />).toStrictEqual({
                children: undefined,
                data: {
                    on: {
                        click: onclick,
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('props module', () => {
            expect(<div props={{ dir: 'ltr' }} />).toStrictEqual({
                children: undefined,
                data: {
                    props: {
                        dir: 'ltr',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('style module', () => {
            expect(<div style={{ backgroundColor: 'red', delayed: { backgroundColor: 'blue' } }} />).toStrictEqual({
                children: undefined,
                data: {
                    style: {
                        backgroundColor: 'red',
                        delayed: {
                            backgroundColor: 'blue',
                        },
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });
    });

    test('custom elements', () => {
        expect(<div is="custom-element" />).toStrictEqual({
            children: undefined,
            data: {
                is: 'custom-element',
            },
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });
    });

    test('text', () => {
        expect(<div>Hello, world!</div>).toStrictEqual({
            children: undefined,
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: 'Hello, world!',
        });
    });

    test('children', () => {
        const expected = {
            children: [
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'span',
                    text: 'Hello,',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'span',
                    text: 'world!',
                },
            ],
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        };

        expect(
            <div>
                <span>Hello,</span>
                <span>world!</span>
            </div>,
        ).toStrictEqual(expected);

        expect(
            <div>
                {['Hello,', 'world!'].map((str) => (
                    <span>{str}</span>
                ))}
            </div>,
        ).toStrictEqual(expected);

        expect(
            <div>
                <span>Hello,</span>
                {[<span>world!</span>]}
            </div>,
        ).toStrictEqual({
            children: [
                {
                    sel: 'span',
                    text: 'Hello,',
                    key: undefined,
                    data: {},
                    elm: undefined,
                    children: undefined,
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'span',
                    text: 'world!',
                },
            ],
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });
    });

    test('nested children', () => {
        expect(
            <ul>{Array.from('ab').map((x) => Array.from('cd').map((y) => <li>{`${x}${y}`}</li>))}</ul>,
        ).toStrictEqual({
            children: [
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'li',
                    text: 'ac',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'li',
                    text: 'ad',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'li',
                    text: 'bc',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'li',
                    text: 'bd',
                },
            ],
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'ul',
            text: undefined,
        });
    });

    describe('fragments', () => {
        test('w/ no children', () => {
            expect(<></>).toStrictEqual({
                children: [],
                data: {},
                elm: undefined,
                key: undefined,
                sel: undefined,
                text: undefined,
            });
        });

        test('w/ single string child', () => {
            expect(<>Hello, world!</>).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'Hello, world!',
                    },
                ],
                data: {},
                elm: undefined,
                key: undefined,
                sel: undefined,
                text: undefined,
            });
        });

        test('w/ single HTML child', () => {
            expect(
                <>
                    <span>Hello, world!</span>
                </>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: 'span',
                        text: 'Hello, world!',
                    },
                ],
                data: {},
                elm: undefined,
                key: undefined,
                sel: undefined,
                text: undefined,
            });
        });

        test('w/ multiple mixed elements', () => {
            expect(
                <>
                    Hello, <span>world!</span>
                </>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'Hello, ',
                    },
                    {
                        children: undefined,
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: 'span',
                        text: 'world!',
                    },
                ],
                data: {},
                elm: undefined,
                key: undefined,
                sel: undefined,
                text: undefined,
            });
        });

        test('w/ nested fragment children', () => {
            expect(
                <>
                    <>
                        <>Hello, world!</>
                    </>
                </>,
            ).toStrictEqual({
                children: [
                    {
                        children: [
                            {
                                children: [
                                    {
                                        children: undefined,
                                        data: undefined,
                                        elm: undefined,
                                        key: undefined,
                                        sel: undefined,
                                        text: 'Hello, world!',
                                    },
                                ],
                                data: {},
                                elm: undefined,
                                key: undefined,
                                sel: undefined,
                                text: undefined,
                            },
                        ],
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: undefined,
                    },
                ],
                data: {},
                elm: undefined,
                key: undefined,
                sel: undefined,
                text: undefined,
            });
        });
    });

    test('conditional rendering', () => {
        expect(
            <div>
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {true && <span>shown</span>}
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {false && <span>hidden</span>}
                {null}
                {undefined}
            </div>,
        ).toStrictEqual({
            children: [
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: 'span',
                    text: 'shown',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: '!',
                    text: 'false',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: '!',
                    text: 'null',
                },
                {
                    children: undefined,
                    data: {},
                    elm: undefined,
                    key: undefined,
                    sel: '!',
                    text: 'undefined',
                },
            ],
            data: {},
            elm: undefined,
            key: undefined,
            sel: 'div',
            text: undefined,
        });
    });

    describe('components', () => {
        type Props = { prop: string | undefined; children?: Snabbdom.Node };
        const Component: Snabbdom.Component<Props> = ({ prop, children }) => <div data-prop={prop}>{children}</div>;

        test('w/ single string child', () => {
            expect(<Component prop="foo">Hello, world!</Component>).toStrictEqual({
                children: undefined,
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: 'Hello, world!',
            });
        });

        test('w/ single HTML child', () => {
            expect(
                <Component prop="foo">
                    <span>Hello, world!</span>
                </Component>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: 'span',
                        text: 'Hello, world!',
                    },
                ],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('w/ multiple string children', () => {
            expect(
                <Component prop="foo">
                    {'Hello,'}
                    {'world!'}
                </Component>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'Hello,',
                    },
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'world!',
                    },
                ],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('w/ multiple mixed children', () => {
            expect(
                <Component prop="foo">
                    Hello,
                    <span>world!</span>
                </Component>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'Hello,',
                    },
                    {
                        children: undefined,
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: 'span',
                        text: 'world!',
                    },
                ],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('w/ key', () => {
            expect(<Component $key="key" prop="foo" />).toStrictEqual({
                children: undefined,
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: 'key',
                sel: 'div',
                text: undefined,
            });
        });
    });

    describe('components w/ legacy children', () => {
        type Props = { prop: string };
        const Component: Snabbdom.Component<Props> = ({ prop }, children) => <div data-prop={prop}>{children}</div>;

        test('w/ single string child', () => {
            expect(<Component prop="foo">Hello, world!</Component>).toStrictEqual({
                children: undefined,
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: 'Hello, world!',
            });
        });

        test('w/ single HTML child', () => {
            expect(
                <Component prop="foo">
                    <span>Hello, world!</span>
                </Component>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: 'span',
                        text: 'Hello, world!',
                    },
                ],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('w/ multiple string children', () => {
            expect(
                <Component prop="foo">
                    {'Hello,'}
                    {'world!'}
                </Component>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'Hello,',
                    },
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'world!',
                    },
                ],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('w/ multiple mixed children', () => {
            expect(
                <Component prop="foo">
                    Hello,
                    <span>world!</span>
                </Component>,
            ).toStrictEqual({
                children: [
                    {
                        children: undefined,
                        data: undefined,
                        elm: undefined,
                        key: undefined,
                        sel: undefined,
                        text: 'Hello,',
                    },
                    {
                        children: undefined,
                        data: {},
                        elm: undefined,
                        key: undefined,
                        sel: 'span',
                        text: 'world!',
                    },
                ],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: undefined,
                sel: 'div',
                text: undefined,
            });
        });

        test('w/ key', () => {
            expect(<Component $key="key" prop="foo" />).toStrictEqual({
                children: [],
                data: {
                    dataset: {
                        prop: 'foo',
                    },
                },
                elm: undefined,
                key: 'key',
                sel: 'div',
                text: undefined,
            });
        });
    });

    test('SVG', () => {
        expect(
            <svg id="foo" className="wrapper" viewBox="25 25 50 50">
                <circle id="bar" className="circle" cx="50" cy="50" r="20" />
            </svg>,
        ).toStrictEqual({
            children: [
                {
                    children: undefined,
                    data: {
                        attrs: {
                            cx: '50',
                            cy: '50',
                            r: '20',
                        },
                        ns: 'http://www.w3.org/2000/svg',
                    },
                    elm: undefined,
                    key: undefined,
                    sel: 'circle#bar.circle',
                    text: undefined,
                },
            ],
            data: {
                attrs: {
                    viewBox: '25 25 50 50',
                },
                ns: 'http://www.w3.org/2000/svg',
            },
            elm: undefined,
            key: undefined,
            sel: 'svg#foo.wrapper',
            text: undefined,
        });
    });

    test('popover API', () => {
        expect(
            <>
                <button popoverTarget="popover" popoverTargetAction="toggle">
                    Toggle
                </button>
                <div popover>Hello, world!</div>
            </>,
        ).toStrictEqual({
            children: [
                {
                    children: undefined,
                    data: {
                        attrs: {
                            popovertarget: 'popover',
                        },
                        props: {
                            popoverTargetAction: 'toggle',
                        },
                    },
                    elm: undefined,
                    key: undefined,
                    sel: 'button',
                    text: 'Toggle',
                },
                {
                    children: undefined,
                    data: {
                        props: {
                            popover: 'auto',
                        },
                    },
                    elm: undefined,
                    key: undefined,
                    sel: 'div',
                    text: 'Hello, world!',
                },
            ],
            data: {},
            elm: undefined,
            key: undefined,
            sel: undefined,
            text: undefined,
        });
    });
});

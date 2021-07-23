import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
    },
    plugins: [
        typescript({
            include: 'src/index.ts',
        }),
    ],
};

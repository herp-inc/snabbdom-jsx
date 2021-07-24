module.exports = {
    extends: ['@herp-inc'],
    ignorePatterns: ['/jsx-runtime.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import'],
    overrides: [
        {
            files: ['*.test.ts', '*.test.tsx'],
            extends: ['@herp-inc/eslint-config-jest'],
            rules: {
                'no-console': 'off',
            },
        },
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
    },
};

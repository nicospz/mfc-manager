module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:@next/next/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:storybook/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: './',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'react',
        'unused-imports',
        '@typescript-eslint',
        'import',
        'prettier',
    ],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        'import/order': 'error',
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: ['./tsconfig.json', './server/tsconfig.json'],
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/internal-regex': '^@',
    },
    ignorePatterns: ['node_modules/', 'build/', '.eslintrc.js', 'dist'],
};

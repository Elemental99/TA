module.exports = {
    settings: {
        'eslint.workingDirectories': [
            './client',
            './server',
        ],
        'import/resolver': {
            node: {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                ],
            },
        },
    },
    env: {
        browser: true,
        es2021 : true,
        node   : true,
    },
    extends: [
        'standard',
    ],
    parser       : '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType : 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent                       : ['error', 4],
        'space-before-function-paren': [
            'error', {
                anonymous : 'never',
                named     : 'never',
                asyncArrow: 'never',
            },
        ],
        'comma-dangle'          : ['error', 'always-multiline'],
        'no-useless-constructor': 'off',
        'key-spacing'           : [
            'error', {
                afterColon: true,
                align     : 'colon',
            },
        ],
        'no-multi-spaces': 'off',
    },
}

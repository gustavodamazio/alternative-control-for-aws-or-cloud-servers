module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ['plugin:import/errors', 'plugin:import/warnings'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        extraFileExtensions: ['.sqlite', '.html'],
        project: './tsconfig.json',
        tsconfigRootDir: './'
    },
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/unified-signatures': 'warn',
        'comma-dangle': 'warn',
        'constructor-super': 'error',
        eqeqeq: ['warn', 'always'],
        'import/no-deprecated': 'warn',
        'import/no-extraneous-dependencies': 'error',
        'no-cond-assign': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        'no-invalid-this': 'error',
        'no-new-wrappers': 'error',
        'no-param-reassign': 'error',
        'no-redeclare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-throw-literal': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'warn',
        'no-void': 'error',
        'prefer-const': 'warn'
    },
    settings: {
        'import/resolver': {
            typescript: {}
        },
        jsdoc: {
            tagNamePreference: {
                returns: 'return'
            }
        }
    }
};

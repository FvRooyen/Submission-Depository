/* eslint-env node */
module.exports = {
    env: {
        browser: true,
        es6: true,
        'cypress/globals': true
    },
    extends: ['prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'prettier/prettier': ['error']
    },
    plugins: ['prettier'],
    settings: {
        react: {
            version: 'detect'
        }
    }
}

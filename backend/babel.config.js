module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
    plugins: [
        ['module-resolver', { alias: { '@env': './src/env' } }],
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
    ],
    ignore: ['**/*.spec.ts']
};

const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const pkg = require('./package.json');
module.exports = [{
    input: './src/core/index.ts',
    output: [
        {
            name: '@themost/w/core',
            file: `core/index.cjs.js`,
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/w/core',
            file: `core/index.esm.js`,
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/w/core',
            file: `core/index.umd.js`,
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies),
    plugins: [
        typescript()
    ]
}, {
    input: './src/platform-server/index.ts',
    output: [
        {
            name: '@themost/w/platform-server',
            file: `platform-server/index.cjs.js`,
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/w/platform-server',
            file: `platform-server/index.esm.js`,
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/w/platform-server',
            file: `platform-server/index.umd.js`,
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies)
        .concat('@themost/w/core'),
    plugins: [
        typescript()
    ]
}];

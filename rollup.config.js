const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const pkg = require('./package.json');
module.exports = [{
    input: './core/src/index.ts',
    output: [
        {
            name: '@themost/w/core',
            file: `core/dist/index.cjs.js`,
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/w/core',
            file: `core/dist/index.esm.js`,
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/w/core',
            file: `core/dist/index.umd.js`,
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies),
    plugins: [
        typescript({ tsconfig: './core/tsconfig.lib.json' })
    ]
}, {
    input: './platform-server/src/index.ts',
    output: [
        {
            name: '@themost/w/platform-server',
            file: `platform-server/dist/index.cjs.js`,
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/w/platform-server',
            file: `platform-server/dist/index.esm.js`,
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/w/platform-server',
            file: `platform-server/dist/index.umd.js`,
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies)
        .concat('@themost/w/core'),
    plugins: [
        typescript({ tsconfig: './platform-server/tsconfig.lib.json' })
    ]
}];

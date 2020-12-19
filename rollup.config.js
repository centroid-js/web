const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const pkg = require('./package.json');
const dts = require('rollup-plugin-dts').default;
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
    external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)),
    plugins: [
        typescript({

        })
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
        .concat(Object.keys(pkg.peerDependencies))
        .concat('@themost/w/core'),
    plugins: [
        typescript()
    ]
}, {
    input: './src/core/index.ts',
    output: [{
        file: `core/index.d.ts`
    }],
    plugins: [dts()],
    external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
}, {
    input: './src/platform-server/index.ts',
    output: [{
        file: `platform-server/index.d.ts`
    }],
    external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
        .concat('@themost/w/core'),
    plugins: [dts()],
}];

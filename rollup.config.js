import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const pkg = require('./package.json')
const external = Object.keys(pkg.peerDependencies)

const config = {
  input: 'src/index.js',
  onwarn: function(message, warn) {
    if (/transducers-js/.test(message)) return
    warn(message)
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'reduxXforms',
      sourcemap: true,
      globals: {
        redux: 'redux',
      },
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
}

export default config

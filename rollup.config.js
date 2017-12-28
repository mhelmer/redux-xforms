import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const pkg = require('./package.json')
const external = Object.keys(pkg.peerDependencies)

const config = {
  input: 'src/index.js',
  globals: {
    redux: 'redux',
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
  external,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'reduxXforms',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
}

export default config

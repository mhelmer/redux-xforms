import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

let pkg = require('./package.json')
let external = Object.keys(pkg.peerDependencies)

const config = {
  input: 'src/index.js',
  globals: {
    redux: 'redux',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    commonjs(),
    uglify({}, minify),
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

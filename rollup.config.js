import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

let pkg = require('./package.json')
let external = Object.keys(pkg.peerDependencies)

const config = {
  entry: 'src/index.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
    babel(babelrc({})),
  ],
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'monthlyQuizDucks',
      sourceMap: true,
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true,
    },
  ],
}

export default config

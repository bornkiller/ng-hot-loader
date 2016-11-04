/**
 * @description - observable package rollup configuration
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
    eslint({
      include: ['index.js', 'src/**/*.js']
    }),
    babel()
  ],
  external: [
    'path',
    'fs',
    'loader-utils',
    'lodash'
  ],
  globals: {
  },
  targets: [
    {format: 'cjs', dest: 'dist/index.js'}
  ]
};
import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
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
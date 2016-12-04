# ng-hot-loader
![Build Status](https://img.shields.io/travis/bornkiller/ng-hot-loader/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/ng-hot-loader/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/ng-hot-loader?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/ng-hot-loader.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/ng-hot-loader/dev-status.svg?style=flat)

Transform source code, make ng HMR possible.

## usage
```javascript
{
  test: /\.html$/,
  exclude: /index\.html$/,
  loaders: [
    'html-loader?attrs[]=img:src&root=' + path.resolve(__dirname, 'src'),
    'ng-hot-loader'
  ]
},
{
  test: /\.js$/,
  exclude: /node_modules/,
  loaders: [
    'ng-annotate-loader?add=true',
    'babel-loader?presets[]=es2015&presets[]=stage-3&plugins[]=transform-function-bind&cacheDirectory=true',
    'ng-hot-loader'
  ]
}
```

## demo 
https://github.com/bornkiller/angular-boilerplate-webpack
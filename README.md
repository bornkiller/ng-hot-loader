# ng-hot-loader
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
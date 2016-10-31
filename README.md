# ng-hot-loader
personal attempt， make NG HMR possible.

## usage
```javascript
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

---
title: "Save the bytes"
date: 2015-09-08
summary: "Keeping libraries like React and Angular out of your Browserify and Webpack bundles"
---
 If you use libraries like React and Angular, and if you're using a module bundler like Browserify or Webpack, then you probably know how much these libraries can beef up your bundle. Even when compressed and minified, a library like Angular adds 50 kB to your bundle.

 If you want to make your bundle smaller and use something like a CDN for your external library, both of these tools make it pretty easy.

![diagram of a dependency depending on React from a CDN](/images/content/browserify-webpack-external.png)
 ## Externals with Webpack

Webpack refers to these libraries as [externals](http://webpack.github.io/docs/library-and-externals.html). You can specify your externals in `webpack.config.js`.

<script src="https://gist.github.com/linclark/b18acefbf80d1dcab317.js"></script>

Then just add `script` tag for the library to your HTML.

```
<script src="https://fb.me/react-0.13.3.min.js"></script>
```

 ## Shimming with Browserify

 Browserify calls this shimming. There is a module called [browserify-shim](https://github.com/thlorenz/browserify-shim) which you can use as a transform. You can apply transforms via the command line, but it's a lot easier if you include the configuration in your `package.json` file.

<script src="https://gist.github.com/linclark/e572c9eeca4448d484c4.js"></script>

Make sure that you have the browserify-shim package installed before running Browserify with this config.

Then you just need to add the `script` tag for the library to your HTML.
```
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
```

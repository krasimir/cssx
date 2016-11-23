# CSSX - CSS in JavaScript

> Generate and/or apply CSS with JavaScript. Try it out [here](http://krasimir.github.io/cssx/playground/try-it-out-bin/).

---

## Demos

* [Transpilation process](http://krasimir.github.io/cssx/playground/try-it-out/) - you write JavaScript that contains CSSX and see AST, transpiled JavaScript and the produced CSS
* [JS + HTML + output](http://krasimir.github.io/cssx/playground/try-it-out-bin/) - you write JavaScript that contains CSSX + HTML markup and see the result when the CSS is applied to the DOM
* [JS + output](http://krasimir.github.io/cssx/) - same as a above but without changing the markup

## Language:

* [CSSX language](./docs/cssx-lang.md)

## Editor Integration

* [Vote for JetBrains integration](https://youtrack.jetbrains.com/issue/RUBY-18179)

## Integration with other tools:

* [JSS](https://github.com/jsstyles/jss) or alternatively [CSSX client-side library](./packages/cssx) ([download](./packages/cssx/lib) or `npm i cssx`)
* [CSSX-transpiler](./packages/cssx-transpiler) ([download](./packages/cssx-transpiler/lib) or `npm i cssx-transpiler`)
* [CSSX-CLI](./packages/cssx-cli) (`npm i cssx-cli -g`)
* [Gulp plugin](./packages/gulp-cssx) (`npm i gulp-cssx -D`)
* [Webpack loader](./packages/cssx-loader) (`npm i cssx-loader -D`)
* [Meteor package](https://github.com/Quadric/meteor-cssx) (`meteor add quadric:cssx`)
* [Browserify transform](./packages/browserify-cssx) (`npm i browserify-cssx -D`)
* [CSSX component for React](https://github.com/krasimir/react-cssx)
* [jspm integration](./playground/jspm)
* [ESLint plugin](https://github.com/krasimir/eslint-plugin-cssx)

## Plugins:

* [CSSX plugins](./docs/plugins.md) - See how to create CSSX plugins or use PostCSS plugin collection together with CSSX.

## Examples:

* [Try it out](./playground/try-it-out-bin)
* [Try it out (developer edition)](./playground/try-it-out)
* [Basic](./playground/basic)
* [Transpiling](./playground/transpiler)
* [Transpiling with gulp](./playground/transpiler-gulp)
* [Transpiling with webpack](./playground/transpiler-webpack)
* [In React component](./playground/react)
* [Using with jss](./playground/jss)
* [(at build time) CSSX together with PostCSS and Autoprefixer](./playground/postcss)
* [(at runtime in a browser) CSSX together with PostCSS and a plugin](./playground/postcss-in-browser)
* [Bundling with jspm](./playground/jspm)

---

## Premise

CSSX is not only about writing vanilla CSS in JavaScript. Even though you get this the main idea here is to have a good API for managing styles. CSSX doesn't inline styles so you keep your markup clean. It works directly with injected stylesheets. Here is a short example:

```js
function setStyles (fontSize, margin) {
  return <style>
    body {
      font-size: {{ fontSize }}px;
      line-height: {{ fontSize * 1.2 }}px;
      margin: {{ margin }}px;
    }
  </style>
}

var sheet = cssx();
sheet.add(setStyles(20, 6));
sheet.add(<style>
  p > a {
    text-decoration: none;
    color: #F00;
  }
</style>);
```

The code above is transpiled into valid JavaScript that uses the [CSSX client-side library](./packages/cssx):

```js
function setStyles(fontSize, margin) {
  return (function () {
    var _3 = {};
    _3['margin'] = margin + "px";
    _3['line-height'] = fontSize * 1.2 + "px";
    _3['font-size'] = fontSize + "px";
    var _2 = [];

    _2.push(['body', _3]);

    return _2;
  }.apply(this));
}

var sheet = cssx();
sheet.add(setStyles(20, 6));
sheet.add((function () {
  var _6 = {};
  _6['color'] = '#F00';
  _6['text-decoration'] = 'none';
  var _5 = [];

  _5.push(['p > a', _6]);

  return _5;
}.apply(this)));
```

And it results in the following CSS:

```css
body {
  margin: 6px;
  line-height: 24px;
  font-size: 20px;
}
p > a {
  color: #F00;
  text-decoration: none;
}
```

---

## How to use CSSX

* CSSX could be considered a pattern where we dynamically create CSS stylesheets and control their content with JavaScript. The bare minimum is including [CSSX client-side library](./packages/cssx) on the page. Doing that you'll have an access to the [top level API](https://github.com/krasimir/cssx/tree/master/packages/cssx#top-level-api). The same library is published to npm so `npm install cssx -S`.
* If you want to use the [CSS-ish syntax](https://github.com/krasimir/cssx/blob/master/docs/cssx-lang.md) in JavaScript then you'll need the [transpiler](./packages/cssx-transpiler). It's a available as a [standalone](https://github.com/krasimir/cssx/blob/master/packages/cssx-transpiler/lib/cssx-transpiler.min.js) file, but it's not recommended using it in the browser. What you should do is integrating the transpiler in your build process.

---

## Testing

```
npm test
```

or if you want to run the tests continuously

```
npm run test-watch
```

or if you want to run the tests in a debug mode

```
npm run test-debug
```

---

## Building

```
npm i
npm run make
```

---

## Developing

```
npm i
npm run dev
```

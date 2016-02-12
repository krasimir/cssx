# CSSX - CSS in JavaScript

> Generate and/or apply CSS with JavaScript. Try it out [here](http://krasimir.github.io/cssx/playground/try-it-out/).

---

Language:

* [CSSX language](./docs/cssx-lang.md)

Packages:

* [CSSX client-side library](./packages/cssx) ([download](./packages/cssx/lib))
* [CSSX-transpiler](./packages/cssx-transpiler) ([download](./packages/cssx-transpiler/lib) or `npm i cssx-transpiler`)
* [gulp plugin](./packages/gulp-cssx) (`npm i gulp-cssx -D`)
* [webpack loader](./packages/cssx-loader) (`npm i cssx-loader -D`)

Examples:

* [Try it out](./playground/try-it-out)
* [Basic](./playground/basic)
* [Transpiling](./playground/transpiler)
* [Transpiling with gulp](./playground/transpiler-gulp)
* [Transpiling with webpack](./playground/transpiler-webpack)

---

## How to use CSSX

* CSSX could be considered a patter where we dynamically create CSS stylesheets and control their content with JavaScript. The bare minimum is including [CSSX client-side library](./packages/cssx) on the page. Doing that you'll have an access to the [top level API](https://github.com/krasimir/cssx/tree/master/packages/cssx#top-level-api). The same library is published to `npm` too.
* If you want to use the [CSS-ish syntax](https://github.com/krasimir/cssx/blob/master/docs/cssx-lang.md) in JavaScript then you'll need the [transpiler](./packages/cssx-transpiler).

---

![demo CSSX](./docs/img/demo.jpg)

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

# CSSX - CSS in JavaScript

> Generate and/or apply CSS with JavaScript. Check out the demo [here](http://krasimir.github.io/cssx/playground/try-it-out/).

---

Packages:

* [cssx client-side library](./packages/cssx) ([download](./packages/cssx/lib))
* [cssx-transpiler](./packages/cssx-transpiler) ([download](./packages/cssx-transpiler/lib) or `npm i cssx-transpiler`)
* [gulp plugin](./packages/gulp-cssx) (`npm i gulp-cssx -D`)
* [webpack loader](./packages/cssx-loader) (`npm i cssx-loader -D`)

Examples:

* [Try it out](./playground/try-it-out)
* [Basic](./playground/basic)
* [Transpiling](./playground/transpiler)
* [Transpiling with gulp](./playground/transpiler-gulp)

---

```js
var updateStyles = function(size) {
  cssx(
    body {
      font-size: `size`px;
    }
    body h1 {
      font-size: 2em;
    }
    body small {
      font-size: 0.8em;
    }
  );
}
updateStyles(18);

/* results in the following:

<style id="my-styles2" type="text/css">
body {
  font-size: 18px;
}
body h1 {
  font-size: 2em;
}
body small {
  font-size: 0.8em;
}
</style>

*/
```

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

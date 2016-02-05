# CSSX - CSS in JavaScript

> Generate and/or apply CSS with JavaScript. 

---

[Demo!](http://krasimir.github.io/cssx/playground/try-it-out/)

---

* [cssx client-side library](./packages/client) ([download](./packages/client/lib))
* [cssx-transpiler](./packages/transpiler) ([download](./packages/transpiler/lib))

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

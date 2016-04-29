# CSSX language

CSSX is not a new language. It's still the CSS that we know and use every day. The difference is that we write it inside a JavaScript context. That's possible because we now have an access to [CSSX transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler). It understand and successfully transforms expressions like this:

```js
sheet.add(<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>);
```

The `<style>` tag returns a plain JavaScript object which we use together with [CSSX stylesheet](https://github.com/krasimir/cssx/tree/master/packages/cssx#stylesheet-api) to manage our styles. For example, to append a new CSS rule for all paragraphs on our page we can use the following:

```js
sheet.add(<style>
  p {
    font-size: 1em;
    line-height: 1.2em;
  }
</style>);
```

## Language expressions

#### `<style>selector { styles } ...</style>`

It returns an object.

Example:

```js
var sheet = cssx('id');
sheet.add(<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>);
```

Same as:

```js
var sheet = cssx('id');
sheet.add({
  body: {
    margin: 0,
    padding: 0
  }
});
```

The `id` passed to `cssx` is optional. If you don't provide one the library will generate it for you. However, we should say that running only `cssx()` generates a new stylesheet every time. So if we plan to execute such code many times it's good to provide an ID.

#### `<style>{ styles }</style>`

It returns a vanilla JavaScript object literal.

Example:

```js
var styles = <style>{
  font-size: 1em;
  line-height: 1.2em;
}</style>;
```

Same as :

```js
var styles = {
  "font-size": "1em",
  "line-height": "1.2em"
};
```

## Using JavaScript

We are writing CSSX in JavaScript context. So it has an access to all the data in the current scope.

```js
var property = 'size';
var value = 18;
var sheet = cssx();

sheet.add(<style>
  body {
    font-{{ property }}: {{ value + 2 }}px;
  }
</style>);
```

There are three ways to define dynamic expressions:

* &#96; ... &#96; (grave accents (backticks))
* `{{ ... }}`
* `<% ... %>`

The transpiler converts the string inside the expression to a valid JavaScript. The code above is transformed to the following:

```js
var property = 'size';
var value = 18;
var sheet = cssx();

sheet.add((function () {
  var _2 = {},
      _3 = {};
  _3["font-" + property] = value + 2 + "px";
  _2['body'] = _3;
  return _2;
}.apply(this)));
```

And the produced CSS:

```css
body {
  font-size: 20px;
}
```

## Where to go from here

Check out the [plugin](./plugins.md) docs to see how to use CSSX together with PostCSS.

Check out [CSSX client-side](https://github.com/krasimir/cssx/tree/master/packages/cssx) library or learn how to use the [transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler).

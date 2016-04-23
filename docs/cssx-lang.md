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

The `<style>` tag returns a plain JavaScript array which we use together with [CSSX stylesheet](https://github.com/krasimir/cssx/tree/master/packages/cssx#stylesheet-api) to manage our styles. For example, to append a new CSS rule for all paragraphs on our page we can use the following:

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

It returns an array.

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
sheet.add('body', {
  margin: 0,
  padding: 0
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
  'line-height': '1.2em',
  'font-size': '1em'
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
  var _3 = {};
  _3["font-" + property] = value + 2 + "px";
  var _2 = [];

  _2.push(['body', _3]);

  return _2;
}.apply(this)));
```

And the produced CSS:

```css
body {
  font-size: 20px;
}
```

## Prefixing

[CSSX transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler) and [CSSX client-side library](https://github.com/krasimir/cssx/tree/master/packages/cssx) do not auto prefix your CSS. However, there is a mechanism to produce prefixed version of the CSS properties.

```js
// input
<style>
  .icon {
    (wmo)transform: translateX(20px);
  }
</style>

// output
.icon {
  transform: translateX(20px);
  -webkit-transform: translateX(20px);
  -moz-transform: translateX(20px);
  -o-transform: translateX(20px);
}
```

Where 

* `s` - `-ms-` Microsoft
* `z` - `mso- ` icrosoft Office
* `m` - `-moz-` Mozilla Foundation (Gecko-based browsers)
* `o` - `-o-`  -xv- Opera Software
* `t` - `-atsc-` Advanced Television Standards Committee
* `p` - `-wap-` The WAP Forum
* `w` - `-webkit-` Safari, Chrome (and other WebKit-based browsers)
* `k` - `-khtml-` Konqueror browser
* `a` - `-apple-` Webkit supports properties using the -apple- prefixes as well
* `e` - `prince- ` esLogic
* `n` - `-ah-` Antenna House
* `h` - `-hp-` Hewlett Packard
* `r` - `-ro-` Real Objects
* `i` - `-rim-` Research In Motion
* `c` - `-tc-` Tall Components

*There is only one case where CSSX library generates prefixes automatically and that's when we use `@keyframes`.*

*Check out the [plugin](./plugins.md) docs to see how to youse CSSX together with PostCSS*.

## Where to go from here

Check out [CSSX client-side](https://github.com/krasimir/cssx/tree/master/packages/cssx) library or learn how to use the [transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler).

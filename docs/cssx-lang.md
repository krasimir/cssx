# CSSX language

CSSX is not a new language. It's still the CSS that we know and use every day. The difference is that we write it inside a JavaScript context. That's possible because we now have an access to [CSSX transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler). It understand and successfully transforms expressions like this:

```js
var sheet = cssx(
  body {
    margin: 0;
    padding: 0;
  }
);
```

The `cssx` call (in this format) returns a [CSSX stylesheet](https://github.com/krasimir/cssx/tree/master/packages/cssx#stylesheet-api) object which we use to manage our styles. For example, to append a new CSS rule we use the `add` method:

```js
sheet.add('p', cssx({
  font-size: 1em;
  line-height: 1.2em;
}));
```

## Language expressions

#### `cssx(<selector> { <styles> } ...)`

It returns a [CSSX stylesheet](https://github.com/krasimir/cssx/tree/master/packages/cssx#stylesheet-api) object.

Example:

```js
var sheet = cssx(
  body {
    margin: 0;
    padding: 0;
  }
);
```

Same as:

```js
var sheet = cssx('id');
sheet.add('body', {
  margin: 0,
  padding: 0
});
```

The `id` passed to `cssx` is optional. If you don't provide one the library will generate it for you. However, we should say that running only `cssx()` generates a new stylesheet every time. So if we plan to execute such code many times it's good to provide that ID.

#### `cssx({ styles })`

It returns a vanilla JavaScript object.

Example:

```js
var styles = cssx({
  font-size: 1em;
  line-height: 1.2em;
});
```

Same as :

```js
var styles = {
  'line-height': '1.2em',
  'font-size': '1em'
};
```

## Using JavaScript

The biggest benefit of CSSX is the fact that it's written in JavaScript context. So it has an access to all the data in the current scope.

```js
var property = 'size';
var value = 18;

cssx(
  body {
    font-`property`: `value + 2`px;
  }
);
```

The transpiler converts the strings wrapped in grave accents (backticks) to a valid JavaScript. The code above is transformed to the following:

```js
var property = 'size';
var value = 18;

(function () {
  var _2 = {};
  _2["font-" + property] = value + 2 + "px";

  var _1 = cssx.s('_1');

  _1.add('body', _2);

  return _1;
}).apply(this);
```

And results in a valid CSS:

```css
body {
  font-size: 20px;
}
```

## Prefixing

[CSSX transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler) and [CSSX client-side library](https://github.com/krasimir/cssx/tree/master/packages/cssx) do not auto prefix your CSS. However, there is a mechanism to produce prefixed version of the CSS properties.

```js
// input
cssx(
  .icon {
    (wmo)transform: translateX(20px);
  }
);

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

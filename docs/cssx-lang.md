# CSSX language

CSSX is not a new language. It's the usual CSS that you know. The only one difference is that you may write it inside a JavaScript file. In order to get the [transpiler](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler) working you have to wrap your CSS in a CSSX expression:

```js
cssx(
  body {
    margin: 0;
    padding: 0;
  }
);
```

`cssx` returns a [CSSX stylesheet](https://github.com/krasimir/cssx/tree/master/packages/cssx#stylesheet-api) object.

## Mix JavaScript and CSS

The biggest benefit of CSSX is the fact that you may mix JavaScript and CSS.

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

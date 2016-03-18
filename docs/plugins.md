# CSSX plugins

[CSSX client-side library](https://github.com/krasimir/cssx/tree/master/packages/cssx) accepts plugins in the form of JavaScript functions. Every function accepts a raw JavaScript literal and should return such one. For example:

```js
// defining the plugin
var plugin = function (styles) {
  if (styles.margin) {
    styles.margin = '22px';
    styles.padding = '6px';
  }
  return styles;
}

// registering the plugin in CSSX library
cssx.plugins([plugin]);

// creating a new stylesheet
var sheet = <style></style>;

// adding a rule
sheet.add(<style>
  body {
    margin: 10px;
  }
</style>);
```

Our `plugin` function above is called against every CSS rule in our stylesheet. In this particular example it's fired only once with `{ margin: '10px' }`. The result of this snippet is:

```css
body {
  margin: 22px;
  padding: 6px;
}
```

*If you want to try it go to the [CSSX repl](http://krasimir.github.io/cssx/playground/try-it-out/) and paste the example code on the right side of the screen.*

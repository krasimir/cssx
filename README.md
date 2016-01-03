# CSSX

Manage CSS styles with JavaScript.

```html
<script src="cssx.min.js"></script>
<script>

  var applyStyles = cssx.compile();
  var small = cssx.rule('small', { 'text-decoration': 'underline' });
  var h1 = cssx.rule('h1', { 'color': color }, small);

  cssx.generate(h1);
  // outputs:
  /*
    h1 {
      color:#00F;
    }
    h1 small {
      text-decoration: underline;
    }
  */

  applyStyles(h1);
  /*
    Creates a <style> tag under the <head> or <body> tags
    and puts the above styles inside
  */
</script>
```

The library is available via npm too - `npm i cssx`.

### API

* `cssx.compile(cssxRule)` - returns a function that represents a `<style>` tag. It accepts CSSX rule object.
* `cssx.rule(cssxRule, cssProperties, cssxRule | [cssxRule])` - it returns a CSSX rule object. The second parameter is a key-value object containing the actual CSS styles. the third component is the children of the rule. The library produces descendant selectors in this case.
* `cssx.generate(cssRule)` - returns a raw CSS string.

### Testing

```
npm i && npm test
```

### Building

```
npm i && npm run build
```

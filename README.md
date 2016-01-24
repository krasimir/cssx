# CSSX - CSS in JavaScript

> Generate and/or apply CSS with JavaScript. 

---

## How it works

CSSX is a tiny library that provides a JavaScript API for defining CSS styles. Once the rules are registered we may call the `compile` method which will generate valid CSS and will inject it to the page in the form of a `<style>` tag. Every next call of `compile` will update the content of the tag and not create a new one.

---

## Simple usage

```html
<script src="cssx.min.js"></script>
<script>

  cssx
    .add('body')
      .add('h1', { 'color': '#C679F2' })
        .add('small', { 'font-size': '0.3em' });

    
  cssx.compile();

  /*
    body h1 {
      color: #C679F2;
    }
    body h1 small{
      font-size:0.3em;
    }

  */
</script>
```

The library is available via npm too - `npm i cssx`.

---

## API

#### `add(<selector>, <props>)`

* `selector` - string or a function that returns a string
* `props` - key-value pairs (object) or a function that returns key-value pairs (object)

Returns an object that also provides the same `add` method. The difference is that if we call it we'll be scoped to the parent's selector. For example:

```js
cssx.add('body > p').add('span', { 'font-size': '10px' });
```

will result in

```css
body > p span {
  font-size:10px;
}
```

and not in

```css
body > p {
  
}
span{
  font-size:10px;
}
```

#### `compile(<doNotApplyToPage>)`

* `doNotApplyToPage` - if truthy then the generated CSS is NOT applied to the page.

It returns a CSS string based on the added rules.

#### `clear()`

It removes all the added rules.

#### `rules()`

Returns the added rules in a raw js format.

#### `id()`

Returns the unique id of the current factory.

---

## Testing

```
npm test
```

or if you want to run the tests continuously

```
npm run test-dev
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
npm run dev
```

# CSSX - CSS in JavaScript

> Generate and/or apply CSS with JavaScript. 

---

## How it works

CSSX is a tiny library that provides a JavaScript API for defining CSS styles. We register rules and then `compile` them. The library generates valid CSS and injects it into the page as a `<style>` tag. Every next call of `compile` will update the content of the tag and not create a new one.

*Why is this useful?*. Well, JavaScript is a rich language that gives us more flexibility. There are parts of our application which require different styles. In such cases we normally use different CSS classes that are added or removed. This could be frustrating because we have to amend too different parts of our codebase. CSSX could help solve that problem. For example:

```js
cssx.add('container', { 'background-color': getRandomColor });
button.addEventListener('click', function () {
  cssx.compile();
});

function getRandomColor () {
  return ...; // a random color
}

```

If the passed CSS value is a string then we have static styles. Then can't be changed. However, if we send an object or a function then the CSS becomes a dynamic thing. Every time when we call `cssx.compile()` we get a different style applied to the page. In the example above we set a random background color on every button click.

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

---

## Installation

Drop `cssx.min.js` on your page or run `npm i cssx` in node.

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

and NOT in

```css
body > p {
  
}
span {
  font-size:10px;
}
```

#### `compile(<doNotApplyToPage>)`

* `doNotApplyToPage` - if truthy then the generated CSS is NOT applied to the page.

It returns a CSS string based on the added rules.

#### `clear()`

It removes all the added rules and the added `<style>` tag (if any).

#### `rules()`

Returns the added rules in a raw js format.

#### `id()`

Returns the unique id of the current stylesheet.

---

## The concept of having different stylesheets

If you use CSSX for a while you'll notice that the styles are added into none specific `<style>` tag. Let's say that this is one stylesheet. The library provides a mechanism for defining multiple stylesheets. The result is having different `<style>` tags and they are controlled separately.

```js
var header = cssx.stylesheet();
header.add('.header', { margin: '20px' });

var content = cssx.stylesheet();
content.add('p', { 'font-size': '18px' });
content.add('section', { 'border-top': 'solid 1px #000' });

header.compile();
content.compile();
```

In the code above the styles for the header could be compiled independently of the content styles. 

Actually, the global `cssx` object IS a stylesheet. If we open the entry point of the library we'll see:

```js
module.exports = CSSFactory();
module.exports.stylesheet = CSSFactory;
```

So, we by default have one global stylesheet that could be accessed via `cssx` and we may create other independent stylesheet with `cssx.stylesheet()`.

## Nesting rules (media queries)

Nesting of rules is not supported in CSS. However CSSX could generate such code. For example:

```js
cssx.add('a').add({
  'span': {
    'font-size': '10px'
  }
});

/*
  a {
    span {
      font-size:10px;
    }
  }
*/
```

*If it's not supported then why this library provides such functionality?* It's because of the [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). Here is how to generate one:

```js
cssx
  .add('@media screen and (max-width: 200px)')
  .add({
    '.header': {
      'width': '400px'
    }
  });

/*
  @media screen and (max-width: 200px) {
    .header{
      width:400px;
    }
  }
*/
```

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

# Command line tool for CSSX compilation

Install it globally with `npm install -g cssx-cli`.

## Options

* `-i` (input) - accepts a glob pattern or a single file
* `-o` (output) - outout directory
* `-m` (mode) - `css` or `js`. It depends of what you want to produce at the end.

## Examples

### Transpilation of a single file

```
cssx -i ./src/a.js -o ./dist
```

### Transpilation of multiple files

```
cssx -i ./src/**/*.js -o ./dist
```

### Bundle to a single CSS file

```
cssx -i ./src/index.js -o ./dist -m css
```
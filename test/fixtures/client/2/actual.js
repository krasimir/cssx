module.exports = function (styles) {
  var b = styles.add('body');
  var p = b.descendant('p', { 'font-size': '20px' });

  b.descendant('section', { 'margin': '1em' });
  p.descendant('small', { 'font-size': '.8em' });
  p.descendant('span', { 'font-size': '.9em' });
  styles.add('p', { 'line-height': '20px' });
};
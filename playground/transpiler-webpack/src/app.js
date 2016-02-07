require('../../../packages/cssx/lib/cssx');

var buttonStyle = require('./buttonStyle');
var ballAnimation = require('./ballAnimation');

document.querySelector('.btn1').addEventListener('click', buttonStyle);
document.querySelector('.slider1').addEventListener('input', function (e) {
  document.querySelector('.endPointValue').innerHTML = e.target.value;
  ballAnimation.updateEndpoint(e.target.value);
});
document.querySelector('.slider2').addEventListener('input', function (e) {
  document.querySelector('.colorValue').innerHTML = e.target.value;
  ballAnimation.updateColor(e.target.value);
});
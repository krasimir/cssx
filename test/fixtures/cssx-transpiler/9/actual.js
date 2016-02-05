var pseudoClass = 'after';
var sectionSmallSize = function () {
  return 0.2;
};
var pInMedia = function () {
  return 0.8 + 'em';
};
var getSomeProp = function () {
  return ['text-decoration'];
};
var data = {
  prop: 'background',
  sel: ['section', 'p > a']
};
var image = 'bg.jpg';

cssx(
  section::`pseudoClass` {
    content: " ";
    display: table;
    clear: both;
  }
  section small {
    font-size: `sectionSmallSize()`em;
  }
  @media screen and (max-width: 1000px) {
    p {
      font-size: `pInMedia`;
    }
    p > a {
      `getSomeProp()[0]`: underline;
      color: #000;
    }
  }
  `data.sel.join(', ')` {
    text-decoration: none;
    `data.prop`: url("../public/`image`.jpg") no-repeat;
  }
);
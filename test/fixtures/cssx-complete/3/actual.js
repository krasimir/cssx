var A = {
  size: 20
};
var B = {
  size: 30
};

var generateSize = function (selector) {
  cssx(
    `selector` {
      font-size: `this.size`px;
    }
  )
};

generateSize.call(A, 'body');
generateSize.call(B, 'p');
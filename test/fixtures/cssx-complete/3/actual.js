var A = {
  size: 20
};
var B = {
  size: 30
};
var stylesheet = cssx();

var generateSize = function (selector) {
  stylesheet.add(<style>
    `selector` {
      font-size: `this.size`px;
    }
  </style>);
};

generateSize.call(A, 'body');
generateSize.call(B, 'p');
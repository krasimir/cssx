module.exports = function (arr, index, elements) {
  arr.splice.apply(arr, [index, 1].concat(elements));
};

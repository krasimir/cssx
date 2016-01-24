module.exports = function (obj) {
  var prop;

  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

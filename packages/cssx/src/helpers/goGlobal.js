module.exports = function (api) {
  if (typeof global !== 'undefined') {
    global.cssx = api;
  }
  if (typeof window !== 'undefined') {
    window.cssx = api;
  }
};

System.registerDynamic("lib/styles.js!cssx.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = (function() {
    var _1 = {},
        _2 = {};
    _2['font-size'] = '18px';
    _1['body'] = _2;
    return _1;
  }.apply(this));
  return module.exports;
});

System.register('lib/index.js', ['lib/styles.js!cssx.js'], function (_export) {
  'use strict';

  var styles;

  function init() {
    document.querySelector('body').innerHTML = '<pre>' + JSON.stringify(styles, null, 2) + '<pre>';
  }

  return {
    setters: [function (_libStylesJsCssxJs) {
      styles = _libStylesJsCssxJs['default'];
    }],
    execute: function () {
      init();
    }
  };
});
//# sourceMappingURL=build.js.map
var CODEMIRROR_SETTINGS = {
  value: '',
  mode:  'javascript',
  tabSize: 2,
  lineNumbers: false,
  autofocus: true,
  foldGutter: false,
  // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
};

var el = function (sel) { return document.querySelector(sel); };

var renderJSEditor = function (onChange) {
  var editor = CodeMirror(el('.js-code-mirror'), CODEMIRROR_SETTINGS);

  editor.on('change', function () {
    onChange(editor.getValue());
  });
  editor.setValue('// Loading ...');

  editor.focus();
  return editor;
}
var renderError = function(message) {
  var container = el('.js-error');
  container.innerHTML = message;
  container.style.transform = container.style.webkitTransform = 'translateY(0)';
}
var renderErrorOut = function() {
  var container = el('.js-error');
  container.style.transform = container.style.webkitTransform = 'translateY(-100px)';
}
var compileJS = function(js) {
  var transpiled = '', func;
  var transpilerOpts = { minified: false };

  try {
    transpiled = CSSXTranspiler(js, transpilerOpts);
    renderErrorOut();
  } catch(err) {
    renderError('Error while transpiling:<br />' + err.message);
    return;
  }

  cssx.clear();
  try {
    func = new Function('cssx', transpiled);
    renderErrorOut();
  } catch(err) {
    renderError('Error while using the transpiled code:<br />' + err.message);
    return;
  }

  try {
    func(cssx);
    renderErrorOut();
  } catch(err) {
    renderError('Error while running the transpiled code:<br />' + err.message);
    return;
  }

  try {
    generatedCSS = cssx.getStylesheets().map(function (stylesheet) {
      return stylesheet.compileImmediate().getCSS();
    });
    css = generatedCSS.join('');
    renderErrorOut();
  } catch(err) {
    renderError('Error while fetching the generated CSS:<br />' + err.message);
    return false;
  }

}

window.onload = function () {

  var editor;
  var loadDefaultJS = function (cb) {
    $.ajax({
      url: './site/default.js?r=2',
      dataType: 'javascript',
      success: cb,
      error: function(xhr, type){
        editor.setValue('// Error while loading default.js');
      }
    })
  };

  cssx.minify(false);
  editor = renderJSEditor(function (value) {
    compileJS(value);
  });

  loadDefaultJS(function (js) {
    editor.setValue(js);
  });
}

/* HELPERS */

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function increaseBrightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
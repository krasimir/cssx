// ********************************************************************
// Settings

var CODEMIRROR_SETTINGS = {
  value: '',
  mode:  'javascript',
  tabSize: 2,
  lineNumbers: true,
  autofocus: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
};

// ********************************************************************
// Helpers

var lsGetItem = function (key) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};
var lsSetItem = function (key, value) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

var toggling = function (container, label, callback, group) {
  var storageKey = 'cssx-' + label, oldValue;
  var is = lsGetItem(storageKey) === 'true';
  var updateUI = function () {
    container.innerHTML = (is ? '&#x2714;' : '&#x2718;') + ' ' + label;
  };

  container.addEventListener('click', function () {
    oldValue = is;
    if (group) toggling.disableAllExcept();
    lsSetItem(storageKey, is = !oldValue);
    updateUI();
    callback(is);
  });
  if (group) {
    toggling.toggles[storageKey] = function () {
      lsSetItem(storageKey, is = false);
      updateUI();
      callback(is);
    };
  }
  updateUI();
};
toggling.toggles = {};
toggling.disableAllExcept = function (storageKey) {
  for (var key in toggling.toggles) {
    if (key !== storageKey) toggling.toggles[key]();
  }
};

var el = function (sel) { return document.querySelector(sel); };
var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
var saveCode = function (code) {
  lsSetItem('cssx-playground-code', code);
  return code;
};
var getCode = function () {
  return lsGetItem('cssx-playground-code') || '';
};

// ********************************************************************
// Renders

var renderEditor = function (onChange) {
  var container = el('.js-code-editor');
  var editor = CodeMirror(container, CODEMIRROR_SETTINGS);

  editor.on('change', function () {
    onChange(editor.getValue());
  });
  editor.setValue(getCode());

  container.addEventListener('click', function () {
    editor.focus();
  });
  return editor;
};
var renderOutput = function () {
  var settings = clone(CODEMIRROR_SETTINGS), output;

  settings.readOnly = true;
  settings.cursorBlinkRate = -1;
  output = CodeMirror(el('.js-output-editor'), settings);
  return output;
};
var renderMessage = function (message) {
  var container = el('.js-message');

  container.style.display = 'block';
  container.innerHTML = message;
};
var renderOutMessage = function () {
  var container = el('.js-message');

  container.style.display = 'none';
  container.innerHTML = '';
};
var renderError = function (message) {
  el('.js-output-editor').setAttribute('data-status', 'error');
  renderMessage('<span style="color:#F00">Error: ' + message + '</span>');
};
var renderOutError = function () {
  el('.js-output-editor').setAttribute('data-status', '');
  renderOutMessage();
};

// ********************************************************************
// Boot

var init = function () {
  var ast, transpiled, output, editor;
  var transpilerOpts = { minified: false };

  // printing
  var printIfValid = function (value) { output.setValue(!!value ? value : ''); };
  var printText = function (text) { printIfValid(text); };
  var printJS = function () { printText(transpiled); };
  var printAST = function () { printIfValid(JSON.stringify(ast, null, 2)); };
  var printCompiledCSS = function () {
    var css = transpiled;
    var c = cssx.stylesheet();
    var func = new Function('cssx', transpiled + ';return cssx.compileImmediate().getCSS();');

    c.disableDOMChanges = true;
    c.minify = false;
    func(c);
    printIfValid(c.getCSS());
  };
  var print = printCompiledCSS;

  output = renderOutput();
  editor = renderEditor(updateOutput);

  // render in the right part of the screen
  function updateOutput(value) {
    try {
      ast = cssxler.ast(value);
      transpiled = cssxler(value, transpilerOpts);
      print();
      renderOutError();
      saveCode(value);
    } catch(err) {
      // console.log(err);
      renderError(err.message);
    }
  };

  // toggles
  toggling(el('.js-view-ast'), 'View AST', function (value) {
    print = value ? printAST : printCompiledCSS;
    print();
  }, true);
  toggling(el('.js-view-js'), 'View JS', function (value) {    
    print = value ? printJS : printCompiledCSS;
    print();
  }, true);
  toggling(el('.js-minify'), 'Minify', function (value) {
    transpilerOpts.minified = value;
    updateOutput(editor.getValue());
  }, false);
};

window.onload = init;
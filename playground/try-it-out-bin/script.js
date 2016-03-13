var Bin = function () {

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
  var DEFAULT_JAVASCRIPT = "var rotation = 12;\n\
var color = '#00F';\n\
var y = 10;\n\
\n\
var sheet = <style>\n\
  p {\n\
    font-size: 22px;\n\
    color: #9f0000;\n\
    text-decoration: underline;\n\
  }\n\
  p span {\n\
    display: inline-block;\n\
    color: {{ color }};\n\
    font-weight: bold;\n\
    (w)transform: translateY({{ y }}px) rotateZ({{ rotation }}deg);\n\
  }\n\
</style>;";
  var DEFAULT_HTML = '<p>\n  Hello world.<br />\n  That\'s a <span>CSSX</span> demonstration.\n</p>';

  // ********************************************************************
  // Helpers
  var el = function (sel) { return document.querySelector(sel); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };

  // ********************************************************************
  // DOM elements
  var resultContainer = el('.js-result');
  var jsContainer = el('.js-javascript');
  var errorContainer = el('.js-error');

  // ********************************************************************
  // App

  var renderJSEditor = function (onChange) {
    var settings = clone(CODEMIRROR_SETTINGS);
    var editor = CodeMirror(jsContainer, settings);

    editor.on('change', function () {
      onChange(editor.getValue());
    });
    editor.setValue(DEFAULT_JAVASCRIPT);

    jsContainer.addEventListener('click', function () {
      editor.focus();
    });
    editor.focus();
    return editor;
  }
  var renderHTMLEditor = function (onChange) {
    var container = el('.js-html'), editor;
    var settings = clone(CODEMIRROR_SETTINGS);

    settings.mode = 'xml';
    editor = CodeMirror(container, settings);

    editor.on('change', function () {
      onChange(editor.getValue());
    });
    editor.setValue(DEFAULT_HTML);

    container.addEventListener('click', function () {
      editor.focus();
    });
    onChange(editor.getValue());
    return editor;
  }
  var renderError = function(message) {
    errorContainer.innerHTML = message;
    errorContainer.style.display = 'block';
    jsContainer.setAttribute('data-status', 'error');
  }
  var renderErrorOut = function() {
    errorContainer.innerHTML = '';
    errorContainer.style.display = 'none';
    jsContainer.setAttribute('data-status', '');
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

  }
  var compileHTML = function(html) {
    resultContainer.innerHTML = html;
  }

  function init() {
    renderHTMLEditor(compileHTML);
    renderJSEditor(compileJS);
  }

  return {
    init: init
  }

}

window.onload = Bin().init;
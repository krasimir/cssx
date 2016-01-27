var el = function (sel) { return document.querySelector(sel); };
var clone = function (o) { return JSON.parse(JSON.stringify(o)); };

var CODEMIRROR_SETTINGS = {
  value: '',
  mode:  'javascript',
  tabSize: 2,
  lineNumbers: true,
  autofocus: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
};

var renderEditor = function (onChange) {
  var editor = CodeMirror(el('.js-code-editor'), CODEMIRROR_SETTINGS);

  editor.on('change', function () {
    onChange(editor.getValue());
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

var init = function () {
  var output = renderOutput();
  var print = output.setValue.bind(output);
  var editor = renderEditor(function (value) {
    try {
      ast = babylon.parse(value);
      print(JSON.stringify(ast, null, 2));
    } catch(err) {
      print('Error while parsing:\n' + err.message);
    }
  });
};

window.onload = init;
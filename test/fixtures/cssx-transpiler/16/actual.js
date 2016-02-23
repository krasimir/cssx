sheet.define('text', function (value) {
  var parts = value.split(/, ?/);
  return cssx({
    font-size: `parts[0]`em;
    line-height: `parts[1]`em;
  })
});
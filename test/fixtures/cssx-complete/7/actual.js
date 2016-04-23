var ratio = 1.2;
var getStyles = function (size) {
  return (
    <style>
      body {
        font-size: {{ size }}px;
      }
    </style>
  );
}

var sheet = cssx();
sheet.add(<style>
  p {
    font-size: 1em;
    line-height: {{ ratio }}em;
  }
</style>);
sheet.add(getStyles(10));
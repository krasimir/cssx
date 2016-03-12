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

<style>
  p {
    font-size: 1em;
    line-height: {{ ratio }}em;
  }
</style>

getStyles(10);
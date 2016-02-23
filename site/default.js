var titleFont = 'Oswald'
var sheet = cssx();

// defining a custom propety text
sheet.define('text', function (value) {
  var parts = value.split(/, ?/);
  return cssx({
    font-size: `parts[0]`em;
    line-height: `parts[1]`em;
    font-weight: `parts[2] ? parts[2] : 'bold'`;
  })
});

sheet.add(cssx(
  .left {
    (wo)transform: translateX(0);
  }
  h1 {
    text: 13, 1;
    margin: 50px 0 0 0;
    padding: 0;
    font-family: `titleFont`, sans-serif;
    (wo)transform: translateX(-50px);
    color: #FF044C;
  }
  h2 {
    text: 1.2, 1.4;
    width: 300px;
    margin: 1em 0 0 0;
    padding: 0;
    (wo)transform: translateX(92px);
  }
  h2 > small {
    display: block;
    text: 0.7, 1.7, normal;
    margin-top: 1em;
  }
));
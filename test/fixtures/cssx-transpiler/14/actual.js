var sheet = cssx();

cssx(
  body {
    color: #000;
  }
  body.error {
    color: #F00;
  }
);

sheet.add(cssx(
  p {
    font-size: 10px;
    line-height: 12px;
  }
  ul > foo {
    margin: 0;
    padding: 2em;
  }
));

var test = cssx({
  border: solid 1px #000;
  background: #F00;
});
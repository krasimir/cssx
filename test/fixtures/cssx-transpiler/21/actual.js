var sheet = <style></style>;

<style>
  body {
    color: #000;
  }
  body.error {
    color: #F00;
  }
</style>;

sheet.add(
  <style>
    p {
      font-size: 10px;
      line-height: 12px;
    }
    ul > foo {
      margin: 0;
      padding: 2em;
    }
  </style>
);

var test = <style>{
  border: solid 1px #000;
  background: #F00;
}</style>;
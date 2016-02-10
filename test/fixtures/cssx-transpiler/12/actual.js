var sheet = cssx(
  body {
    margin: 0;
    padding: 0;
  }
);

sheet.add('p', cssx({
  font-size: 10px;
}));
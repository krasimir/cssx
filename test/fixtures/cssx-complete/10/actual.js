var sheet = <style></style>;

sheet.scope('#component');

sheet.add({ 'p': { 'font-size': '10px' }});
sheet.add({ 'b': <style>{ margin-top: 10px; }</style>});

sheet.add(<style>
  header a {
    display: block;
  }
  @media (max-width: 600px) {
    header a {
      display: inline;
    }
  }
</style>);

var footer = sheet.add({ footer: {} });
footer.d({ 'p': <style>{ float: left; }</style>});
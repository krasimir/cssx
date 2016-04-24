var sheet = cssx();
sheet.add(<style>
  body {
    margin: 10px;
  }
</style>);

require('./paragraph.js')(sheet);
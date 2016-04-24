var css = <style>
  body {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  @media screen and (max-width: 200px) {
    body {
      margin: 6px;
    }
  }
</style>;

var sheet = cssx();
sheet.add(css);
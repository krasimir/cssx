var func = function () {
  return <style>
    h1 {
      color: #000;
    }
    @media (max-width: 600px) {
      h1 {
        color: red;
      }
      small {
        line-height: 2em;
      }
    }
  </style>;
}

var sheet = <style></style>;
sheet.add(func());
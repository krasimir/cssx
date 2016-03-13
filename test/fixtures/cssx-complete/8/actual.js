var sheet = <style></style>;

var scope = sheet.add('#something');

scope.d(
  <style>
    p {
      font-size: 20px;
    }
    p.small {
      font-size: 0.6em;
    }
  </style>
);

scope.n(
  <style>
    section {
      font-size: 20px;
    }
    section.small {
      font-size: 0.6em;
    }
  </style>
);
cssx(
  section::after {
    content: " ";
    display: table;
    clear: both;
  }
  section small {
    font-size: .2em;
  }
  @media screen and (max-width: 1000px) {
    p {
      font-size: 0.8em;
    }
    p > a {
      text-decoration: underline;
      color: #000;
    }
  }
  section p > a {
    text-decoration: none;
    background: url("../public/bg.jpg") no-repeat;
  }
);
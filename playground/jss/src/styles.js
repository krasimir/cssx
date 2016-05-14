export default <style>
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/raleway/v10/YZaO6llzOP57DpTBv2GnyFKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Lobster';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/lobster/v16/MeFZ5NpSE1j8mC06Jh1miFKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  button {
    font-family: 'Raleway';
    font-size: 12px;
    &:hover {
      background: blue;
    }
  }
  ctaButton {
    extend: button;
    &:hover {
      background: red;
    }
  }
  @media (max-width: 800px) {
    button {
      font-family: 'Lobster';
    }
  }
  p {
    font-family: 'Lobster';
    font-size: 20px;
  }
</style>;
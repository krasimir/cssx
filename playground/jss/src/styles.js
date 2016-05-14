export default <style>
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'), url(https://fonts.gstatic.com/s/raleway/v10/YZaO6llzOP57DpTBv2GnyFKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
  }
  @font-face {
    font-family: 'Lobster';
    font-style: normal;
    font-weight: 400;
    src: local('Lobster'), local('Lobster-Regular'), url(https://fonts.gstatic.com/s/lobster/v16/MeFZ5NpSE1j8mC06Jh1miFKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
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
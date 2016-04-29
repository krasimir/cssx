export default <style>
  button {
    font-size: 12;
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
  @media (min-width: 1024px) {
    button {
      minWidth: 200;
    }
  }
</style>;
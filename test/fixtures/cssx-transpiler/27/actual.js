var minWidth = 1024;

var a = <style>
  button {
    width: 100px;
  }
  @media (min-width: {{ minWidth }}px) {
    button {
      width: 200px;
    }
  }
</style>
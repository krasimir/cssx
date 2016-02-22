
var index = 10;
var color = '#fff';

cssx('selected')
  .clear()
  .add(cssx(
    li:nth-child(`index + 1`) {
      padding-left: 2em;
    }
    li:nth-child(`index + 1`) .btn {
      background-color: `color`;  
    }
  ));
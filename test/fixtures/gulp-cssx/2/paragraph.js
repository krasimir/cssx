module.exports = function (sheet) {
  var p = sheet.add('p', <style>{
    background: #F00;
  }</style>);
  p.d(<style>
    small {
      font-size: 10px;
    }
  </style>);
}
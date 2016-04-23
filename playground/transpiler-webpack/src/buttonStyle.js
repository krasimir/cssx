var enabled = true;
var sheet = cssx();

module.exports = function (e) {
  var button = e.target;
  var input = document.querySelector('input');

  enabled = !enabled;
  button.innerText  = enabled ? 'disable input' : 'enable input';

  sheet.add(<style>
    input {
      border: solid `enabled ? '2px #999' : '1px #B0B0B0'`;
      color: `enabled ? '#000' : '#ccc'`;
    }
  </style>);
  input.disabled = !enabled;
};

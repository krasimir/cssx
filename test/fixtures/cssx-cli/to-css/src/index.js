var settings = require('./utils/settings');

var styles = function (margin) {
  <style>
    body {
      margin: {{ margin }}px;
      font-size: {{ settings.font.size }}px;
      padding: 0;
    }
  </style>
};

styles(15);
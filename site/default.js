var color = '#004B63';
var sheet = cssx();

function letItSnow(bgColor) {
  sheet.add(<style>
    body, a, h1 { color: #FFF; }
    body { background: {{ bgColor }}; }
    .left {
      background-image: 
        url("./site/imgs/s1.png"),
        url("./site/imgs/s2.png"),
        url("./site/imgs/s3.png");
      (wmo)animation: snow 10s linear infinite;
    }
  </style>);
};

// --------------- the boring part ---------------

document
  .querySelector('button')
  .addEventListener('click', function () {
    letItSnow(color);
  });
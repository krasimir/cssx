// styles applied immediately
cssx(
  body {
    background: #F0CB13;
  }
  h1 {
    (wmo)transform: translateX(-35px);
    color: #FF044C;
    letter-spacing: 0px;
  }
  @keyframes snow {
    0% { background-position: 0px 0px, 0px 0px, 0px 0px; }
    50% { background-position: 500px 500px, 100px 200px, -100px 150px; }
    100% { background-position: 500px 1000px, 200px 400px, -100px 300px; }
  }
);

// styles applied when the button is clicked
function letItSnow(bgColor) {
  cssx(
    body, a, h1 { color: #FFF; }
    body { background: <% bgColor %>; }
    .left {
      background-image: 
        url("./site/imgs/s1.png"),
        url("./site/imgs/s2.png"),
        url("./site/imgs/s3.png");
      (wmo)animation: snow 10s linear infinite;
    }
  )
};


// --------------- the boring part ---------------

document
  .querySelector('button')
  .addEventListener('click', function () {
    letItSnow('#004B63');
  });
var showImages = ['s1.png', 's2.png', 's3.png'];
cssx(
  body {
    background: #F0CB13;
  }
  h1 {
    (wmo)transform: translateX(-35px);
    color: #FF044C;
    letter-spacing: 0px;
  }
);

function letItSnow() {
  cssx(
    .left {
      background-image: `
        showImages.reduce(function(value, image) {
          value.push('site/imgs/' + value);
          return value;
        }, []).join(',')
      `;
      (wmo)animation: snow 10s linear infinite;
    }
    @keyframes snow {
      0% { background-position: 0px 0px, 0px 0px, 0px 0px; }
      50% { background-position: 500px 500px, 100px 200px, -100px 150px; }
      100% { background-position: 500px 1000px, 200px 400px, -100px 300px; }
    }
  )
};


// --------------- the boring part ---------------

document
  .querySelector('button')
  .addEventListener('click', letItSnow);
 
/*
  helpers which are available globally on the page
  getRandomColor()
  getRandomInt(min, max)
*/
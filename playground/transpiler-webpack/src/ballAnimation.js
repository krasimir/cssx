var animationApply = 'ball-animation 1s ease infinite alternate';
var animation = cssx(
  @keyframes ball-animation {
    0% { 
      (w)transform: translateX(0);
    }
    100% {
      (w)transform: translateX(60px);
    }
  }
  .ball {
    (w)animation: `animationApply`;
    background-color: rgb(200, 0, 0);
  }
);

module.exports = {
  updateEndpoint: function (endPoint) {
    animation.update('@keyframes ball-animation', '100%', '(w)transform', 'translateX(' + endPoint + 'px)');
  },
  updateColor: function (color) {
    animation.update('.ball', 'background-color', 'rgb(' + color + ', 0, 0)');
  }
};
var animationApply = 'ball-animation 1s ease infinite alternate';
var animation = cssx(
  @keyframes ball-animation {
    0%   { 
      (w)transform: translateX(0);
    }
    100% {
      (w)transform: translateX(200px);
    }
  }
  .ball {
    (w)animation: `animationApply`;
  }
);

module.exports = {
  update: function (endPoint) {
    
  }
};
var animationApply = 'ball-animation 1s ease infinite alternate';
var animation = cssx(
  @-webkit-keyframes ball-animation {
    0%   { 
      transform: translateX(0);
      -webkit-transform: translateX(0);
    }
    100% {
      transform: translateX(200px);
      -webkit-transform: translateX(200px);
    }
  }
  .ball {
    (wmo)animation: `animationApply`;
  }
);

module.exports = {

};
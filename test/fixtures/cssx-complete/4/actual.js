var stylesheet = cssx();
var animationApply = 'ball-animation 1s ease infinite alternate';
var animation = stylesheet.add(<style>
  @keyframes ball-animation {
    0%   { 
      transform: translateX(0);
    }
    100% {
      transform: translateX(200px);
    }
  }
  .ball {
    animation: `animationApply`;
  }
</style>);
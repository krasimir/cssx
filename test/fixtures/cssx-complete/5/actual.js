var animationApply = 'ball-animation 1s ease infinite alternate';
var stylesheet = cssx();
var animation = stylesheet.add(<style>
  @keyframes ball-animation {
    0%   { 
      (woms)transform: translateX(0);
    }
    100% {
      (a)transform: translateX(200px);
    }
  }
  .ball {
    animation: `animationApply`;
  }
</style>);
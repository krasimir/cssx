var animationApply = 'ball-animation 1s ease infinite alternate';
var animation = cssx();
animation.add(<style>
  @keyframes ball-animation {
    0% { 
      transform: translateX(0);
    }
    100% {
      transform: translateX(60px);
    }
  }
  .ball {
    animation: `animationApply`;
    background-color: rgb(200, 0, 0);
  }
</style>);

module.exports = {
  updateEndpoint: function (endPoint) {
    animation.update(<style>
      @keyframes ball-animation {
        100% {
          transform: translateX(`endPoint`px);
        }
      }
    </style>);
  },
  updateColor: function (color) {
    animation.update({
      '.ball':
      <style>{ background-color: rgb(`color`, 0, 0); }</style>
    });
  }
};
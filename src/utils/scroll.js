/**
 * Created by giantR on 2017/3/24.
 */
if (!window.requestAnimationFrame) {
  requestAnimationFrame = function(fn) {
    setTimeout(fn, 17);
  };
}
export default {
  /* 缓动
  *A是起始位置；
  *B是目标位置；
  *rate是缓动速率；
  *callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）；
  */
  easeout: function (A, B, rate, callback) {
  if (A == B || typeof A != 'number') {
    return;
  }
  B = B || 0;
  rate = rate || 2;

  var step = function () {
    A = A + (B - A) / rate;

    if (A < 1) {
      callback(B, true);
      return;
    }
    callback(A, false);
    requestAnimationFrame(step);
  };
  step();
  }
}

function animate(obj, target, callback) { // 添加一个回调函数形参 callback
  // console.log(callback); // 相当于执行了 callback = function(){}


  clearInterval(obj.timer)

  obj.timer = setInterval(function () {

    var step = (target - obj.offsetLeft) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)

    if (obj.offsetLeft == target) {
      // 停止动画 停止定时器
      clearInterval(obj.timer)
      // 回调函数写到定时器结束里面
      // if (callback) {
      //   // 调用函数
      //   callback()
      // }

      callback && callback()  // 同为true才执行  有参数传进来时callback为true，否则callback短路不执行
    }
    // 修改步长值为慢慢变小的值 步长公式：（目标值 - 现在的位置）
    obj.style.left = obj.offsetLeft + step + 'px'
  }, 15)
}

// 希望页面全部加载完再执行
window.addEventListener('load', function(){
   var arrow_l = document.querySelector('.arrow-l')
   var arrow_r = document.querySelector('.arrow-r')
   var focus = document.querySelector('.focus')
   // ul移动距离就是 小圆圈索引号 乘以 图片宽度 注意是负值
   var focusWidth = focus.offsetWidth

   // 鼠标经过轮播图模块，左右按钮显示 关闭定时器
   focus.addEventListener('mouseenter', function(){
    arrow_l.style.display = 'block'
    arrow_r.style.display = 'block'
    clearInterval(timer)
    timer = null // 清除定时器
   })

   // 离开隐藏左右按钮 开启定时器
   focus.addEventListener('mouseleave', function(){
    arrow_l.style.display = 'none'
    arrow_r.style.display = 'none'
    timer = setInterval(function(){
      // 手动调用点击事件
      arrow_r.click()
    }, 2000)
   })

   //动态生成小圆圈
   // 1. 获取小圆圈个数
   var ul = focus.querySelector('ul')
   var ol = focus.querySelector('.circle')
  //  console.log(ul.children.length); // 获取图片数

  for(var i = 0; i < ul.children.length; i++){
    // 创建
    var li = document.createElement('li')
    // 记录当前小圆圈的索引号,通过自定义属性设置
    li.setAttribute('index', i)
   
    // 插入
    ol.appendChild(li)

    // 小圆圈排他思想 可以在生成时直接绑定，仅点击的圆圈current
    li.addEventListener('click', function(){
      // 清除所有li 的 current
      for(var i = 0; i < ol.children.length; i++){
        ol.children[i].className = ''
      }
      // 添加自己的current
      this.className = 'current'

       // 点击某个li 就获得当前li的索引号
      var index = this.getAttribute('index')
      console.log(index);

      // 要实现 点击按钮和点击小圆点变化的同步 点击了某个小li 就要把这个 li 的索引号 给num
      num = index
      // 要实现 小圆点变色和点击小圆点变化的同步 点击了某个小li 就要把这个 li 的索引号 给circle
      circle = index

      // 点击小圆圈 移动ul
     
      console.log(focusWidth);

      animate(ul, - index * focusWidth)
    })
  }

  //ol里第一个children设置current类
  ol.children[0].className = 'current'

  // 克隆第一张图片 放到ul最后面
  var first = ul.children[0].cloneNode(true)
  ul.appendChild(first)
  // 设置全局变量 num
  var num = 0
  // 全局变量 circle 控制小圆圈的播放
  var circle = 0 

  // flag节流阀
  var flag = true


  // 点击右侧按钮 图片滚动一张
  arrow_r.addEventListener('click', function(){
    if(flag){
      flag = false // 关闭节流阀

    // 如果走到了最后复制的一张图片 此时，我们的ul 要快速复原left 改为 0
    if(num == ul.children.length - 1){
      ul.style.left = 0
      num = 0
    }
    num++
    animate(ul, -num * focusWidth, function(){
      flag = true
    }) // 动画播放完毕，打开节流阀

    // 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
    circle++
    // 如果circle == 4，说明走到了最后克隆的图片 需复原
    if(circle == ol.children.length){
      circle = 0
    }
    // 样式清除
    circleChange()
    }
  })

    // 左侧按钮功能
    arrow_l.addEventListener('click', function(){
      if(flag){
        flag = false
        // 如果走到了最后复制的一张图片 此时，我们的ul 要快速复原left 改为 0
      if(num == 0){
        num = ul.children.length - 1
        ul.style.left = -num * focusWidth + 'px'
      }
      num--
      animate(ul, -num * focusWidth, function(){
        flag = true
      })
  
      // 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle--
      // // 如果circle < 0，说明第一张图片的小圆圈要改为第四张图片的小圆圈
      // if(circle < 0){
      //   circle = ol.children.length - 1
      // }

      circle = circle < 0 ? ol.children.length - 1: circle
      
      circleChange()
      }
    })

    // 左右按钮清除小圆圈样式代码相同 在外部声明函数
    function circleChange(){
      // 清除所有li 的 current
      for(var i = 0; i < ol.children.length; i++){
        ol.children[i].className = ''
      }
      // 添加当前小圆圈的current
      ol.children[circle].className = 'current'
    }

    // 自动播放轮播图
    var timer = setInterval(function(){
      // 手动调用点击事件
      arrow_r.click()
    }, 2000)
})
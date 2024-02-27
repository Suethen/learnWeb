// 监控区域模块制作
// 为了防止变量名冲突（变量污染） 我们采用立即执行函数策略 多个立即函数中间采用；隔开

//$(".monitor.tabs")  jQuery 选择器，试图选择文档中所有类为 "monitor" 的元素下的 "tabs" 元素
// .on("click", "a", function(){})
/* jQuery 中的事件绑定方法。它绑定了 "click" 事件到符合选择器条件的元素上，这里是 "a" 元素。当 "a" 元素被点击时，执行后面的回调函数，显示一个弹窗（alert(11)）。

"click"：指定绑定的事件类型。
"a"：指定事件委托的目标元素。这表示只有 "a" 元素被点击时，才会触发事件。
function(){ alert(11); }：事件处理函数，当事件触发时执行。*/
(function(){
  $(".monitor .tabs").on("click", "a", function(){
    $(this)
    .addClass('active')
    .siblings("a")
    .removeClass("active")

    // console.log($(this).index());
    $(".monitor .content")
    .eq($(this).index())
    .show()
    .siblings(".content")
    .hide()
  });

  //无缝滚动
// 先克隆marquee里面所有的行
$(".marquee-view .marquee").each(function(){
    // console.log($(this));
    var rows = $(this)
    .children()
    .clone();
    $(this).append(rows)
})

})();

// (function(){
//   var monitor = document.querySelector('.monitor')
//   var tabs = monitor.querySelector('.tabs')
//   var a = tabs.querySelectorAll('a')
//   var contents = monitor.querySelectorAll('.content')

//  for(var i = 0; i < a.length;i++){
//   (function(index) {
//     a[index].addEventListener('click', function() {
//         for (var j = 0; j < tabs.children.length; j++) {
//             a[j].className = '';
//         }
//         this.className = 'active';

//         for (var k = 0; k < contents.length; k++) {
//             contents[k].style.display = 'none';
//         }
//         contents[index].style.display = 'block';
//     });
// })(i);
// }

// })()


// 点位图分布模块
(function(){
    // 实例化对象
    var myChart = echarts.init(document.querySelector('.pie'))
    // 指定配置项和数据
    var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '点位统计',
            type: 'pie',
            radius: ["10%", "68%"],
            // 如果radius是百分比，则必须加“”
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            // 注意颜色写的位置
            color: [
                "#006cff",
                "#60cda0",
                "#ed8884",
                "#ff9f7f",
                "#0096ff",
                "#9fe6b8",
                "#32c5e9",
                "#1d9dff"
            ],
            data: [
              { value: 20, name: '云南' },
              { value: 26, name: '北京' },
              { value: 24, name: '山东' },
              { value: 25, name: '河北' },
              { value: 20, name: '江苏' },
              { value: 25, name: '浙江' },
              { value: 30, name: '四川' },
              { value: 42, name: '湖北' }
            ],
            // 修饰饼形图文字相关的样式 label对象
            label:{
                fontSize: 10
            },
            labelLine: {
                length: 6,
                length2: 8
            }
          }
        ]
      };

      // 配置项和数据给实例化对象
      myChart.setOption(option)
      // 当浏览器缩放时 图表也等比例缩放
      window.addEventListener("resize", function(){
       // 图表调用resize方法
        myChart.resize();
      })
})();
// 柱形图模块
(function(){
    var item = {
        name:'',
        value: 1200,
        // 柱子颜色
        itemStyle: {
          color: '#254065'
        },
         // 鼠标经过柱子颜色
        emphasis: {
          itemStyle: {
            color: '#254065'
          }
        },
        // 工具提示隐藏
        tooltip: {
          extraCssText: 'opacity:0'
        },
      }
    var myChart = echarts.init(document.querySelector(".bar"))
    var option = {
        color: new echarts.graphic.LinearGradient(
            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            0, 0, 0, 1,
            [
                 { offset: 0, color: '#00fffb' }, // 0 起始颜色
                 { offset: 1, color: '#0061ce' }  // 1 结束颜色
           ]
        ),
        tooltip: {
          trigger: 'item',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        },
        // 直角坐标系内绘图网格（区域）
        grid: {
            top: '4%',
            right: '3%',
            bottom: '3%',
            left: '0%',
            //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
            containLabel: true,
            // 是否显示直角坐标系网格
            show: true,
            //grid 四条边框的颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [
          {
            type: 'category',
            // xAxis
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
              // true意思：图形和刻度居中中间
            // false意思：图形在刻度之间
            alignWithLabel: false,
            // 不显示刻度
            show: false
            },
             // x坐标轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd'
            },
            // x坐标轴颜色设置
            axisLine:{
                lineStyle:{
                    color:'rgba(0, 240, 255, 0.3)',
                // width:8,  x轴线的粗细
                // opcity: 0,   如果不想显示x轴线 则改为 0
                }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
                // true意思：图形和刻度居中中间
              // false意思：图形在刻度之间
              alignWithLabel: false,
              // 不显示刻度
              show: false
              },
               // x坐标轴文字标签样式设置
              axisLabel: {
                  color: '#4c9bfd'
              },
              // x坐标轴颜色设置
              axisLine:{
                  lineStyle:{
                      color:'rgba(0, 240, 255, 0.3)',
                  // width:8,  x轴线的粗细
                  // opcity: 0,   如果不想显示x轴线 则改为 0
                  },
                   // y轴 分割线的样式 
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }     
              }
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            // series
data: [2100,1900,1700,1560,1400,item,item,item,900,750,600,480,240]
          }
        ]
      };
    myChart.setOption(option)

    // 4. 当浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();

// 订单功能
(function(){
  // 1. 准备数据
  var data = {
    day365: { orders: '20,301,987', amount: '99834' },
    day90: { orders: '301,987', amount: '9834' },
    day30: { orders: '1,987', amount: '3834' },
    day1: { orders: '987', amount: '834' }
  }
  // 获取显示 订单数量 容器
  var $h4Orders = $('.order h4:eq(0)')
  // 获取显示 金额数量 容器
  var $h4Amount = $('.order h4:eq(1)')
  $('.order').on('click','.filter a',function(){
    // 2. 点击切换激活样式
    $(this).addClass('active').siblings().removeClass('active')
  //   // 3. 点击切换数据；
  //   var currdata = data[this.dataset.key]
  //   $h4Orders.html(currdata.orders)
  //   $h4Amount.html(currdata.amount)
  // })
  // 3. 点击切换数据；
  var key = this.dataset.key;

  // 添加安全性检查
  if (data.hasOwnProperty(key)) {
      var currdata = data[key];
      $h4Orders.html(currdata.orders);
      $h4Amount.html(currdata.amount);
  } else {
      console.error("Data for key '" + key + "' not found.");
  }
})
  // 4. 开启定时器切换数据
  var index = 0
  var $allTab = $('.order .filter a')
  setInterval(function(){
    // index ++ 
    // if (index >= 4) index = 0
    // $allTab.eq(index).click()
     // 确保 index 小于元素数量
     index = index < $allTab.length - 1 ? index + 1 : 0;
     $allTab.eq(index).click();
  },5000)
})();

// 销售统计模块
(function() {
  // （1）准备数据
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
  }
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".line"));
  // 2. 指定配置和数据
  var option = {
    color:["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // 修改图例文字颜色
      textStyle: {
        color:"#4c9bfd"
      }
      // 如果series 里面设置了 name， 此时 图里组件里面的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true,
      borderColor:"#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签颜色
      axisLabel: {
        color:"#4c9bfd"
      },
      // 去除x坐标轴颜色
      axisLine: {
        show:false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签颜色
      axisLabel: {
        color:"#4c9bfd"
      },
      // 修改y轴分割线颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      {
        name:'预期销售额',
        data:  data.year[0],
        type: 'line',
        // 是否让线条圆滑显示
        smooth: true
      },
      {
        name:'实际销售额',
        data: data.year[1],     
        type: 'line',
        smooth: true
      }
    ]
  };

  // 3. 把配置和数据给实例对象
  myChart.setOption(option);
  // 4.tab栏切换效果制作
  // (2) 点击切换效果
  $(".sales .caption").on("click", "a", function(){
    // 点击当前a 高亮显示 调用active
    // 此时要注意索引号问题
    index = $(this).index() - 1 // 前面还有一个h3
    $(this)
    .addClass('active')
    .siblings("a")
    .removeClass('active')

    // 拿到当前a的自定义属性值
  // console.log(this.dataset.type);
  // 根据拿到的值去找数据
  // console.log(data.year);
  // console.log(data["year"]);
  // console.log(data[this.dataset.type]); // this.dataset.type 就是一个字符串
  var arr = data[this.dataset.type]
  // console.log(arr);
  // 根据拿到的数据重新渲染series里面的data
  option.series[0].data = arr[0]
  option.series[1].data = arr[1]

  // 重新把配置好的数据给实例对象
  myChart.setOption(option);
  })

  // 5. tab栏自动切换效果
  // 开启定时器每隔3s，自动让a触发点击事件即可
  var as = $(".sales .caption a")
  var index = 0
  var timer = setInterval(function(){
    index++
    if(index >=  as.length) index = 0
    as.eq(index).click()
  }, 1000)

  // 鼠标经过sales，关闭定时器，离开开启定时器
  $(".sales").hover(
    function(){
      clearInterval(timer)
    },
    function(){
      clearInterval(timer)
      timer = setInterval(function(){
        index++
        if(index >=  as.length) index = 0
        as.eq(index).click()
      }, 1000)
    }
  )
  window.addEventListener("resize", function(){
    myChart.resize()
  })
})();

// 渠道模块 雷达图
(function(){
  // 实例化
  var myChart = echarts.init(document.querySelector(".radar"))
  // 配置

  var option = {
    tooltip: {
      show: true,
      // 提示控制框组件的显示位置
      position: ['60%', '10%'],
      // confine: false, // 设置为 false，不受容器限制
      textStyle: {
        fontSize: 5
       }
    },
    // backgroundColor: '#161627',
    radar: {
      indicator: [
        { name: '机场', max: 100 },
        { name: '商场', max: 100 },
        { name: '火车站', max: 100 },
        { name: '汽车站', max: 100 },
        { name: '地铁', max: 100 }
      ],
      // 修改雷达图大小
      radius: "50%",
      shape: 'circle',
      splitNumber: 4, // 指示器轴圆圈分割段数
      axisName: { //修改文字颜色
        color: '#4c9bfd'
      },
      // 雷达区分割圆圈线设置为白色半透明 0.5
      splitLine: {
        lineStyle: {
          color: 
          // [
          //   'rgba(238, 197, 102, 0.1)',
          //   'rgba(238, 197, 102, 0.2)',
          //   'rgba(238, 197, 102, 0.4)',
          //   'rgba(238, 197, 102, 0.6)',
          //   'rgba(238, 197, 102, 0.8)',
          //   'rgba(238, 197, 102, 1)'
          // ].reverse()
          "rgba(255, 255, 255, 0.5)"
        }
      },
      splitArea: {
        show: false
      },
      // 坐标轴的线修改为白色半透明
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.5)"
          // 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [
      {
        name: 'Beijing',
        type: 'radar',
        // 修改填充线条
        lineStyle: {
          color: "#fff",
          width: 1,
          opacity: 0.5
        },
        data:[[90, 19, 56, 11, 34]],
        // symbol 标记的样式(拐点），还可以取值'rect' 方块 ,'arrow' 三角等
        symbol: 'circle',
        //拐点的大小
        symbolSize: 5,
        // 小圆点（拐点）设置为白色
        itemStyle: {
          color: '#fff'
        },
        // 在小圆点上显示相关数据
        label: {
          show: true,
          fontSize: 10
        },
        // 区域填充背景颜色
        areaStyle: {
          color: "rgba(238, 197, 102, 0.6)"
        }
      }
    ]
  };

  myChart.setOption(option)
  window.addEventListener("resize", function(){
    myChart.resize()
  })
})();

// 销售模块 饼形图 半圆形 设置方式
(function(){
  // 1. 实例化对象
  var myChart  = echarts.init(document.querySelector('.gauge'))
    // 2. 指定数据和配置
  var option = {
    series: [
   {
     name: '销售进度',
     type: 'pie',
     radius: ['130%', '150%'],
     // 移动图表，使得套住数字
     center: ['48%', '80%'],

     // // 是否启用防止标签重叠策略
     // avoidLabelOverlap: false,
     // 饼状图文字相关设置
     // label: {
     //   show: false,
     //   position: 'center'
     // },
     // emphasis: {
     //   label: {
     //     show: true,
     //     fontSize: 40,
     //     fontWeight: 'bold'
     //   }
     // },
     labelLine: {
       show: false
     },
     // 饼形图的起始角度为 180 注意不是旋转角度
     startAngle: 180,
     // 鼠标经过不需要放大偏移图形
     hoverOffset: 0,
     data: [
       { value: 100,
         itemStyle: {
          // 颜色渐变#00c9e0 → #005fc1
          color: new echarts.graphic.LinearGradient(
            // (x1, y1)到(x2, y2)之间渐变
            0,
            0,
            0,
            1,
            [
              {offset: 0, color: "#00c9e0"}, // 0 起始颜色
              {offset: 1, color: "#005fc1"} // 1 结束颜色
            ]
          )
         }
       },
       { value: 100,
        itemStyle: {
         color: "#12274d"
        }
      },
       { value: 200,
         itemStyle: {
          color: "transparent"
         }
        }
     ]
   }
 ]
};
  // 3. 把数据和配置给实例对象

myChart.setOption(option)
window.addEventListener("resize", function(){
  myChart.resize()
})

})();

(function(){
  // 准备相关数据
  var hotData = [
    {
      city: '北京',  // 城市
      sales: '25, 179',  // 销售额
      flag: true, //  上升还是下降
      brands: [   //  品牌种类数据
        { name: '可爱多', num: '9,086', flag: true },
        { name: '娃哈哈', num: '8,341', flag: true },
        { name: '喜之郎', num: '7,407', flag: false },
        { name: '八喜', num: '6,080', flag: false },
        { name: '小洋人', num: '6,724', flag: false },
        { name: '好多鱼', num: '2,170', flag: true },
      ]
    },
    {
      city: '河北',
      sales: '23,252',
      flag: false,
      brands: [
        { name: '可爱多', num: '3,457', flag: false },
        { name: '娃哈哈', num: '2,124', flag: true },
        { name: '喜之郎', num: '8,907', flag: false },
        { name: '八喜', num: '6,080', flag: true },
        { name: '小洋人', num: '1,724', flag: false },
        { name: '好多鱼', num: '1,170', flag: false },
      ]
    },
    {
      city: '上海',
      sales: '20,760',
      flag: true,
      brands: [
        { name: '可爱多', num: '2,345', flag: true },
        { name: '娃哈哈', num: '7,109', flag: true },
        { name: '喜之郎', num: '3,701', flag: false },
        { name: '八喜', num: '6,080', flag: false },
        { name: '小洋人', num: '2,724', flag: false },
        { name: '好多鱼', num: '2,998', flag: true },
      ]
    },
    {
      city: '江苏',
      sales: '23,252',
      flag: false,
      brands: [
        { name: '可爱多', num: '2,156', flag: false },
        { name: '娃哈哈', num: '2,456', flag: true },
        { name: '喜之郎', num: '9,737', flag: true },
        { name: '八喜', num: '2,080', flag: true },
        { name: '小洋人', num: '8,724', flag: true },
        { name: '好多鱼', num: '1,770', flag: false },
      ]
    },
     {
      city: '山东',
      sales: '20,760',
      flag: true,
      brands: [
        { name: '可爱多', num: '9,567', flag: true },
        { name: '娃哈哈', num: '2,345', flag: false },
        { name: '喜之郎', num: '9,037', flag: false },
        { name: '八喜', num: '1,080', flag: true },
        { name: '小洋人', num: '4,724', flag: false },
        { name: '好多鱼', num: '9,999', flag: true },
      ]
    }
  ]

  // 根据数据渲染各省热销 sup 模块 内容
  // 删掉原先自带的小li
  // 遍历数据$.each()
  // 拼接字符串把数据渲染到li的span里面
  // 追加给.sup盒子


  // （1）遍历hotdata对象
  var supHTML = ""
  $.each(hotData, function(index, item){
    // console.log(item);
    // 每次遍历生成一个li放进字符串里
    supHTML += `<li><span>${item.city}</span><span>${item.sales} <s class=${item.flag? "icon-up": "icon-down"}></s></span></li>`
  });
  // 把生成的5个小li字符串给 sup dom 盒子
  $(".sup").html(supHTML)

  // 3. 当鼠标进入tab的时候
  // 鼠标经过当前的小li要高亮显示 事件委托
  $('.province .sup').on('mouseover', 'li', function(){
    index = $(this).index()
    render($(this))
  })
  // 声明一个函数 里面设置sup当前小li高亮 还有 对应的品牌对象渲染
  // 传递当前元素
  function render(that){
    that
    .addClass('active')
    .siblings()
    .removeClass('active')

    // 拿到当前城市的品牌对象
    // console.log($(this).index());
    // 可以通过hotData[$(this).index()] 得到当前的城市
    // hotData[$(this).index()].brands 城市对象的品牌种类
    // console.log(hotData[$(this).index()].brands);

    // 开始遍历品牌数组
    var subHTML = ""
    $.each(hotData[that.index()].brands, function(index, item){
        // item 是对应的每一个品牌对象
        console.log(item);
        subHTML += `<li><span>${item.name}</span><span>${item.num} <s class=${item.flag? "icon-up": "icon-down"}></s></span></li>`
    });

    // 把生成的6个小li字符串给 sub dom 盒子
    $('.sub').html(subHTML)
  }

  // 4. 默认把第一个小li处于鼠标经过状态
  var lis = $(".province .sup li");
  lis.eq(0).mouseenter()
  // 5. 开启定时器
  var index = 0;
  var timer = setInterval(function(){
    index++
    if(index >= lis.length) index = 0
    // sup的hover和li的mouseenter冲突
    // lis.eq(index).mouseenter()
     render(lis.eq(index))
    
  }, 2000);

  // sup的hover和li的mouseenter冲突
  $(".province .sup").hover(
    // 鼠标经过事件
    function(){
      clearInterval(timer)
    }, 
    // 鼠标离开事件
    function(){
      clearInterval(timer)
      timer = setInterval(function(){
        index++
        if(index >= lis.length) index = 0
        // sup的hover和li的mouseenter冲突
        // lis.eq(index).mouseenter()
        render(lis.eq(index))
     
      }, 2000);
    }
  )
})()
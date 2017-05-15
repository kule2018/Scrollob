(function() {

  /**
   * @description 数组map
   * @param array {Array} 数组
   * @param map   {Function} 过滤函数
   * @returns {Array}
   */
  function map(array, map) {
    var result = [];
    $.each(array, function(i) {
      if (map(this, i)) {
        result.push(this);
      }
    });
    return result;
  }

  var Scrollob = {
    list: [],
    ENTER: 'scroll-enter',
    EXIT: 'scroll-exit',
    add: function(elements) {
      elements.each(function() {
        var ele = $(this);
        Scrollob.list.push({
          ele: ele,
          status: false
        });
      });
      return elements;
    },
    remove: function(elements) {
      // 待删除索引数组
      var delIndexs = [];
      // 将 elements数组 于 list数组中相同的去掉
      $.each(Scrollob.list, function(i) {
        var ele = this.ele.get(0);
        var exist = false;
        elements.each(function() {
          if (ele == this) {
            $(ele)
            .off(Scrollob.ENTER)
            .off(Scrollob.EXIT)
            exist = true;
          }
        });
        if (exist)
          delIndexs.push(i);
      });
      Scrollob.list = map(Scrollob.list, function(item, i) {
        return delIndexs.indexOf(i) === -1
      });
      return elements;
    },

    // 主动触发一次滚动条, 用于元素初始化
    trigger: function() {
      $(window).trigger('scroll');
    },
    // 初始化监听
    init: function() {
      var win = $(window);
      win.scroll(function() {
        // 文档高度
        var maxHeight = win.height();
        // 文档滚动条偏移
        var offsetTop = win.scrollTop();
        // 已滚过高度
        var postion = maxHeight + offsetTop;
        // console.log('文档高度:', maxHeight, '文档滚动条偏移: ', offsetTop, '已滚过高度:', postion);

        $.each(Scrollob.list, function() {
          Scrollob.test(this, postion, offsetTop);
        })
      });
    },
    // 检测单个元素是否再可视区内
    test: function(item, postion, offsetTop) {
      var ele = item.ele;
      // 元素上限
      var top = ele.offset().top;
      // 元素下限
      var bottom = top + ele.height();
      if (postion > top && offsetTop < bottom) {
        if (!item.status) {
          item.status = true;
          ele.trigger(Scrollob.ENTER);
        }
      } else {
        if (item.status) {
          item.status = false;
          ele.trigger(Scrollob.EXIT);
        }
      }
    }
  };


  Scrollob.init();
  window.Scrollob = Scrollob;
})();
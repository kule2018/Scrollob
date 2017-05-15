# Scrollob

> 一个基于jQuery的元素滚动监听, 监听元素是否在可视窗口内

* `Scrollob`
  * `ENTER` 枚举事件, 元素可视
  * `EXIT`  枚举事件, 元素不可视
  * `add(jQuery)` 添加一个或多个元素, 开始监听
  * `remove(jQuery)`  移除一个或多个元素的监听
  * `trigger()`   模拟触发一次滚动事件, 用于初始化


## 例子
```js
  var boxs = Scrollob.add($('.box'))
  .on(Scrollob.ENTER, event => {
    $(event.currentTarget).addClass('visible')
  })
  .on(Scrollob.EXIT, event => {
    $(event.currentTarget).removeClass('visible')
  })
  // 手动触发滚动条事件
  Scrollob.trigger();

  setTimeout(() => {
    // 5秒后移除最后一个元素的监听
    Scrollob.remove(boxs.last());
  }, 5000);
```
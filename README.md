## Soyeux

Soyeux 是一个原生 JS 编写的轮播图，灵感来源于 [slickjs](https://github.com/kenwheeler/slick)

## Screenshot

![slideloop](https://kanmalu.com/images/soyeuxloop.gif)

## Usage

HTML：

```html
<div class="soyeux">
  <div class="single"><h1>1</h1></div>
  <div class="single"><h1>2</h1></div>
  <div class="single"><h1>3</h1></div>
  <div class="single"><h1>4</h1></div>
  <div class="single"><h1>5</h1></div>
  <div class="single"><h1>6</h1></div>
</div>
```

JavaScript：

```js
new Soyeux('single', {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
})
```

## Options

- pos: number - default(0) - 页面中的第一个轮播图
- speed: number - default(3000 ms) - 轮播播放速度
- slidesToShow: number - default(1) - 显示几张图片
- slidesToScroll: number - defalut(1) - 每次滑动几张图片
- autoplay: boolean - default(false) - 是否自动播放

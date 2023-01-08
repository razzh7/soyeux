class Soyeux {
  constructor(element, options) {
    this.default = {
      pos: 0,
      speed: 3000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false
    }
    this.options = Object.assign(this.default, options)

    this.sliderWrapper = document.getElementsByClassName('soyeux')[this.default.pos]
    this.slider = document.getElementsByClassName(element)
    this.list = null
    this.listWidth = null
    this.slideWidth = null
    this.slideOffset = null
    this.slideTrack = null
    this.slides = null
    this.slideCount = null
    this.animType = null
    this.autoPlayTimer = null
    this.targetIndex = null
    this.transformsEnabled = null
    this.currentSlide = 0

    this.init()
  }

  init() {
    this.buildOut()
    this.setValues()
    this.getAnimType()
    this.setPosition()
    this.sliderAnimate()
  }

  buildOut() {
    let i
    this.slides = this.arrayLikeToArray(this.sliderWrapper.children)
    this.slideCount = this.slides.length
    this.addFloatClass()
    // 添加占位符元素
    if (this.slideCount % this.options.slidesToScroll !== 0 && this.options.slidesToShow !== 1) {
      const placeholders = Math.abs(
        this.options.slidesToScroll - (this.slideCount % this.options.slidesToScroll)
      )

      for (i = 0; i < placeholders; i++) {
        const div = this.craeteElementAndAddClass('div', 'slide')
        this.sliderWrapper.appendChild(div)
      }

      this.slides = this.arrayLikeToArray(this.sliderWrapper.children)
      this.slideCount = this.slides.length
    }

    this.slideTrack = this.craeteElementAndAddClass('div', 'soyeux-track')
    this.list = this.craeteElementAndAddClass('div', 'soyeux-list')
    this.slides.forEach((slideElement) => {
      this.slideTrack.appendChild(slideElement)
    })

    this.list.appendChild(this.slideTrack)
    this.sliderWrapper.appendChild(this.list)

    // 添加 clone 元素
    if (this.options.infinite === true) {
      let slideIndex = null
      // 前面 clone 元素
      for (i = this.slideCount; i > this.slideCount - this.options.slidesToShow; i--) {
        slideIndex = i - 1
        const cloneElem = this.cloneElementAndAddClass(this.slides[slideIndex], 'clone')
        this.slideTrack.insertBefore(cloneElem, this.slider[0])
      }
      // 后面 clone 元素
      for (i = 0; i < this.options.slidesToShow; i++) {
        slideIndex = i
        const cloneElem = this.cloneElementAndAddClass(this.slides[slideIndex], 'clone')
        this.slideTrack.appendChild(cloneElem)
      }
      // 修改现在的slides
      this.slides = document.getElementsByClassName('soyeux-track')[this.default.pos].children
    }
  }

  addFloatClass() {
    for (let i = 0; i < this.slider.length; i++) {
      const slide = this.slider[i]
      slide.classList.add('slide')
    }
  }

  setValues() {
    this.listWidth = this.getInnerWidth(this.list)
    this.slideWidth = Math.ceil(this.listWidth / this.options.slidesToShow)
  }

  getAnimType() {
    if (document.body.style.MozTransform !== undefined) {
      this.animType = 'MozTransform'
    } else if (document.body.style.webkitTransform !== undefined) {
      this.animType = 'webkitTransform'
    } else if (document.body.style.msTransform !== undefined) {
      this.animType = 'msTransform'
    }

    if (this.animType !== null) {
      this.transformsEnabled = true
    }
  }

  setPosition() {
    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i]
      slide.style.width = this.slideWidth + 'px'
    }
    this.slideTrack.style.width = this.slideWidth * this.slides.length + 'px'
    this.slideOffset = this.slideWidth * this.options.slidesToShow * -1
    const targetLeft = this.slideOffset
    // 设置slideTrack偏移量
    if (this.animType === false) {
      this.slideTrack.style.left = targetLeft + 'px'
    } else {
      this.slideTrack.style[this.animType] = 'translate(' + targetLeft + 'px, 0px)'
    }
  }

  sliderAnimate() {
    if (this.options.autoplay === true) {
      if (this.autoPlayTimer) clearInterval(this.autoPlayTimer)
      this.initEvent()
      this.autoPlayTimer = setInterval(this.autoPlay.bind(this), this.options.speed)
    }
  }

  initEvent() {
    this.slideTrack.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'transform' && this.targetIndex >= this.slideCount) {
        this.currentSlide = 0
        this.targetIndex = null
        this.setAnimation('none', '0s', this.slideOffset)
      }
    })
  }

  autoPlay() {
    let targetLeft

    this.targetIndex = this.currentSlide + this.options.slidesToShow
    this.currentSlide += this.options.slidesToShow
    targetLeft = -this.slideWidth * this.targetIndex + this.slideOffset
    this.setAnimation('transform', '0.3s', targetLeft)
  }

  setAnimation(animateType, animateTime, targetLeft) {
    this.slideTrack.style.transitionProperty = animateType
    this.slideTrack.style.transitionDuration = animateTime
    this.slideTrack.style[this.animType] = 'translate(' + targetLeft + 'px, 0px)'
  }

  arrayLikeToArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike)
  }

  // Dom Operate
  craeteElementAndAddClass(elemName, className) {
    const elem = document.createElement(elemName)
    elem.classList.add(className)

    return elem
  }

  getInnerWidth(elem) {
    const style = window.getComputedStyle(elem)
    const borderLeft = parseInt(style.borderLeft)
    const borderRight = parseInt(style.borderRight)

    return elem.offsetWidth - borderLeft - borderRight
  }

  cloneElementAndAddClass(targetElem, className) {
    const cloneElem = targetElem.cloneNode(true)
    cloneElem.classList.add(className)

    return cloneElem
  }
}

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue：转换的根元素的基准值
      // 正常情况下按照你的设计稿来
      // 750 宽的设计稿，750 / 10 = 75
      // 375 宽的设计稿，375 / 10 = 37.5
      rootValue: 37.5,
      // 需要转换的 CSS 属性，* 就是所有的属性都要转换
      propList: ['*']
    }
  }
}

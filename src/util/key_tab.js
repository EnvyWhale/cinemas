/*
 * @Author: yangxiaosen
 * @Date: 2023-04-14 14:34:00
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 15:28:30
 * @FilePath: \text\src\util\key_tab.js
 */
const TabMixin = {
  created () {
    this.$store.commit('TabHidden')
  },
  destroyed () {
    this.$store.commit('TabShow')
  }
}
export default TabMixin

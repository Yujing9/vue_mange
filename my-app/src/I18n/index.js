// 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)。
import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

// 准备翻译的语言环境信息
const messages = {
    en,
    zh
  }
  
  const getCurrentLanguage = () => {
    // 获取当前浏览器的语言
    const UAlang = navigator.language // zh-CN
    // 判断是否包含zh-CN
    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem('lang', langCode)
    return langCode
  }
// 创建 VueI18n 实例，并为 messages 和 locale 属性赋值
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: getCurrentLanguage() || 'zh',
    messages: messages
  })
  
  export default i18n
  
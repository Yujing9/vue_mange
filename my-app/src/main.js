import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'
import '@/styles/index.scss'
import * as ELIcons from '@element-plus/icons-vue'
import VueI18n from 'vue-i18n'
import i18n from './I18n'
import filters from './utils/filters'


const app = createApp(App)
for (const iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
filters(app)
SvgIcon(app)
app.use(store).use(router).use(VueI18n).use(i18n).mount('#app')

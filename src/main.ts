
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'

dayjs.extend(isoWeek)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

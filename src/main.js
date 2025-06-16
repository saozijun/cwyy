import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Nav from './components/Nav.vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('Nav', Nav)

app.mount('#app')

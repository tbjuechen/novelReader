import './assets/main.css'
import 'tdesign-vue-next/es/style/index.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TDesign from 'tdesign-vue-next';

const app = createApp(App)

app.use(router)
app.use(TDesign);

app.mount('#app')

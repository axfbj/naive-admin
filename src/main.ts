import { createApp } from 'vue'
import App from './App.vue'
import LayoutStore from './components/index'
import './styles/index.css'
import router from './router'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import 'virtual:svg-icons-register'
import { DeviceType } from './types/store'
import './utils/router'
import '../mock'
import pinia from './store/pinia'
import directives from './directive'

function getScreenType() {
  const width = document.body.clientWidth
  if (width <= 768) {
    return DeviceType.MOBILE
  } else if (width < 992 && width > 768) {
    return DeviceType.PAD
  } else if (width < 1200 && width >= 992) {
    return DeviceType.PC
  } else {
    return DeviceType.PC
  }
}

const app = createApp(App)
app.use(directives)
app.use(LayoutStore, {
  state: {
    device: getScreenType(),
  },
  actions: {
    onPersonalCenter() {
      router.push({ path: '/personal', query: { uid: 1 } })
    },
    onLogout() {
      router.replace({ path: '/login', query: { redirect: '/' } }).then(() => {
        window.location.reload()
      })
    },
  },
})
app.use(pinia)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})

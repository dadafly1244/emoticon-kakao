import { createApp, markRaw } from 'vue'
import App from '~/App.vue'
import router from '~/routes'
import '~/routes/guards'
import { createPinia } from 'pinia'
import { useUserStore } from '~/store/user.js'

import BaseCard from '~/components/ui/BaseCard.vue';
import BaseButton from '~/components/ui/BaseButton.vue';
import TheLoader from './components/ui/TheLoader.vue'
import Modal from './components/ui/Modal.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

createApp(App)
  .use(pinia)
  .use(router)
  .component('BaseCard', BaseCard)
  .component('BaseButton', BaseButton)
  .component('TheLoader', TheLoader)
  .component('Modal', Modal)
  .mount('#app')

export const userStore = useUserStore();


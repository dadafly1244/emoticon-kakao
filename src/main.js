import { createApp, markRaw } from 'vue'
import App from '~/App.vue'
import router from '~/routes'
import '~/routes/guards'
import { createPinia } from 'pinia'

import BaseCard from '~/components/ui/BaseCard.vue';
import BaseButton from '~/components/ui/BaseButton.vue';
import TheLoader from './components/ui/TheLoader.vue'


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
  .mount('#app')

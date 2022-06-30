import { createApp, markRaw } from 'vue'
import App from '~/App.vue'
import router from '~/routes'
import '~/routes/guards'
import { createPinia } from 'pinia'

import BaseCard from '~/components/ui/BaseCard.vue';
import BaseButton from '~/components/ui/BaseButton.vue';



const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

createApp(App)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .use(pinia)
  .use(router)
  .mount('#app')

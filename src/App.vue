<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'
import './routes/guards'

export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

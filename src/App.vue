<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script>
import TheHeader from '~/src/components/TheHeader'
import TheFooter from '~/src/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

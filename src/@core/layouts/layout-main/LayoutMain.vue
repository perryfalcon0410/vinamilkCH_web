<template>
  <div>
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from '@core/layouts/components/app-navbar/AppNavbar.vue'

export default {
  components: {
    AppNavbar,
  },
}
</script>

<style>

</style>

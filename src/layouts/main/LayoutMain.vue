<template>
  <layout-main>

    <router-view />

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />
  </layout-main>

</template>

<script>
import LayoutMain from '@core/layouts/layout-main/LayoutMain.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    LayoutMain,
    AppCustomizer,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },
}
</script>

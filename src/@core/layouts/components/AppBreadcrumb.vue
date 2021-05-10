<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col
      class="content-header-left"
      cols="12"
      md="9"
    >
      <b-row class="breadcrumbs-top">
        <div class="breadcrumb-wrapper">
          <b-breadcrumb>
            <b-breadcrumb-item to="/">
              <feather-icon
                icon="HomeIcon"
                size="16"
                class="align-text-top text-brand-1"
              />
            </b-breadcrumb-item>
            <b-breadcrumb-item
              v-for="item in $route.meta.breadcrumb"
              :key="item.text"
              :active="item.active"
              :to="item.to"
            >
              {{ item.text }}
            </b-breadcrumb-item>
          </b-breadcrumb>
        </div>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>

import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
}
</script>

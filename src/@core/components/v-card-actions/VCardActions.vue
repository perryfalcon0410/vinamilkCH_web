<template>
  <div class="v-card bg-white rounded shadow">
    <!-- START - Title -->
    <b-col>
      <b-row
        v-b-toggle.collapseDelivery
        class="v-card-header text-primary mx-0"
        :class="{ rotate: visible }"
        align-v="center"
        align-h="between"
      >
        <strong class="text-blue-vinamilk">{{ title }}</strong>

        <b-icon-chevron-down
          scale="1.1"
          color="text-blue-vinamilk"
        />
      </b-row>
    </b-col>
    <!-- END - Title -->

    <!-- START - Body -->
    <b-collapse
      id="collapseDelivery"
      v-model="visible"
      class="border-top"
    >
      <b-col>
        <b-form-row
          class="mx-0 py-1"
        >
          <!-- START - Content -->
          <slot />
        <!-- END - Content -->
        </b-form-row>
      </b-col>
    </b-collapse>
    <!-- END - Body -->

  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      requried: true,
      default: 'Tiêu dề',
    },
  },
  data() {
    return {
      visible: true,
    }
  },
}
</script>
<style lang="scss" scoped>
  .v-card-header{
    padding: 5px 0;

    &.rotate {
      svg {
        transform: rotate(-180deg);
          }
    }
  }
</style>

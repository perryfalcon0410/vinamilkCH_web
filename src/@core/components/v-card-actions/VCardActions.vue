<template>
  <div class="v-card bg-white rounded shadow">
    <!-- START - Title -->
    <b-col>
      <b-row
        class="v-card-header text-primary mx-0"
        :class="{ rotate: visible, 'cursor-pointer': canCollapse }"
        align-v="center"
        align-h="between"
        @click="onCollapseClick()"
      >
        <strong class="text-brand-1">{{ title }}</strong>

        <b-icon-chevron-down
          v-if="canCollapse"
          scale="1.1"
          class="text-brand-1"
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
      <b-form-row
        class="px-1"
        style="padding: 10px 0"
      >
        <!-- START - Content -->
        <slot />
        <!-- END - Content -->
      </b-form-row>
    </b-collapse>
    <!-- END - Body -->

  </div>
</template>
<script>
export default {
  props: {
    // title of component
    title: {
      type: String,
      requried: true,
      default: 'Tiêu dề',
    },
    // can or can't collapse component
    canCollapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: true,
    }
  },
  methods: {
    onCollapseClick() {
      if (this.canCollapse) {
        this.visible = !this.visible
      }
    },
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

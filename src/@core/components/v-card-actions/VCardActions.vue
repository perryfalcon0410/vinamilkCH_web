<template>
  <div class="v-card bg-white rounded shadow d-print-none">
    <!-- START - Title -->
    <b-col>
      <b-row
        class="v-card-header text-primary mx-0"
        :class="{ rotate: visible, 'rotate-down': !visible, 'cursor-pointer': canCollapse }"
        align-v="center"
        align-h="between"
        @click="onCollapseClick()"
      >
        <strong class="text-brand-1">{{ title }}</strong>

        <b-icon-chevron-up
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
      default: 'Tìm kiếm',
    },
    // can or can't collapse component
    canCollapse: {
      type: Boolean,
      default: true,
    },
    expandDefault: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: this.expandDefault,
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
        transition: all 0.5s;
        transform: rotate(180deg);
      }
    }
    &.rotate-down {
      svg {
      transition: all 0.5s;
      }
    }
  }
</style>

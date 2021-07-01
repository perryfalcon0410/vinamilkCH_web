<template>
  <b-icon-bricks
    v-b-popover.hover="{content: popoverContent, placement: popoverPosition}"
    scale="1.3"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    popoverPosition: {
      type: String,
      default: null,
    },
    popoverContent: {
      type: String,
      default: 'Thao tác',
    },
  },
}
</script>

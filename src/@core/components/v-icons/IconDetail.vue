<template>
  <b-icon-eye-fill
    v-b-popover.hover="{content: popoverContent, placement: popoverPosition}"
    class="cursor-pointer text-brand-1"
    scale="1.2"
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
      default: 'Xem chi tiết',
    },
  },
}
</script>

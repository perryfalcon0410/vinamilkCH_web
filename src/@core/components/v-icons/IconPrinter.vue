<template>
  <b-icon-printer-fill
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
      default: 'top',
    },
    popoverContent: {
      type: String,
      default: 'In phiếu',
    },
  },
}
</script>

<template>
  <b-icon-pencil-fill
    v-b-popover.hover="{content: popoverContent, placement: popoverPosition}"
    class="cursor-pointer"
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
      default: 'Chình sửa',
    },
  },
}
</script>

<template>
  <b-icon-trash-fill
    v-b-popover.hover="{content: popoverContent, placement: popoverPosition}"
    class="cursor-pointer"
    color="red"
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
      default: 'Xóa',
    },
  },
}
</script>

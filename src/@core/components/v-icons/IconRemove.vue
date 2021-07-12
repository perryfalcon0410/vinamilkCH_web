<template>
  <b-icon-trash-fill
    v-b-popover.hover="{content: popoverContent, placement: popoverPosition}"
    :class="['cursor-pointer', {'icon-disabled': disabled}]"
    color="red"
    scale="1.2"
    @click="clickEvent"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickEvent(e) {
      if (this.disabled) {
        return e.preventDefault()
      }
      return this.$emit('click')
    },
  },
}
</script>

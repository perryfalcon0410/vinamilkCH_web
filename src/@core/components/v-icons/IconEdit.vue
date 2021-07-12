<template>
  <b-icon-pencil-fill
    v-b-popover.hover="{content: popoverContent, placement: popoverPosition}"
    :class="['cursor-pointer', {'icon-disabled': disabled}]"
    scale="1.2"
    @click="clickEvent"
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

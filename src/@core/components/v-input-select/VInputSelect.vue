<template>
  <b-container
    fluid
    class="vis_container p-0"
  >
    <div :class="titleClass">
      {{ title }}
    </div>
    <b-input-group
      class="input-group-merge"
      size="sm"
      @click="onInputClick()"
    >
      <b-input
        ref="input"
        v-model="selection"
        class="vis_input cursor-pointer"
        :class="{'vis_input_disable': !typeAble, inputClass}"
        :placeholder="placeholder"
        :size="size"
        autocomplete="off"
        @keypress="disableKeypress"
        @focus="isCollapse = true"
        @blur="isCollapse = false"
        @change="onInputChange"
      />
      <b-input-group-append
        is-text
      >
        <b-icon-x
          v-if="clearAble && !$isEmpty(selection)"
          scale="1.3"
          class="cursor-pointer"
          style="margin-right: 5px;"
          @click="onDeleteButtonClick()"
        />
        <b-icon-chevron-down v-if="!isCollapse" />
        <b-icon-chevron-up v-if="isCollapse" />
      </b-input-group-append>
    </b-input-group>

    <!-- START - Popup -->
    <b-collapse
      v-model="isCollapse"
      class="position-absolute w-100"
      style="zIndex:1"
    >
      <b-container
        class="my-1 p-0 bg-white rounded shadow-lg"
      >
        <b-row
          v-for="(item,index) in matches"
          :key="index"
          class="vis_dropdown_item mx-0 cursor-pointer"
          :class="suggestionsClass"
          @click="suggestionClick(index)"
        >
          <!-- START - Label -->
          <b-col class="py-1">
            {{ item.name }}
          </b-col>
          <!-- END - Label -->
        </b-row>
      </b-container>
    </b-collapse>
    <!-- END - Popup -->
  </b-container>
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      required: true,
      default: () => ['Không có dữ liệu'],
    },
    selection: {
      type: Object,
      required: true,
      twoWay: true,
    },
    title: {
      type: String,
      require: true,
      default: 'Tiêu đề',
    },
    placeholder: {
      type: String,
      default: 'Mặc định',
    },
    size: {
      type: String,
      default: 'md',
    },
    titleClass: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    suggestionsClass: {
      type: String,
      default: '',
    },
    typeAble: {
      type: Boolean,
      default: false,
    },
    filterAble: {
      type: Boolean,
      default: false,
    },
    clearAble: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isCollapse: false,
    }
  },

  computed: {
    matches() {
      if (this.selection !== null && this.selection !== undefined && this.filterAble) {
        return this.suggestions.filter(item => item.name.toLowerCase().indexOf(this.selection.toLowerCase()) > -1)
      }
      return this.suggestions
    },
  },

  methods: {
    // When the user changes input
    onInputChange() {
      if (this.isCollapse === false) {
        this.isCollapse = true
      }
    },

    // prevent type in input field
    disableKeypress(e) {
      if (!this.typeAble) {
        e.preventDefault()
      }
    },

    // When one of the suggestion is clicked
    suggestionClick(index) {
      this.$emit('updateSelection', this.matches[index])
      this.isCollapse = false
    },

    onDeleteButtonClick() {
      if (this.selection !== '') {
        this.$emit('updateSelection', { name: null, id: null })
        this.$refs.input.focus()
      }
    },

    onInputClick() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/style.scss';

  .vis_container{
    .vis_dropdown_item:hover {
      background: #E4E6F0;
      color: $color-brand;
      border-radius: 5px;
    }
    .vis_input_disable:focus {
    color: transparent;
    text-shadow: 0px 0px 0px #666;
  }
  }
</style>

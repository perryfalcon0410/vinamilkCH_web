<template>
  <b-container
    fluid
    class="vis_container p-0"
  >
    <div :class="titleClass">
      {{ title }} <sup
        v-if="isRequire"
        class="text-danger"
      >*</sup>
    </div>
    <b-input-group
      class="input-group-merge cursor-pointer"
      :size="size"
    >
      <b-input
        ref="input"
        v-model="dataInput"
        class="vis_input"
        :class="{'vis_input_disable': !typeAble, 'cursor-pointer': !typeAble, inputClass}"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? 'on' : 'off'"
        @keypress="disableKeypress"
        @focus="isCollapse = true"
        @blur="isCollapse = false"
      />
      <b-input-group-append
        is-text
      >
        <b-icon-x
          v-show="clearAble && !$isEmpty(dataInput)"
          scale="1.3"
          style="margin-right: 5px;"
          @click="onDeleteButtonClick()"
        />
        <b-icon-chevron-down
          v-show="!isCollapse"
          @click="onIconChervonDownClick()"
        />
        <b-icon-chevron-up
          v-show="isCollapse"
          @click="onIconChervonUpClick()"
        />
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
        fluid
      >
        <b-row
          v-for="(item,index) in matches"
          :key="index"
          class="vis_dropdown_item mx-0 cursor-pointer"
          :class="suggestionsClass"
          @click="suggestionClick(index)"
        >
          <!-- START - Label -->
          <!-- <div v-if="isListEmpty(item)">
            Không có dữ liệu
          </div> -->
          <b-col
            class="py-1"
          >
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
    // Data list to show like popup
    suggestions: {
      type: Array,
      required: true,
      default: () => [{ name: 'Không có dữ liệu', id: null }],
    },
    // Value input for input field
    dataInput: {
      type: Object,
      required: true,
    },
    // Title for input field
    title: {
      type: String,
      default: 'Tiêu đề',
    },
    // Placeholder for input field
    placeholder: {
      type: String,
      default: 'Nhập . . .',
    },
    // size for input field (sm,md,lg)
    size: {
      type: String,
      default: 'md',
    },
    // class for title of input field
    titleClass: {
      type: String,
      default: '',
    },
    // class for input field
    inputClass: {
      type: String,
      default: '',
    },
    // class for suggestions field
    suggestionsClass: {
      type: String,
      default: '',
    },
    // Can be type in the input field
    typeAble: {
      type: Boolean,
      default: false,
    },
    // Can be filter in the input field
    filterAble: {
      type: Boolean,
      default: false,
    },
    // X button
    clearAble: {
      type: Boolean,
      default: false,
    },
    // Auto complete data
    autocomplete: {
      type: Boolean,
      default: false,
    },
    // Require field
    isRequire: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isCollapse: false,
      isInputClick: false,
    }
  },

  computed: {
    matches() {
      if (this.dataInput !== null && this.dataInput !== undefined && this.filterAble) {
        return this.suggestions.filter(item => item.name.toLowerCase().indexOf(this.dataInput.toLowerCase()) > -1)
      }
      return this.suggestions
    },
  },

  methods: {
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
      if (this.dataInput !== '') {
        this.$emit('updateSelection', { name: null, id: null })
      }
    },

    onIconChervonDownClick() {
      this.$refs.input.focus()
    },

    onIconChervonUpClick() {
      this.$refs.input.blur()
    },

    // isListEmpty(value) {
    //   console.log(value)
    //   console.log(this.$isEmpty(value))
    //   return this.$isEmpty(value)
    // },
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/style.scss';
  .vis_container{
    .vis_dropdown_item:hover {
      background: #E4E6F0;
      color: $color-brand-1;
      border-radius: 5px;
    }
    .vis_input_disable:focus {
    color: transparent;
    text-shadow: 0px 0px 0px #666;
  }
  }
</style>

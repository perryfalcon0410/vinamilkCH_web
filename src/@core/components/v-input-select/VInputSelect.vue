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
      class="vis_input_group input-group-merge"
      :class="{'cursor-pointer': !disabled}"
      :size="size"
    >
      <b-input
        ref="input"
        v-model="dataInput"
        class="vis_input text-brand-3"
        :disabled="disabled"
        :class="[{'vis_input_disable': !typeAble, 'cursor-pointer': !typeAble && !disabled}, inputClass]"
        :placeholder="currentResults.name ? currentResults.name : placeholder"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :state="state"
        :maxlength="maxlength"
        @keydown="preventType"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <b-input-group-append>
        <b-input-group-text :class="{'vis_input_group_disable': disabled}">
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
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>

    <!-- START - Popup -->
    <b-collapse
      v-model="isCollapse"
      class="position-absolute my-1 p-0 bg-white rounded shadow-lg"
      style="zIndex:1000; width:95%;"
    >
      <div
        v-if="isListEmpty(suggestions)"
        class="p-1 text-center text-brand-3"
      >
        {{ noOptions }}
      </div>

      <b-row
        v-for="(item) in matches"
        :key="item.id"
        class="vis_dropdown_item mx-0 cursor-pointer text-brand-3"
        :class="suggestionsClass"
        @click="suggestionClick(item.id)"
      >
        <!-- START - Label -->
        <b-col
          class="py-1"
        >
          {{ item.name }}
        </b-col>
        <!-- END - Label -->
      </b-row>
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
    },
    // Value input for input field
    dataInput: {
      type: String,
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
    // Disabled field
    disabled: {
      type: Boolean,
      default: false,
    },
    // state validate
    state: {
      type: Boolean,
      default: null,
    },
    // maxlength validate
    maxlength: {
      type: Number,
      default: null,
    },
    // content for no options
    noOptions: {
      type: String,
      default: 'Không có dữ liệu',
    },
  },

  data() {
    return {
      isCollapse: false,
      isFocus: false,
      currentResults: { name: null, id: null },
    }
  },

  computed: {
    matches() {
      if (this.dataInput !== null && this.dataInput !== undefined && this.typeAble && this.isFocus) {
        return this.suggestions.filter(item => item.name.toLowerCase().indexOf(this.dataInput.toLowerCase()) !== -1)
      }
      return this.suggestions
    },
  },

  watch: {
    isFocus() {
      if (this.isFocus) {
        this.isCollapse = true

        if (this.typeAble) {
          this.dataInput = null
        }
      } else {
        this.isCollapse = false

        if (this.currentResults && this.typeAble) {
          this.dataInput = this.suggestions.find(item => item.id === this.currentResults.id).name
          // this.dataInput = this.currentResults.name
        }
      }
    },
  },

  methods: {
    // prevent input
    preventType(e) {
      if (!this.typeAble) {
        e.preventDefault()
      }
    },

    // When one of the suggestion is clicked
    suggestionClick(id) {
      this.currentResults = this.suggestions.find(item => item.id === id)
      this.updateSelection(this.suggestions.find(item => item.id === id))
    },

    updateSelection(data) {
      this.$emit('updateSelection', data)
    },

    onDeleteButtonClick() {
      if (this.dataInput !== '') {
        this.currentResults = { name: null, id: null }
        this.updateSelection({ name: null, id: null })
      }
    },

    onIconChervonDownClick() {
      this.$refs.input.focus()
    },

    onIconChervonUpClick() {
      this.$refs.input.blur()
    },

    isListEmpty(value) {
      return value.length === 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
    // .collapsing {
    //   transition: none !important;
    // }

  .vis_container{
    .vis_dropdown_item:hover {
      background: #E4E6F0;
      color: $brand-1;
      border-radius: 5px;
    }
    .vis_input_disable:focus {
      color: transparent;
      text-shadow: 0px 0px 0px #666;
    }
    .vis_input_group_disable {
      background: #EFEFEF;
    }
  }
</style>

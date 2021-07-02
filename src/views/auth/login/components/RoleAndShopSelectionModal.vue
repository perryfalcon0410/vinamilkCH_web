<template>
  <b-modal
    id="roleAndShopModal"
    title="Chọn vai trò và cửa hàng thao tác"
    title-class="text-brand-1 font-weight-bolder"
    :visible="visible"
  >
    <b-form>
      <div
        class="mt-1"
      >
        Vai trò <sup class="text-danger">*</sup>
      </div>
      <tree-select
        v-model="roleSelected"
        :options="roleOptions"
        :searchable="false"
        placeholder="Chọn vai trò"
        no-options-text="Không có dữ liệu"
      />

      <div
        class="mt-1"
      >
        Cửa hàng <sup class="text-danger">*</sup>
      </div>
      <tree-select
        v-model="shopSelected"
        :options="shopOptions"
        :searchable="false"
        placeholder="Chọn cửa hàng"
        no-options-text="Vui lòng chọn vai trò trước"
      />
    </b-form>

    <template #modal-footer="{ cancel }">
      <b-button
        variant="someThing"
        class="btn-brand-1 aligns-items-button-center"
        :disabled="isOkButtonDisabled"
        @click="login()"
      >
        Đồng ý
      </b-button>
      <b-button
        class="aligns-items-button-center"
        @click="cancel"
      >
        Đóng
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      roleSelected: null,
      shopSelected: null,
    }
  },
  computed: {
    isOkButtonDisabled() {
      return !this.roleSelected || !this.shopSelected
    },
    roleOptions() {
      return this.roles.map(e => ({
        label: e.roleName,
        id: e.id,
      }))
    },
    shopOptions() {
      if (this.roleSelected) {
        const roleFound = this.roles.find(item => item.id === this.roleSelected)

        if (roleFound) {
          return roleFound.shops.map(e => ({
            label: e.shopName,
            id: e.id,
          }))
        }
      }

      return []
    },
    getFirstShop() {
      if (this.roleSelected) {
        const roleFound = this.roles.find(item => item.id === this.roleSelected)
        if (roleFound) {
          return roleFound.shops[0].id
        }
      }
      return null
    },
  },

  watch: {
    roleSelected() {
      this.shopSelected = this.getFirstShop
    },
  },

  mounted() {
    // START - Listen modal toggle
    this.$root.$on('bv::modal::hide', () => {
      this.roleSelected = null
      this.shopSelected = null
    })
    // END - Listen modal toggle
  },

  methods: {
    login() {
      this.$emit('login', {
        roleSelected: this.roleSelected,
        shopSelected: this.shopSelected,
      })
    },
  },
}
</script>

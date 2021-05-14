<template>
  <b-modal
    title="Chọn vai trò và cửa hàng thao tác"
    title-class="text-brand-1 font-weight-bolder"
    :visible="visible"
  >
    <b-form>
      <div
        class="mt-1"
      >
        Vai trò
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
        Cửa hàng
      </div>
      <tree-select
        v-model="shopSelected"
        :options="shopOptions"
        :searchable="false"
        placeholder="Chọn cửa hàng"
        no-options-text="Vui lòng chọn vai trò trước"
      />
    </b-form>

    <template #modal-footer>
      <b-button
        variant="someThing"
        class="btn-brand-1 aligns-items-button-center"
        :disabled="okButtonDisable"
        @click="login()"
      >
        Đồng ý
      </b-button>
      <b-button
        class="aligns-items-button-center"
        @click="onModalHidden"
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
      shops: [],

      roleSelected: null,
      shopSelected: null,
    }
  },
  computed: {
    okButtonDisable() {
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

  methods: {
    onModalHidden() {
      this.$emit('onModalHidden')
    },

    login() {
      this.$emit('login', {
        roleSelected: this.roleSelected,
        shopSelected: this.shopSelected,
      })
    },
  },
}
</script>

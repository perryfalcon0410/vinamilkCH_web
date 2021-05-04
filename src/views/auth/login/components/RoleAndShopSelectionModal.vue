<template>
  <b-modal
    title="Chọn vai trò và cửa hàng thao tác"
    ok-title="Đồng ý"
    cancel-title="Đóng"
    :ok-disabled="okButtonDisable"
    cancel-variant="outline-secondary"
    :visible="visible"
    @hidden="onModalHidden"
    @ok="login"
  >
    <b-form>
      <v-input-select
        title="Vai trò"
        :suggestions="roleDatasource"
        :data-input="roleSelected.name"
        placeholder="Chọn vai trò"
        title-class="h7"
        input-class="h9"
        suggestions-class="h9"
        clear-able
        is-require
        @updateSelection="roleSelected = $event"
      />
      <v-input-select
        title="Cửa hàng"
        :suggestions="shopDatasource"
        :data-input="shopSelected.name"
        placeholder="Chọn cửa hàng"
        title-class="h7 mt-1"
        input-class="h8"
        suggestions-class="h8"
        clear-able
        is-require
        @updateSelection="shopSelected = $event"
      />
    </b-form>
  </b-modal>
</template>

<script>
import {
  VBModal,
} from 'bootstrap-vue'
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    VInputSelect,
  },
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

      roleSelected: { id: null, name: null },
      shopSelected: { id: null, name: null },
    }
  },
  computed: {
    okButtonDisable() {
      return !this.roleSelected || !this.shopSelected
    },
    roleDatasource() {
      return this.roles.map(e => ({
        name: e.roleName,
        id: e.id,
      }))
    },
    shopDatasource() {
      if (this.roleSelected) {
        const roleFound = this.roles.find(item => item.id === this.roleSelected.id)

        if (roleFound) {
          return roleFound.shops.map(e => ({
            name: e.shopName,
            id: e.id,
          }))
        }
      }

      return []
    },

    getFirstShop() {
      if (this.roleSelected) {
        const roleFound = this.roles.find(item => item.id === this.roleSelected.id)

        if (roleFound) {
          return roleFound.shops[0]
        }
      }
      return { id: null, shopName: null }
    },
  },

  watch: {
    roleSelected() {
      this.shopSelected = { id: this.getFirstShop.id, name: this.getFirstShop.shopName }
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

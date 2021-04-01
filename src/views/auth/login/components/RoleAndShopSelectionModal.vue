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
      <b-form-group
        label="Vai trò"
        label-for="role-select"
      >
        <v-select
          id="role-select"
          v-model="roleSelected"
          placeholder="Chọn vai trò"
          :options="roleDatasource"
        />
      </b-form-group>
      <b-form-group
        label="Cửa hàng"
        label-for="shop-select"
      >
        <v-select
          id="shop-select"
          v-model="shopSelected"
          placeholder="Chọn cửa hàng"
          :options="shopDatasource"
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal, VBModal, BForm, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    vSelect,
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
    shops: {
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
    okButtonDisable() {
      return !this.roleSelected || !this.shopSelected
    },
    roleDatasource() {
      return this.roles.map(e => ({
        label: e.role,
        value: e.id,
      }))
    },
    shopDatasource() {
      return this.shops.map(e => ({
        label: e.shopName,
        value: e.shopId,
      }))
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

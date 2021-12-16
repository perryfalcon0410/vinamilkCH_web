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
      <!-- <tree-select
        v-model="roleSelected"
        :options="roleOptions"
        :searchable="false"
        placeholder="Chọn vai trò"
        no-options-text="Không có dữ liệu"
      /> -->

      <vue-autosuggest
        ref="searchCombo"
        v-model="roleKeyword"
        :suggestions="listRole"
        :input-props="{
          id:'autosuggest__input',
          class:'form-control w-100',
          placeholder:'Nhập vai trò'
        }"
        @input="loadRoles"
        @selected="onSelectedRole"
      >
        <template slot-scope="{ suggestion }">
          <div class="cursor-pointer">
            <b>{{ suggestion.item.roleName }}</b>
          </div>
        </template>
      </vue-autosuggest>

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

    <template #modal-footer="{}">
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
        @click="cancel()"
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
import { VueAutosuggest } from 'vue-autosuggest'

export default {
  components: {
    VueAutosuggest,
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
      roleSelected: null,
      shopSelected: null,
      listRole: [{ data: '' }],
      roleKeyword: '',
    }
  },

  computed: {
    isOkButtonDisabled() {
      return !this.roleSelected || !this.shopSelected
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
    // roles: {
    //   handler() {
    //     console.log(this.roles)
    //     const roleFilter = this.roles.filter(role => role.roleName.trim() === this.roleSelected.trim())
    //     this.listRole = [{
    //       data: roleFilter,
    //     }]
    //   },
    //   deep: true,
    // },
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
    loadRoles() {
      if (this.roles.length > 0) {
        let roleFilter = this.roles.filter(r => r.roleName.toLowerCase().includes(this.roleKeyword.trim().toLowerCase()))
        roleFilter = roleFilter.map(role => ({
          ...role,
          name: this.roleKeyword,
        }))
        this.listRole = [{
          data: roleFilter,
        }]

        if (this.listRole[0].data) {
          this.$nextTick(() => document.getElementById('autosuggest__input').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })))
        }
      }
    },

    onSelectedRole(index) {
      if (index.item) {
        this.roleSelected = index.item.id
        this.roleKeyword = index.item.roleName
        this.listRole = [{ data: '' }]
      }
    },

    cancel() {
      this.roleSelected = null
      this.shopSelected = null
      this.listRole = [{ data: '' }]
      this.roleKeyword = ''
      this.$bvModal.hide('roleAndShopModal')
    },
  },
}
</script>

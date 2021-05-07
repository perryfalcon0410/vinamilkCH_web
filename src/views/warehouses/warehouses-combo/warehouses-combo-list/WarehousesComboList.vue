<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <warehouses-comboList-search />
    <!-- END - Search -->

    <!-- START - Customer list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách giao dịch nhập xuất combo
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="navigateToCreate"
          >
            <b-icon-plus
              scale="2"
              class="mr-05"
            />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="warehousesComboLists"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
        >
          >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
              />
            </div>

            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                v-b-popover.hover="'Chi tiết'"
                class="cursor-pointer"
                @click="navigateToUpdate()"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Customer list -->
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
import { getWarehousesStatuslabel } from '@core/utils/utils'
import WarehousesComboListSearch from './components/WarehousesComboListSearch.vue'
import {
  WAREHOUSES_COMBO,

  // GETTERS
  WAREHOUSES_COMBO_GETTER,

  // ACTIONS
  GET_WAREHOUSES_COMBO_ACTIONS,

} from '../store-module/type'

export default {
  components: {
    WarehousesComboListSearch,
  },
  data() {
    return {
      columns: [
        {
          label: 'Ngày',
          field: 'transDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã giao dịch',
          field: 'transCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'totalQuantity',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'totalAmount',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Loại giao dịch',
          field: 'transType',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Chức năng',
          field: 'feature',
          sortable: false,
          width: '30px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },
  computed: {
    warehousesComboLists() {
      return this.WAREHOUSES_COMBO_GETTER().map(data => ({
        transDate: formatDateToLocale(data.transDate),
        transCode: data.transCode,
        totalQuantity: data.totalQuantity,
        totalAmount: data.totalAmount,
        transType: getWarehousesStatuslabel(data.transType),
      }))
    },
  },
  mounted() {
    this.GET_WAREHOUSES_COMBO_ACTIONS({ formId: 5, ctrlId: 7 })
  },

  methods: {
    ...mapGetters(WAREHOUSES_COMBO, [
      WAREHOUSES_COMBO_GETTER,
    ]),
    ...mapActions(WAREHOUSES_COMBO, [
      GET_WAREHOUSES_COMBO_ACTIONS,
    ]),
  },
}
</script>

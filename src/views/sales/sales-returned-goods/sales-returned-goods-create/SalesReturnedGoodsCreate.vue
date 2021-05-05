<template>
  <b-container
    fluid
    class="px-0 mt-2"
  >
    <b-row class="px-3">
      <b-icon-arrow-left
        class="mr-4"
        @click="onBack"
      />
      <label>Tạo phiếu trả hàng</label>
    </b-row>
    <b-row class="mt-2">

      <!-- Start Container Left -->
      <b-col
        md
        lg="6"
        xl="3"
        class="bg-white shadow rounded mx-2 pb-3"
      >
        <b-col>
          <b-row class="my-2">
            <b-col>
              <b-card-text>
                Ngày trả hàng
              </b-card-text>
            </b-col>
            <b-col>
              <b-card-text class="font-weight-bold">
                {{ billInfo.dateReturn }}
              </b-card-text>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col>
              <b-card-text>
                Đơn hàng muốn trả
              </b-card-text>
            </b-col>
            <b-col>
              <b-card-text class="font-weight-bold">
                {{ billInfo.oderNumber }}
              </b-card-text>
            </b-col>
          </b-row>
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="billInfo.oderNumber"
              readonly
            />
            <b-input-group-append
              class="cursor-pointer"
              is-text
              @click="showSelectReceptModal()"
            >
              <b-icon-three-dots-vertical />
            </b-input-group-append>
          </b-input-group>

          <!-- Start List Item -->
          <b-list-group v-if="billInfo.id !== ''">
            <b-list-group-item
              variant="secondary"
            >
              Ngày mua hàng
              <span class="font-weight-bold">
                {{ `: ${billInfo.oderDate}` }}
              </span>
            </b-list-group-item>
            <b-list-group-item
              variant="secondary"
            >
              Nhân viên bán hàng
              <span class="font-weight-bold">
                {{ `: ${billInfo.employeeName}` }}
              </span>
            </b-list-group-item>
            <b-list-group-item
              variant="secondary"
            >
              Khách hàng
              <span class="font-weight-bold">
                {{ `: ${billInfo.customerName}` }}
              </span>
            </b-list-group-item>
            <b-list-group-item
              variant="secondary"
            >
              Tiền trả lại
              <span class="font-weight-bold">
                {{ `: ${billInfo.moneyPayback}` }}
              </span>
            </b-list-group-item>
          </b-list-group>
          <!-- End List Item -->

          <b-form-row>
            <b-col
              cols="6"
              class="mt-1"
              align-self="start"
            >
              <b-form-group
                label="Lý do trả hàng"
              >
                <b-form-select
                  v-model="selectedReason"
                  :options="reasonReturn"
                  class="form-control"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col
              align-self="start"
            >
              <b-form-group
                v-model="reasonDescription"
                label="Thông tin phản hồi"
              >
                <b-form-textarea />
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-col>
      </b-col>
      <!-- Start Container Left -->

      <!-- Start Container Right -->
      <b-col
        class="bg-white shadow rounded"
      >
        <!-- Start Tab -->
        <b-tabs>
          <b-tab
            title="Sản phẩm"
            active
          >
            <!-- Start Table -->
            <vue-good-table
              :columns="columns"
              :rows="products"
              class="pb-1"
              style-class="vgt-table striped"
              :pagination-options="{
                enabled: true
              }"
              line-numbers
              :search-options="{
                enabled: true,
                externalQuery: searchTerm
              }"
            >
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
            </vue-good-table>
            <!-- End table -->
          </b-tab>
          <b-tab
            title="Hàng khuyến mãi"
          >
            <vue-good-table
              :columns="columns"
              :rows="promotions"
              class="pb-1"
              style-class="vgt-table striped"
              :pagination-options="{
                enabled: true
              }"
              line-numbers
              :search-options="{
                enabled: true,
                externalQuery: searchTerm
              }"
            >
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
            </vue-good-table>
          </b-tab>
        </b-tabs>
        <!-- End Tab -->

        <!-- Start Button -->
        <b-row class="px-3 mt-4 mb-2 d-flex justify-content-end">
          <b-button
            variant="primary"
            class="mr-2"
            @click="onSubmit"
          >
            <b-icon-arrow90deg-left />
            TRẢ HÀNG
          </b-button>
          <b-button>
            <b-icon-x />
            ĐÓNG
          </b-button>
        </b-row>
        <!-- End button -->

      </b-col>
      <!-- End Container Right -->
    </b-row>
    <!-- START - Modal -->
    <select-recept-modal
      :visible="isShowSelectReceptModal"
      @choosenRecept="choosenRecept"
      @onCloseModal="onCloseModal"
    />
    <!-- END - Modal -->
  </b-container>
</template>

<script>

import { getDateNow } from '@/@core/utils/utils'
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
import SelectReceptModal from './components/SelectReceptModal.vue'
import {
  RETURNEDGOODS, RETURNED_GOOD_CHOOSEN_DETAIL_GETTER, GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION, CREATE_RETURNED_GOOD_ACTION, CLEAR_RETURNED_GOODS_DATA,
} from '../store-module/type'

export default {
  components: {
    SelectReceptModal,
  },
  data() {
    return {
      isShowSelectReceptModal: false,
      selectedReason: '',
      billInfo: {
        id: '',
        oderDate: '',
        employeeName: '',
        customerName: '',
        moneyPayback: '',
        oderNumber: '',
        dateReturn: getDateNow(),
        reasonDescription: '',
      },
      searchTerm: '',
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
        },
        {
          label: 'Giá bán',
          field: 'pricePerUnit',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'totalPrice',
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          sortable: false,
        },
        {
          label: 'Tiền trả lại',
          field: 'payment',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    products() {
      return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER().products.map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        unit: data.unit,
        quantity: data.quantity,
        pricePerUnit: data.pricePerUnit,
        totalPrice: data.totalPrice,
        discount: data.discount,
        payment: data.payment,
        note: data.note,
      }))
    },
    promotions() {
      return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER().promotions.map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        unit: data.unit,
        quantity: data.quantity,
        pricePerUnit: data.pricePerUnit,
        totalPrice: data.totalPrice,
        discount: data.discount,
        payment: data.payment,
        note: data.note,
      }))
    },
    reasonReturn() {
      return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER().reasonReturn.map(data => ({
        value: data.apCode,
        text: data.apName,
      }))
    },
  },
  watch: {
    reasonReturn() {
      this.selectedReason = this.reasonReturn[0].value || ''
    },
  },
  destroyed() {
    this.CLEAR_RETURNED_GOODS_DATA()
  },
  methods: {
    onBack() {
      this.$router.back()
    },
    onClick: {
    },
    showSelectReceptModal() {
      this.isShowSelectReceptModal = true
    },
    onCloseModal() {
      this.isShowSelectReceptModal = false
    },
    choosenRecept(data) {
      const {
        oderDate, id, orderNumber, customerName, total, salesManName,
      } = data.value

      this.GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION({
        id,
      })

      this.billInfo.oderDate = oderDate
      this.billInfo.id = id
      this.billInfo.employeeName = salesManName
      this.billInfo.customerName = customerName
      this.billInfo.moneyPayback = total
      this.billInfo.oderNumber = orderNumber
    },
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOOD_CHOOSEN_DETAIL_GETTER,
    ]),
    ...mapMutations(RETURNEDGOODS, [
      CLEAR_RETURNED_GOODS_DATA,
    ]),
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION,
      CREATE_RETURNED_GOOD_ACTION,
    ]),
    onSubmit() {
      if (this.billInfo.oderNumber === '') {
        toasts.error('Xin vui lòng chọn đơn hàng muốn trả!')
        return
      }

      this.CREATE_RETURNED_GOOD_ACTION({
        dateReturn: new Date(),
        orderNumber: this.billInfo.oderNumber,
        reasonId: this.selectedReason,
        reasonDescription: this.billInfo.oderNumber,
        createUser: localStorage.getItem('username') || '',
      })
    },
  },
}
</script>

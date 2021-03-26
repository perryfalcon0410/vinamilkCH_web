<template>
  <!-- POPUP Pay The BIll START -->
  <b-modal
    id="modal-center"
    size="xl"
    centered
    title="Thanh toán hóa đơn"
    :visible="visible"
    hide-footer
  >
    <!-- Start Container -->
    <b-row>
      <!-- Start Container Left -->
      <b-col>
        <b-row class="bg-info w-25 my-2 rounded-right">
          <div>
            <b-img
              src="../../assets/images/logo/logo.png"
              width="50"
              height="50"
              fluid
            />
          </div>
          <h2>
            Khuyến mãi
          </h2>
        </b-row>

        <!-- STart Promotion 1 -->
        <b-button
          block
          variant="secondary"
          class="d-flex"
          @click="onShowPromotion"
        >
          Khuyến mãi ADM tháng 11.2020
          <b-icon-chevron-down class="ml-auto" />
        </b-button>
        <div
          v-show="ShowPromotion"
          class="border-secondary"
        >
          <vue-good-table
            :columns="columns"
            :rows="rows"
            line-numbers
            :search-options="{
              enabled: true,
              externalQuery: searchTerm
            }"
          >
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div
                v-if="props.column.label === 'Chức năng'"
              />
              <div v-else>
                {{ props.column.label }}
              </div>
            </template>

            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'Press'">
                <b-button
                  variant="secondary"
                  @click="onPress"
                >
                  <b-icon-hand-index-thumb />
                  CHỌN ĐƠN
                </b-button>
              </div>
            </template>
          </vue-good-table>
        </div>
        <!-- End Promotion 1 -->

        <!-- STart Promotion 2 -->
        <b-button
          block
          variant="secondary"
          class="d-flex mt-1"
          @click="onShowProductPromotion"
        >
          Khuyến mãi tay PRM.001 - tặng sản phẩm
          <b-icon-chevron-down class="ml-auto" />
        </b-button>
        <div
          v-show="ShowProductPromotion"
          class="border-secondary"
        >
          <vue-good-table
            :columns="columns2"
            :rows="rows2"
            line-numbers
            :search-options="{
              enabled: true,
              externalQuery: searchTerm
            }"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <!-- <div v-if="props.column.field === 'Input2'">
                  <b-form-input
                    id="form-input-customer"
                    class="w-75"
                  />
                </div> -->
              <!-- <div v-if="props.column.field === 'ProgramName'">
                  <b-form-input
                    id="form-input-customer"
                  />
                </div> -->
              <div v-if="props.column.field === 'Press'">
                <b-form-input
                  id="form-input-customer"
                  v-model="totalMoney"
                  disabled
                  class="w-75"
                />
              </div>
            </template>
          </vue-good-table>
        </div>

        <!-- End Promotion 2 -->

        <!-- STart Promotion 3 -->
        <b-button
          block
          variant="secondary"
          class="d-flex mt-1"
          @click="onShowMoneyPromotion"
        >
          Khuyến mãi tay PRM.001 - tặng tiền
          <b-icon-chevron-down class="ml-auto" />
        </b-button>
        <div
          v-show="ShowMoneyPromotion"
          class="border-secondary"
        >
          <b-row class="p-2">
            <b-col>
              Số tiền
            </b-col>
            <b-col>
              <b-form-input
                id="form-input-customer"
              />
            </b-col>
          </b-row>
        </div>
        <!-- End Promotion 3 -->

        <!-- STart Promotion 4 -->
        <b-button
          block
          variant="secondary"
          class="d-flex mt-1"
          @click="onShowPresent"
        >
          Tích lũy - Quà Tết 2021
          <b-icon-chevron-down class="ml-auto" />
        </b-button>
        <div
          v-show="ShowPresent"
          class="py-2 border-secondary"
        >
          <b-row>
            <b-col>
              Quà tặng
            </b-col>
            <b-col>
              01 bộ tô chén dĩa Minh Long
            </b-col>
          </b-row>
        </div>
        <!-- End Promotion 4 -->

      </b-col>
      <!-- Start Container Left -->

      <!-- Start Container  Right -->
      <b-col>
        <b-row class="bg-info w-25 my-2 rounded-right">
          <div>
            <b-img
              src="../../assets/images/logo/logo.png"
              width="50"
              height="50"
              fluid
            />
          </div>
          <h2>
            Thanh toán
          </h2>
        </b-row>

        <!-- Start Total Money -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Tổng tiền hàng</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-input
              id="form-input-customer"
              v-model="totalMoney"
              disabled
              class="text-right"
            />
          </b-col>
        </b-row>

        <!-- Start Discount -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Giảm giá</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-input
              id="form-input-customer"
              v-model="discount"
              class="text-right"
            />
          </b-col>
        </b-row>

        <!-- Start Cumulative Points -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Điểm tích lũy</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-row>
              <b-col>
                <b-form-input
                  id="input-live"
                  v-model="points"
                  class="text-center"
                  maxlength="20"
                  disabled
                  @click="error"
                />
              </b-col>
              <b-col>
                <b-input-group class="input-group-merge">

                  <b-input-group-addon is-text>
                    <b-form-checkbox value="accepted" />
                  </b-input-group-addon>
                  <b-form-input
                    id="form-input-customer"
                    v-model="pointsMoney"
                    maxlength="20"
                    class="text-right"
                  />
                </b-input-group>
              </b-col>
            </b-row>

          </b-col>
        </b-row>

        <!-- Start Voucher -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Voucher</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-row>
              <b-col>
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <b-icon-three-dots-vertical />
                  </b-input-group-prepend>
                  <b-form-input
                    id="input-live"
                    v-model="voucherCode"
                    class="text-center"
                    maxlength="20"
                    @click="error"
                  />
                  <b-input-group-append is-text>
                    <b-icon-x />
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col>
                <b-form-input
                  v-model="voucherMoney"
                  class="text-right"
                  disabled
                />
              </b-col>
            </b-row>

          </b-col>
        </b-row>

        <!-- Start Discount Code -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Mã giảm giá</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-row>
              <b-col>
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="input-live"
                    v-model="discountCode"
                    class="text-center"
                    maxlength="20"
                    @click="error"
                  />
                  <b-input-group-append is-text>
                    <b-icon-x />
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col>
                <b-form-input
                  id="form-input-customer"
                  v-model="discountMoney"
                  class="text-right"
                  disabled
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <!-- Start Customer Pay -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Khách cần trả</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-input
              id="form-input-customer"
              v-model="customerPay"
              class="text-right font-weight-bolder"
              disabled
            />
          </b-col>
        </b-row>

        <!-- Start Payment Customers -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Khách thanh toán</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-input-group>
              <b-input-group-prepend>
                <b-form-select
                  v-model="selected"
                  :options="options"
                  value-field="item"
                  text-field="name"
                />
              </b-input-group-prepend>

              <b-form-input
                id="input-live"
                v-model="paymentCustomers"
                maxlength="20"
                class="text-right"
                @click="error"
              />
            </b-input-group>
          </b-col>

        </b-row>

        <!-- Start Excess Cash -->
        <b-row class="mt-1">
          <b-col
            xl
            sm="4"
            md="3"
          >
            <p>Tiền thừa trả khách</p>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-input
              id="form-input-customer"
              v-model="excessCash"
              disabled
              class="text-right"
            />
          </b-col>
        </b-row>
      </b-col>
      <!-- End Container  Right -->
    </b-row>
    <!-- End Container -->

    <!-- Start Button Bottom  -->
    <b-row
      align-h="center"
      class="my-4"
    >
      <b-button
        class="mr-2"
        variant="primary"
        @click="visible = !visible"
      >
        <b-row class="px-1">
          <b-icon-printer />
          <h5 class="text-white">
            IN HĐ TẠM (F7)
          </h5>
        </b-row>
      </b-button>

      <b-button
        class="mr-2"
        variant="primary"
        @click="visible = !visible"
      >
        <b-row class="px-1">
          <b-icon-wallet2 />
          <h5 class="text-white">
            THANH TOÁN (F8)
          </h5>
        </b-row>
      </b-button>

      <b-button
        @click="visible = !visible"
      >
        <b-row>
          <b-icon-x />
          <h5 class="text-white ">
            ĐÓNG (ESC)
          </h5>
        </b-row>
      </b-button>
      <!-- End Button Bottom -->

    </b-row>
  </b-modal>
  <!-- POPUP Pay The Bill End -->
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {

      // Show
      ShowPromotion: true,
      ShowProductPromotion: true,
      ShowMoneyPromotion: true,
      ShowPresent: true,

      totalMoney: '1,160,000',
      discount: '30,000',
      points: '600 điểm',
      pointsMoney: '60,000',
      voucherCode: 'TET.400K',
      voucherMoney: '400,000',
      discountCode: 'SN.20%',
      discountMoney: '200,000',
      customerPay: '416,000',
      excessCash: '83,951',
      paymentCustomers: '500,000',

      searchTerm: '',
      selected: '1',
      options: [
        { item: '1', name: 'Tiền mặt' },
      ],
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'Code',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProgramName',
          sortable: false,
        },
        {
          label: 'Số lượng tặng',
          field: 'Press',
          sortable: false,
        },
      ],
      rows: [
        {
          Code: '04AA30',
          ProgramName: 'STT H.Dâu ADM VNM TP 110',
          Press: 'Chỉnh sửa',
        },
        {
          Code: '04AA31',
          ProgramName: 'STT K.Đường ADM VNM TP 110',
          Press: 'Chỉnh sửa',
        },
        {
          Code: '04AA33',
          ProgramName: 'STT C.Đường ADM VNM TP 110',
          Press: 'Chỉnh sửa',
        },
      ],
      columns2: [
        {
          label: 'Mã sản phẩm',
          field: 'Input2',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProgramName',
          sortable: false,
        },
        {
          label: 'Số lượng tặng',
          field: 'Press',
          sortable: false,
        },
      ],
      rows2: [
        {
          Input2: 'Nhâp',
          ProgramName: 'STT H.Dâu ADM VNM TP 110',
          Press: 'Chỉnh sửa',
        },
      ],
    }
  },
  computed: {

  },
  methods: {
    onPress() {
    },
    onShowPromotion() {
      if (this.ShowPromotion === false) {
        this.ShowPromotion = true
      } else {
        this.ShowPromotion = false
      }
    },
    onShowProductPromotion() {
      if (this.ShowProductPromotion === false) {
        this.ShowProductPromotion = true
      } else {
        this.ShowProductPromotion = false
      }
    },
    onShowMoneyPromotion() {
      if (this.ShowMoneyPromotion === false) {
        this.ShowMoneyPromotion = true
      } else {
        this.ShowMoneyPromotion = false
      }
    },
    onShowPresent() {
      if (this.ShowPresent === false) {
        this.ShowPresent = true
      } else {
        this.ShowPresent = false
      }
    },
  },
}
</script>

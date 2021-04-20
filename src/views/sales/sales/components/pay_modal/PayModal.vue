<template>
  <!-- START Popup -->
  <b-modal
    size="xl"
    :visible="visible"
    title="Thanh toán hóa đơn"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-white"
    footer-border-variant="white"
    hide-header-close
  >
    <!-- START - Body -->
    <b-container
      fluid
      class="px-0"
    >
      <b-row class="mx-0">
        <!-- START - Section table -->
        <b-col class="shadow py-1">
          <b-row
            class="mx-0 bg-light p-1 mb-1 w-25 rounded"
            align-v="center"
          >
            <b-icon-gift
              scale="2"
              color="red"
              class="mx-1"
            />
            <strong class="ml-1">Khuyến mãi</strong>
          </b-row>

          <!-- START - Table 1 -->
          <b-col class="p-0">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAdmVoucher
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi ADM tháng 11.2020
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapseAdmVoucher"
              visible
            >
              <vue-good-table
                :columns="columnsAdm"
                :rows="rowsAdm"
                style-class="vgt-table bordered"
                compact-mode
                line-numbers
              >
                <!-- START - Row -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'GiftsAmount'">
                    <b-input-group
                      append="3"
                    >
                      <b-form-input />
                    </b-input-group>
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- END - Row -->
              </vue-good-table>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 1 -->

          <!-- START - Table 2 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapsePrmProduct
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi tay PRM.001 - tặng sản phẩm
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapsePrmProduct"
              visible
            >
              <vue-good-table
                :columns="columnsPrmProduct"
                :rows="rowsPrmProduct"
                style-class="vgt-table bordered"
                compact-mode
                line-numbers
              >
                <!-- START - Row -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'GiftsAmount'">
                    <b-input-group
                      append="3"
                    >
                      <b-form-input />
                    </b-input-group>
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- END - Row -->
              </vue-good-table>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 2 -->

          <!-- START - Table 3 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapsePrmMoney
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Khuyến mãi tay PRM.001 - tặng tiền
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapsePrmMoney"
              visible
            >
              <b-row
                class="mx-0 p-1"
                align-v="center"
              >
                <div>Số tiền</div>
                <b-col cols="3">
                  <b-input />
                </b-col>
              </b-row>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 3 -->

          <!-- START - Table 4 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAccumulationBỉthDay
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Tích lũy - Quà sinh nhật 2021
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapseAccumulationBỉthDay"
              visible
            >
              <b-row
                class="mx-0 p-1"
                align-v="center"
              >
                <div>Giảm giá</div>

                <b-col cols="3">
                  <b-input-group
                    prepend="20%"
                  >
                    <b-form-input disabled />
                  </b-input-group>
                </b-col>

              </b-row>
            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 4 -->

          <!-- START - Table 5 -->
          <b-col class="p-0 mt-1">
            <!-- START - Title -->
            <b-row
              v-b-toggle.collapseAccumulationNewYear
              align-v="center"
              class="bg-primary mx-0 p-1"
            >
              <b-check />
              <div class="text-white">
                Tích lũy - Quà tết 2021
              </div>
              <b-icon-chevron-down
                class="ml-auto"
                color="white"
              />
            </b-row>
            <!-- END - Title -->

            <!-- START - Body -->
            <b-collapse
              id="collapseAccumulationNewYear"
              visible
            >
              <b-row
                class="mx-0 p-1"
                align-v="center"
              >
                <div>Giảm giá</div>

                <b-col cols="3">
                  <b-form-input disabled />
                </b-col>
              </b-row>

              <div class="ml-1">
                Quà tặng <i class="ml-1">01 bộ tô chén dĩa Minh Long</i>
              </div>

            </b-collapse>
            <!-- END - Body -->
          </b-col>
          <!-- END - Table 5 -->

        </b-col>
        <!-- START - Section table -->

        <!-- START - Section Pay -->
        <b-col class="ml-1 shadow py-1">
          <b-row
            class="mx-0 bg-light p-1 mb-1 w-25 rounded"
            align-v="center"
          >
            <b-icon-cash-stack
              scale="2"
              color="blue"
              class="mx-1"
            />
            <strong class="ml-1">Thanh toán</strong>
          </b-row>

          <b-form class="">
            <!-- START - Total price -->
            <b-form-group>
              <b-row
                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Tổng tiền hàng
                    <strong class="d-inline-flex text-white px-1 ml-1 bg-primary rounded-pill">
                      31
                    </strong>
                  </strong>

                </b-col>

                <b-col>
                  <b-form-input disabled />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Total price -->

            <!-- START - Discount -->
            <b-form-group>
              <b-row
                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Giảm giá</strong>
                </b-col>

                <b-col>
                  <b-form-input disabled />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Discount -->

            <!-- START - Money accumulated -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Tiền tích lũy</strong>
                </b-col>

                <b-col>
                  <b-row
                    no-gutters
                  >
                    <b-col>
                      <b-form-input disabled />
                    </b-col>

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-input-group-prepend is-text>
                          <b-form-checkbox />
                        </b-input-group-prepend>
                        <b-form-input class="form-control-merge" />
                      </b-input-group>
                    </b-col>

                  </b-row>
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Money accumulated -->

            <!-- START - Voucher -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Voucher</strong>
                </b-col>

                <b-col class="">
                  <b-row
                    no-gutters
                  >

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-input-group-prepend
                          is-text
                          class="cursor-pointer"
                          @click="onVoucherButtonClick()"
                        >
                          <b-icon-three-dots-vertical
                            scale="1.5"
                          />
                        </b-input-group-prepend>
                        <b-form-input class="form-control-merge" />
                        <b-input-group-append is-text>
                          <b-icon-x
                            scale="1.5"
                            class="cursor-pointer"
                          />
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>

                    <b-col>
                      <b-form-input disabled />
                    </b-col>

                  </b-row>
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Voucher -->

            <!-- START - Discount code -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Mã giảm giá</strong>
                </b-col>

                <b-col class="">
                  <b-row
                    no-gutters
                  >

                    <b-col>
                      <b-input-group
                        class="input-group-merge"
                      >
                        <b-form-input class="form-control-merge" />
                        <b-input-group-append is-text>
                          <b-icon-x
                            scale="1.5"
                            class="cursor-pointer"
                          />
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>

                    <b-col>
                      <b-form-input disabled />
                    </b-col>

                  </b-row>
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Discount code -->

            <!-- START - Customer need to pay -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Khách cần trả</strong>
                </b-col>

                <b-col>
                  <b-form-input disabled />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Customer need to pay -->

            <!-- START - Payment customers -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Khách thanh toán</strong>
                </b-col>
                <b-col>
                  <b-row
                    no-gutters
                  >

                    <b-col>
                      <b-form-select />
                    </b-col>

                    <b-col>
                      <b-form-input />
                    </b-col>

                  </b-row>
                </b-col>

              </b-row>
            </b-form-group>
            <!-- END - Payment customers -->

            <!-- START - Excess cash -->
            <b-form-group>
              <b-row

                class="mx-0"
                align-v="center"
              >
                <b-col cols="4">
                  <strong>Tiền thừa trả khách</strong>
                </b-col>

                <b-col>
                  <b-form-input disabled />
                </b-col>
              </b-row>
            </b-form-group>
            <!-- END - Excess cash -->

          </b-form>

        </b-col>
        <!-- START - Section Pay -->
      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ ok, cancel }">
      <b-row
        class="mx-auto"
      >
        <b-button
          variant="primary"
          class="d-flex align-items-center text-uppercase"
          @click="ok()"
        >
          <b-icon-printer
            class="mr-1"
            scale="1.5"
          />
          In hóa đơn tạm (F7)
        </b-button>
        <b-button
          variant="primary"
          class="d-flex align-items-center mx-1 text-uppercase"
          @click="ok()"
        >
          <b-icon-cash-stack
            class="mr-1"
            scale="1.5"
          />
          Thanh toán (F8)
        </b-button>
        <b-button
          variant="secondary"
          class="d-flex align-items-center text-uppercase"
          @click="cancel()"
        >
          <b-icon-x
            scale="2"
            class="mr-1"
          />
          Đóng (ESC)
        </b-button>
      </b-row>
    </template>
    <!-- END - Footer -->

    <voucher-modal />
  </b-modal>
  <!-- End Popup -->
</template>

<script>
import VoucherModal from '../voucher-modal/VoucherModal.vue'

export default {
  components: {
    VoucherModal,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      isVoucherModalShow: false,
      searchTerm: '',
      columnsAdm: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng tặng',
          field: 'GiftsAmount',
          sortable: false,
          type: 'number',
        },
      ],
      rowsAdm: [
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
      ],
      columnsPrmProduct: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng tặng',
          field: 'GiftsAmount',
          sortable: false,
          type: 'number',
        },
      ],
      rowsPrmProduct: [
        {
          ProductCode: '04AA30',
          ProductName: 'STT H.Dâu ADM VNM TP 110',
          GiftsAmount: '',
        },
      ],
    }
  },
  computed: {
  },
  methods: {
    onVoucherButtonClick() {
      this.$root.$emit('bv::show::modal', 'VoucherModal')
    },
  },
}
</script>

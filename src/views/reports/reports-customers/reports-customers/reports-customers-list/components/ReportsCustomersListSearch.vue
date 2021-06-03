<template>

  <!-- START - Search -->
  <b-form
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <b-col
        xl="2"
        lg="6"
        md="6"
        sm="4"
      >
        <!-- START - khach hang -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Khách hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="customerName"
              class="h8"
              placeholder="Nhập họ tên/mã"
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="customerName"
                class="cursor-pointer text-gray"
                @click="customerName = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - khach hang -->
        <br>
        <!-- START - So dien thoai -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Số điện thoại
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="customerName"
              class="h8"
              placeholder="Nhập họ tên/mã"
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="customerName"
                class="cursor-pointer text-gray"
                @click="customerName = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - So dien thoai -->
        <br>
        <!-- START - Nhom khach hang -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Nhóm khách hàng
          </div>
          <tree-select
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Nhom khach hang -->
        <br>
        <!-- START - trạng thái -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Trạng thái
          </div>
          <tree-select
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - trạng thái -->
      </b-col>
      <b-col
        xl="2"
        lg="6"
        md="6"
        sm="4"
      >
        <!-- START - Tỉnh/Thành phố -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Tỉnh/Thành phố
          </div>
          <tree-select
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Tỉnh/thành phố -->
        <br>
        <!-- START - Quận/Huyện -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Quận/Huyện
          </div>
          <tree-select
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Quận/Huyện -->
        <br>
        <!-- START - Phường/Xã -->
        <b-col
          xl
          lg="12"
          md="10"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Phường/Xã
          </div>
          <tree-select
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Phường/Xã -->
      </b-col>
      <b-col
        xl="2"
        lg="6"
        md="6"
        sm="4"
      >
        <v-card-actions
          title="Thời gian tạo"
        >
          <b-col
            xl
            lg="12"
            md="10"
            sm="4"
          >

            <!-- START - Date From -->
            <b-col
              xl
              lg="12"
              md="12"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Từ ngày
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="fromDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="fromDate"
                  :config="configFromDate"
                  class="form-control h8"
                  placeholder="Chọn ngày"
                />
              </b-row>
            </b-col>
            <!-- END - Date From -->
            <br>
            <!-- START - Date To -->
            <b-col
              xl
              lg="12"
              md="12"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Đến ngày
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="toDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="toDate"
                  :config="configToDate"
                  class="form-control h8"
                  placeholder="Chọn ngày"
                />
              </b-row>

            </b-col>
            <!-- END - Date To -->
          </b-col>
        </v-card-actions>
        <br>
        <v-card-actions
          title="Ngày mua hàng cuối"
        >
          <b-col
            xl
            lg="12"
            md="10"
            sm="4"
          >

            <!-- START - Date From -->
            <b-col
              xl
              lg="12"
              md="12"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Từ ngày
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="fromDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="fromDate"
                  :config="configFromDate"
                  class="form-control h8"
                  placeholder="Chọn ngày"
                />
              </b-row>
            </b-col>
            <!-- END - Date From -->
            <br>
            <!-- START - Date To -->
            <b-col
              xl
              lg="12"
              md="12"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Đến ngày
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="toDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="toDate"
                  :config="configToDate"
                  class="form-control h8"
                  placeholder="Chọn ngày"
                />
              </b-row>

            </b-col>
            <!-- END - Date To -->
          </b-col>
        </v-card-actions>
      </b-col>
      <!-- END - Thoi gian tao -->

      <!-- START - Date From -->
      <b-col
        xl="4"
        lg="6"
        md="6"
        sm="4"
      >
        <v-card-actions
          title="Doanh số"
          can-collapse="fasle"
        >
          <b-col
            xl
            lg="12"
            md="10"
            sm="4"
          >

            <!-- START - Date From -->
            <b-col
              xl
              lg="6"
              md="12"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Từ ngày
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="fromDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="fromDate"
                  :config="configFromDate"
                  class="form-control h8"
                  placeholder="Chọn ngày"
                />
              </b-row>
            </b-col>
            <!-- END - Date From -->
            <br>
            <!-- START - Date To -->
            <b-col
              xl
              lg="6"
              md="12"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Đến ngày
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="toDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="toDate"
                  :config="configToDate"
                  class="form-control h8"
                  placeholder="Chọn ngày"
                />
              </b-row>

            </b-col>
            <!-- END - Date To -->
          </b-col>
          <b-col
            xl
            lg="6"
            md="6"
            sm="4"
          >
            <!-- START - khach hang -->
            <b-col
              xl
              lg="12"
              md="10"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Từ
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="customerName"
                  class="h8"
                  placeholder="0đ"
                  @keyup.enter="onClickSearchButton"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="customerName"
                    class="cursor-pointer text-gray"
                    @click="customerName = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <!-- END - khach hang -->
            <br>
            <!-- START - So dien thoai -->
            <b-col
              xl
              lg="12"
              md="10"
              sm="4"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Đến
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="customerName"
                  class="h8"
                  placeholder="3.000.000đ"
                  @keyup.enter="onClickSearchButton"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="customerName"
                    class="cursor-pointer text-gray"
                    @click="customerName = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <!-- END - So dien thoai -->
          </b-col>
        </v-card-actions>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Search button -->
      <b-col
        xl="2"
        sm="4"
        md="3"
      >
        <div
          class="h8 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-05" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->
    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'

export default {
  components: {
    VCardActions,
  },
  props: {
    perPageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      isSearchFocus: false,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromDate,
      },
    }
  },
  computed: {
  },
  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },

  methods: {
  },
}
</script>

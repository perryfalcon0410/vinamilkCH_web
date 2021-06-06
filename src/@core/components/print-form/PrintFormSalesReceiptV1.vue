<template>
  <div
    class="d-none d-print-block text-brand-3"
    style="width: 400px"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1 text-center"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <b-img
          src="https://www.ngoisaoso.vn/uploads/news/2016/05/12/he-thong-nhan-dien-thuong-hieu-vinamilk-3.png"
          width="100px"
        />
        <div class="mb-50">
          CTY CP SUA VIET NAM - VINAMILK
        </div>
        <strong style="font-size: 17px">
          CH GTSP Hải Dương
        </strong>
        <div>Tel: (84.320) 3 838 399</div>
        <div>Add : 8 Hoàng Hoa Thám - Hải Dương</div>

        <strong class="mt-1">
          <div>
            BIÊN NHẬN THANH TOÁN
          </div>
          <div>
            KIÊM PHIẾU GIAO HÀNG
          </div>
          <div>
            (CÓ GIÁ TRỊ NHƯ HÓA ĐƠN)
          </div>
        </strong>
      </div>
    </b-row>
    <!-- END - Header -->

    <!-- START - Customer info -->
    <div>
      <div>
        Số HĐ: <strong>SAL.MT1008121041500001</strong>
      </div>
      <div>
        KH: Khach hang Nguyen - 0999898778
      </div>
      <div>
        DC: 1231, X.Thái Hòa, H.Tân Uyên, Bình Dương,Việt Nam
      </div>
      <div>
        Loại giao hàng: Giao tại cửa hàng
      </div>
      <div>
        Doanh số tích lũy: 180,300
      </div>
      <div>
        Ngày: 15/04/2021 2:21:39PM
      </div>
      <div>
        NV: nmson
      </div>
    </div>
    <!-- END - Customer info -->

    <!-- START - Table -->
    <table>
      <thead>
        <tr>
          <th>
            SP
          </th>
          <th class="text-right">
            SL
          </th>
          <th class="text-right">
            Giá
          </th>
          <th class="text-right">
            T.Tiền
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4">
            SP Dielac Alpha Step 2 HG 400g
          </td>
        </tr>
        <tr>
          <td>
            02BA22
          </td>
          <td class="text-right">
            4
          </td>
          <td class="text-right">
            20,052
          </td>
          <td class="text-right">
            80,671
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table -->

    <!-- STAT - Total section -->
    <div class="text-right th my-1">
      <b-row
        class="mx-0 "
        align-h="end"
        align-v="center"
      >
        <div>
          <div>
            Tổng tiền (bao gồm VAT):
          </div>
          <div>
            Tổng tiền (chưa VAT):
          </div>
          <div>
            Chiết khấu (chưa VAT):
          </div>
          <div>
            Tiền tích lũy:
          </div>
          <div>
            Voucher:
          </div>
          <div>
            Thanh toán (bao gồm VAT):
          </div>
          <div>
            KH đưa:
          </div>
          <div>
            Trả lại:
          </div>
        </div>
        <div
          class="ml-50"
        >
          <div>
            1,300,000,000
          </div>
          <div>
            180,300
          </div>
          <div>
            180,300
          </div>
          <div>
            180,300
          </div>
          <div>
            180,300
          </div>
          <div>
            180,300
          </div>
          <div>
            180,300
          </div>
          <div>
            180,300
          </div>
        </div>
      </b-row>
    </div>
    <!-- END - Total section -->

    <!-- START - Footer -->
    <div>
      Quý khách có thể yêu cầu cửa hàng xuất hóa đơn tài chính cùng ngày mua hàng.
    </div>
    <div class="text-center mt-50 text-nowrap">
      <strong style="font-size: 13px">Vinamilk online: <ins>www.giacmosuaviet.com.vn</ins></strong>
      <div>
        Cảm ơn Quý khách. Hẹn gặp lạ
      </div>
    </div>

    <!-- END - Footer -->
  </div>
</template>

<script>
/* eslint-disable import/named */
import { mapGetters } from 'vuex'

import {
  WAREHOUSES_OUTPUT,
  // Getters
  PRINT_OUT_IN_PUT_ORDER_GETTER,
} from '../store-module/type'

export default {
  data() {
    return {
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [PRINT_OUT_IN_PUT_ORDER_GETTER]),

    inputOrderShopData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.shop) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.shop
      }
      return {
        shopName: 'name',
        address: 'addres',
        phone: 'phone',
        fax: 'fax',
      }
    },
    inputOrderInfoData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.info) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.info
      }
      return {
        type: 'type',
        transCode: 'transCode',
        poNumber: 'poNumber',
        invoiceNumber: 'invoiceNumber',
        transDate: 'transDate',
        internalNumber: 'internalNumber',
        orderDate: 'orderDate',
        totalQuantity: 'totalQuantity',
        totalPriceNotVat: 'totalPriceNotVat',
        totalPrice: 'totalPrice',
        totalPriceVat: 'totalPriceVat',
        note: 'note',
      }
    },
    inputOrderSaleProductsData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.saleProducts) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.saleProducts
      }
      return null
    },
    inputOrderPromotionProductsData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.promotionProducts) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.promotionProducts
      }
      return null
    },
  },

  // updated() {
  //   window.print()
  // },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th {
 border-top: 1.5px dashed black;
 border-bottom: 1.5px dashed black;
}
.th {
 border-top: 2.2px dashed black;
 border-bottom: 2.2px dashed black;
}
</style>

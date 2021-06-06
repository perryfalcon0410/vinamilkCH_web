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
          {{ printSalesReceiptData.nameShop }}
        </strong>
        <div>Tel: {{ printSalesReceiptData.phone }}</div>
        <div>{{ printSalesReceiptData.shopAddress }}</div>

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
        Số HĐ: <strong>{{ printSalesReceiptData.orderNumber }}</strong>
      </div>
      <div>
        KH: {{ printSalesReceiptData.customerName }} - {{ printSalesReceiptData.customerPhone }}
      </div>
      <div>
        DC: {{ printSalesReceiptData.address }}
      </div>
      <div>
        Loại giao hàng: {{ deliveryTypeLabel }}
      </div>
      <div>
        Doanh số tích lũy: {{ $formatNumberToLocale(printSalesReceiptData.customerPurchase) }}
      </div>
      <div>
        Ngày: {{ $formatISOtoVNI( printSalesReceiptData.orderDate, true) }}
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
        <tr>
          <td>
            Giảm giá
          </td>
          <td class="text-right">
            4
          </td>
          <td class="text-right">
            -1,000
          </td>
          <td class="text-right">
            -4,000
          </td>
        </tr>
        <tr>
          <td>
            KM
          </td>
          <td class="text-right">
            1
          </td>
          <td colspan="2">
            Bo men goi YOKO hinh canh cut
          </td>
        </tr>
        <tr>
          <td colspan="3">
            SCA Vinamilk Love Yogurt Có Đường
          </td>
          <td class="text-right">
            9
          </td>
        </tr>
        <tr>
          <td colspan="4">
            CH1220ONTOP_FARM
          </td>
        </tr>
        <tr>
          <td colspan="4">
            Giam Gia Don Hang 500k
          </td>
        </tr>
        <tr>
          <td class="4">
            CH1220ONTOP_DH500
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
            Tổng cộng (bao gồm VAT):
          </div>
          <div>
            Tổng tiền (chưa VAT):
          </div>
          <div>
            Giảm giá (chưa VAT):
          </div>
          <div>
            Giảm giá (bao gồm VAT):
          </div>
          <div>
            Tiền tích lũy:
          </div>
          <div>
            Voucher:
          </div>
          <div>
            Thanh toán (chưa VAT):
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
        Cảm ơn Quý khách. Hẹn gặp lại
      </div>
    </div>
    <!-- END - Footer -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSaleDeliveryTypeslabel } from '@core/utils/utils'

import {
  SALESRECEIPTS,
  // Getters
  PRINT_SALES_RECEIPT_GETTER,
} from '@/views/sales/sales-receipts/store-module/type'

export default {
  computed: {
    ...mapGetters(SALESRECEIPTS, [PRINT_SALES_RECEIPT_GETTER]),

    printSalesReceiptData() {
      if (this.PRINT_SALES_RECEIPT_GETTER) {
        return this.PRINT_SALES_RECEIPT_GETTER
      }
      return null
    },

    deliveryTypeLabel() {
      if (this.printSalesReceiptData.deliveryType) {
        return getSaleDeliveryTypeslabel(this.printSalesReceiptData.deliveryType)
      }
      return null
    },
  },

  updated() {
    window.print()
  },
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

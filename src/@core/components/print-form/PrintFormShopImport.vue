<template>
  <b-container
    id="print-form-shop-import"
    fluid
    class="d-none d-print-block px-1 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong
          style="font-size: 17px"
          class="mt-1"
        > {{ commonData.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonData.address }}
        </p>
        <p>
          Tel: {{ commonData.shopTel }}
        </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Cửa hàng nhập hàng </strong>
        <b-row class="mt-1">
          <p class="mr-2">
            Từ ngày: {{ $formatISOtoVNI(commonData.fromDate) }}
          </p>
          <p>
            Đến ngày: {{ $formatISOtoVNI(commonData.toDate) }}
          </p>
        </b-row>
        <p>Ngày in : {{ $formatPrintDate(commonData.printDate) }} </p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> shopName </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0 width-100-per total"
      align-v="end"
    >
      <div
        style="visibility: hidden; width: 56.3%;"
        class="ml-1"
      ><strong>Loại: A </strong>
      </div>
      <div
        style="width: 7%;"
        class="text-right"
      ><i class="normal-weight">Tổng SL:</i>
      </div>
      <i
        style="width: 8.7%;"
        class="text-right"
      >
        <strong><u>{{ $formatNumberToLocale(commonData.totalQuantity) }}</u></strong>
      </i>
      <i
        style="width: 12.6%;"
        class="text-right"
      >
        T.Tiền:
      </i>
      <div
        style="width: 13.7%;"
        class="text-right"
      >
        <strong>{{ $formatNumberToLocale(commonData.totalAmount) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- NHẬP ĐIỀU CHỈNH -->
    <div
      v-if="lstAdjust.orderImports.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: Nhập điều chỉnh</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstAdjust.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstAdjust.totalPriceVat) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstAdjust.orderImports"
        :key="index"
        class="px-0 pb-50"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.redInvoiceNo }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.transCode }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.totalPriceVat) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody
            v-for="(category,i) in item.cats"
            :key="i"
          >
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ category.catName }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(category.totalQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(category.totalPriceVat) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
            <tr
              v-for="(product,stt) in category.products"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.total) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-1 avoid-break">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80"> 0 </strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.totalPriceVat) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- NHẬP ĐIỀU CHỈNH -->

    <!-- NHẬP HÀNG -->
    <div
      v-if="lstPo.orderImports.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: Nhập hàng</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstPo.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstPo.totalPriceVat) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstPo.orderImports"
        :key="index"
        class="px-0 pb-50"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.redInvoiceNo }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.transCode }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.totalPriceVat) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody
            v-for="(category,i) in item.cats"
            :key="i"
          >
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ category.catName }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(category.totalQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(category.totalPriceNotVat) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
            <tr
              v-for="(product,stt) in category.products"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.priceNotVat) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.amount) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-1 avoid-break">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.vat) || 0 }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.totalPriceVat) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- NHẬP HÀNG -->

    <!-- NHẬP VAY MƯỢN -->
    <div
      v-if="lstBorrow.orderImports.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: Nhập vay mượn</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstBorrow.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstBorrow.totalPriceVat) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstBorrow.orderImports"
        :key="index"
        class="px-0 pb-50"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.redInvoiceNo }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.transCode }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.totalPriceVat) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody
            v-for="(category,i) in item.cats"
            :key="i"
          >
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ category.catName }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(category.totalQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(category.totalPriceVat) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
            <tr
              v-for="(product,stt) in category.products"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.total) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-1 avoid-break">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80"> 0 </strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.totalPriceVat) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- NHẬP VAY MƯỢN -->

    <!-- XUẤT TRẢ PO -->
    <div
      v-if="lstExpPo.orderImports.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: Xuất trả PO</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstExpPo.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstExpPo.totalPriceNotVat) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstExpPo.orderImports"
        :key="index"
        class="px-0 pb-50"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.redInvoiceNo }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.transCode }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.totalPriceNotVat) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody
            v-for="(category,i) in item.cats"
            :key="i"
          >
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ category.catName }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(category.totalQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(category.totalPriceNotVat) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
            <tr
              v-for="(product,stt) in category.products"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.priceNotVat) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.amount) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-1 avoid-break">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80"> 0 </strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong class="mr-80">{{ $formatNumberToLocale(item.totalPriceNotVat) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- XUẤT TRẢ PO -->
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  printActions,
  jspmCheckStatus,
} from '@core/utils/filter'
import {
  REPORT_WAREHOUSES_INPUT,
  PRINT_SHOP_IMPORT_REPORT_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-input/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      lstPo: { orderImports: [] },
      lstAdjust: { orderImports: [] },
      lstBorrow: { orderImports: [] },
      lstExpPo: { orderImports: [] },
      dataPrintOptions: {},
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT, [
      PRINT_SHOP_IMPORT_REPORT_GETTER,
    ]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    commonData() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER
      }
      return {}
    },
    getLstPo() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.impPO) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.impPO
      }
      return {
        orderImports: [],
      }
    },
    getLstAdjust() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.impAdjust) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.impAdjust
      }
      return {
        orderImports: [],
      }
    },
    getLstBorrow() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.impBorrow) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.impBorrow
      }
      return {
        orderImports: [],
      }
    },
    getLstExpPo() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.expPO) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.expPO
      }
      return {
        orderImports: [],
      }
    },
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  watch: {
    getLstPo() {
      this.lstPo = { ...this.getLstPo }
    },
    getLstAdjust() {
      this.lstAdjust = { ...this.getLstAdjust }
    },
    getLstBorrow() {
      this.lstBorrow = { ...this.getLstBorrow }
    },
    getLstExpPo() {
      this.lstExpPo = { ...this.getLstExpPo }
    },
  },
  updated() {
    const printerName = this.printerOptions.reportPrinterName
    const element = document.getElementById('print-form-shop-import')
    const options = {
      fileName: 'bao_cao_nhap_hang',
      orientation: 'landscape',
      rotate: 'Rot90',
      pageSizing: 'Fit',
      format: 'a4',
    }
    if (jspmCheckStatus()) {
      printActions(element, printerName, options)
    }
  },
}
</script>
<style lang="scss" scoped>
@media print {
  @page {
    margin-top: 1mm;
    margin-bottom: 1mm;
  }
}
  body { color-adjust: exact; }
  table {
  border: 1.8px solid rgb(78, 77, 77);
  width: 100%;
  border-collapse: collapse;
  page-break-before: avoid;
  page-break-inside: avoid;
}
th {
  border-style: solid;
  border-width: 1.8px;
}
td {
  border-style: dashed;
  border-width: 1.8px;
}

.top-border-only {
  border-top: 2.5px solid rgb(100, 99, 99);
}
.bot-border-dotted {
  border-bottom: 2px dashed;
  border-collapse: collapse;
}
.total {
    background: rgb(192, 186, 186)
}
.flex-container {
    display: flex;
    right: 0;
    border: 1.8px dashed;
    height: auto;
    width: 298px;
    flex-direction: column;
    align-items: center;
    page-break-before: avoid;
    page-break-inside: avoid;
}
  .flex-item > .row {
      min-width: 338px;
  }
  .big-font {
    font-size: 17px;
  }
  .normal-weight {
    font-weight: normal;
  }
  .avoid-break {
    page-break-inside: avoid;
  }
</style>

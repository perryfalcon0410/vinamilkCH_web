<template>
  <b-container
    id="print-form-shop-import"
    fluid
    class="d-none d-print-block px-1 text-black"
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
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { printFile } from '@/@core/utils/utils'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
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
      printerName: null,
      bodyData: [],
      count: 1,
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
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null || this.printerName === undefined) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // START - add font family
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      // END - add font family

      // START - hearder page
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13)
      pdf.text('Cửa hàng nhập hàng', 90, 10)
      pdf.setFontSize(9)
      pdf.text(`${this.commonData.shopName}`, 5, 10)
      pdf.setFontSize(8)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.commonData.address}`, 5, 17)
      pdf.text(`Tel: ${this.commonData.shopTel || ''}`, 5, 24)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.commonData.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.commonData.toDate)}`, 83, 17)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.commonData.printDate)}`, 91, 24)
      // END - hearder page

      // START - table tổng đầu tiên
      pdf.autoTable({
        startY: 30,
        margin: {
          right: 5,
          left: 5,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 9,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng SL :',
              styles: { halign: 'right', fillColor: [211, 211, 211], cellWidth: 132.5 },
            },
            {
              content: `${this.$formatNumberToLocale(this.commonData.totalQuantity)}`,
              styles: {
                halign: 'right', font: 'Ario-Bold', fillColor: [211, 211, 211], cellWidth: 17.5,
              },
            },
            {
              content: 'T.Tiền :',
              styles: { halign: 'right', fillColor: [211, 211, 211], cellWidth: 20 },
            },
            {
              content: `${this.$formatNumberToLocale(this.commonData.totalAmount)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fillColor: [211, 211, 211], cellWidth: 30,
              },
            },
          ],
        ],
      })
      // END - table tổng đầu tiên

      // START - table nhập điều chỉnh
      this.createTableInputAdjust(pdf)
      // END - table nhập điều chỉnh

      // START - table nhập hàng
      this.createTableInput(pdf)
      // END - table nhập hàng

      // START - table nhập vay mượn
      this.createTableInputBorrow(pdf)
      // END - table nhập vay mượn
      printFile('Bao_cao_nhap_hang.pdf', this.printerName, pdf)
    }
  },
  mounted() {
  },
  methods: {
    // Start - Bảng nhập điều chỉnh
    createTableInputAdjust(pdf) {
      if (this.lstAdjust.orderImports.length > 0) {
        pdf.autoTable({
          startY: 37,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
            // bottom: 0,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          body: [
            [
              { content: 'Loại: Nhập điều chỉnh', styles: { font: 'Ario-Bold', cellWidth: 115 } },
              { content: 'Tổng SL :', styles: { cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.lstAdjust.totalQuantity || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 15 } },
              { content: 'T.Tiền :', styles: { halign: 'right', cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.lstAdjust.totalPriceVat || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 30 } },
            ],
          ],
          headStyles: {
            Loai: { font: 'Ario-Bold', fontSize: 14 },
          },
          didDrawCell: data => {
            if (data.section === 'body' && data.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
            }
          },
        })

        for (let i = 0; i < this.lstAdjust.orderImports.length; i += 1) {
          const startYTotal = (i === 0) ? { startY: pdf.previousAutoTable.finalY } : {}
          pdf.autoTable({
            theme: 'plain',
            ...startYTotal,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Bold',
              fontSize: 7.5,
              textColor: 'black',
            },
            tableLineWidth: 0,
            tableLineColor: 'black',
            body: [
              [
                { content: `Số HĐ: ${this.lstAdjust.orderImports[i].redInvoiceNo}` },
                { content: `- Ngày HĐ: ${this.$formatISOtoVNI(this.lstAdjust.orderImports[i].orderDate)}` },
                { content: this.lstAdjust.orderImports[i].poNumber !== null ? `- Số PO: ${this.lstAdjust.orderImports[i].poNumber}` : '- Số PO:' },
                { content: `- Số nội bộ: ${this.lstAdjust.orderImports[i].internalNumber}` },
                { content: `- Mã nhập hàng: ${this.lstAdjust.orderImports[i].transCode}` },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 4) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          pdf.autoTable({
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            body: [
              [
                {
                  content: 'Tổng SL :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 132.5 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.lstAdjust.orderImports[i].totalQuantity)}`,
                  styles: {
                    halign: 'right', font: 'Ario-Bold', fillColor: 'white', cellWidth: 17.5,
                  },
                },
                {
                  content: 'T.Tiền :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 20 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.lstAdjust.orderImports[i].totalPriceVat)}`,
                  styles: {
                    font: 'Ario-Bold', halign: 'right', fillColor: 'white', cellWidth: 30,
                  },
                },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cursor.y + data.cell.height, data.cell.x + data.cell.width, data.cursor.y + data.cell.height)
              }
              if (data.section === 'body' && data.column.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          this.lstAdjust.orderImports[i].cats.forEach(data => {
            const row = [
              { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
              { content: `${data.catName}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
              { content: 'Tổng SL :', styles: { lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
              { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalPriceVat)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            ]
            this.bodyData.push(row)
            data.products.forEach(pro => {
              this.bodyData.push([
                { content: `${this.count}`, styles: { cellWidth: 10 } },
                { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
                { content: `${pro.productName}`, styles: { cellWidth: 80 } },
                { content: `${pro.uom1}`, styles: { cellWidth: 20, halign: 'center' } },
                { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 20, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.total)}`, styles: { cellWidth: 30, halign: 'right' } },
              ])
              this.count += 1
            })
          })

          pdf.autoTable({
            theme: 'grid',
            startY: pdf.previousAutoTable.finalY,
            pageBreak: 'avoid',
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            headStyles: {
              fillColor: 'white',
              font: 'Ario-Bold',
              textColor: 'black',
              fontSize: 9,
              lineWidth: 0.1,
              lineColor: 'black',
            },
            didDrawCell: data => {
              if (data.section === 'body' && data.row.raw.length === 6) {
                pdf.setDrawColor(200)
                pdf.setLineWidth(0.01)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 6) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
              }
            },
            columns: [
              { header: 'STT', dataKey: 'STT', cellWidth: 10 },
              { header: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35 },
              { header: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60 },
              { header: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15 },
              { header: 'SL', dataKey: 'SL', cellWidth: 15 },
              { header: 'Giá', dataKey: 'Giá', cellWidth: 20 },
              { header: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30 },
            ],
            body: [...this.bodyData],
          })
          this.bodyData = []

          // START - table tổng cộng và điều chỉnh
          this.createTableTotal(pdf, this.lstAdjust.orderImports[i], false)
          // END - table tổng cộng và điều chỉnh
        }
        this.count = 1
      }
    },
    // END - Bảng nhập điều chỉnh

    // Start - Bảng nhập hàng
    createTableInput(pdf) {
      if (this.lstPo.orderImports.length > 0) {
        const startY = (this.lstAdjust.orderImports.length === 0) ? { startY: 37 } : { }
        pdf.autoTable({
          ...startY,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
            // bottom: 0,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          body: [
            [
              { content: 'Loại: Nhập hàng', styles: { font: 'Ario-Bold', cellWidth: 115 } },
              { content: 'Tổng SL :', styles: { cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.lstPo.totalQuantity || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 15 } },
              { content: 'T.Tiền :', styles: { halign: 'right', cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.lstPo.totalPriceVat || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 30 } },
            ],
          ],
          headStyles: {
            Loai: { font: 'Ario-Bold', fontSize: 14 },
          },
          didDrawCell: data => {
            if (data.section === 'body' && data.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
            }
          },
        })

        for (let i = 0; i < this.lstPo.orderImports.length; i += 1) {
          const startYTotal = (i === 0) ? { startY: pdf.previousAutoTable.finalY } : {}
          pdf.autoTable({
            theme: 'plain',
            ...startYTotal,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Bold',
              fontSize: 7.5,
              textColor: 'black',
            },
            tableLineWidth: 0,
            tableLineColor: 'black',
            body: [
              [
                { content: `Số HĐ: ${this.lstPo.orderImports[i].redInvoiceNo}` },
                { content: `- Ngày HĐ: ${this.$formatISOtoVNI(this.lstPo.orderImports[i].orderDate)}` },
                { content: this.lstPo.orderImports[i].poNumber !== null ? `- Số PO: ${this.lstPo.orderImports[i].poNumber}` : '- Số PO:' },
                { content: `- Số nội bộ: ${this.lstPo.orderImports[i].internalNumber}` },
                { content: `- Mã nhập hàng: ${this.lstPo.orderImports[i].transCode}` },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 4) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          pdf.autoTable({
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            body: [
              [
                {
                  content: 'Tổng SL :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 132.5 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.lstPo.orderImports[i].totalQuantity)}`,
                  styles: {
                    halign: 'right', font: 'Ario-Bold', fillColor: 'white', cellWidth: 17.5,
                  },
                },
                {
                  content: 'T.Tiền :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 20 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.lstPo.orderImports[i].totalPriceVat)}`,
                  styles: {
                    font: 'Ario-Bold', halign: 'right', fillColor: 'white', cellWidth: 30,
                  },
                },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cursor.y + data.cell.height, data.cell.x + data.cell.width, data.cursor.y + data.cell.height)
              }
              if (data.section === 'body' && data.column.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          this.lstPo.orderImports[i].cats.forEach(data => {
            const row = [
              { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
              { content: `${data.catName}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
              { content: 'Tổng SL :', styles: { lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
              { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalPriceNotVat)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            ]
            this.bodyData.push(row)
            data.products.forEach(pro => {
              this.bodyData.push([
                { content: `${this.count}`, styles: { cellWidth: 10 } },
                { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
                { content: `${pro.productName}`, styles: { cellWidth: 80 } },
                { content: `${pro.uom1}`, styles: { cellWidth: 20, halign: 'center' } },
                { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.priceNotVat)}`, styles: { cellWidth: 20, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.amount)}`, styles: { cellWidth: 30, halign: 'right' } },
              ])
              this.count += 1
            })
          })

          pdf.autoTable({
            theme: 'grid',
            startY: pdf.previousAutoTable.finalY,
            pageBreak: 'avoid',
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            headStyles: {
              fillColor: 'white',
              font: 'Ario-Bold',
              textColor: 'black',
              fontSize: 9,
              lineWidth: 0.1,
              lineColor: 'black',
            },
            didDrawCell: data => {
              if (data.section === 'body' && data.row.raw.length === 6) {
                pdf.setDrawColor(200)
                pdf.setLineWidth(0.01)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 6) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
              }
            },
            columns: [
              { header: 'STT', dataKey: 'STT', cellWidth: 10 },
              { header: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35 },
              { header: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60 },
              { header: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15 },
              { header: 'SL', dataKey: 'SL', cellWidth: 15 },
              { header: 'Giá', dataKey: 'Giá', cellWidth: 20 },
              { header: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30 },
            ],
            body: [...this.bodyData],
          })
          this.bodyData = []

          // START - table tổng cộng và điều chỉnh
          this.createTableTotal(pdf, this.lstPo.orderImports[i], true)
          // END - table tổng cộng và điều chỉnh
        }
        this.count = 1
      }
    },
    // END - Bảng nhập hàng

    // START - Bảng nhập vay mượn
    createTableInputBorrow(pdf) {
      if (this.lstBorrow.orderImports.length > 0) {
        const startY = (this.lstAdjust.orderImports.length === 0 && this.lstPo.orderImports.length === 0) ? { startY: 37 } : { }
        pdf.autoTable({
          ...startY,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          body: [
            [
              { content: 'Loại: Nhập vay mượn', styles: { font: 'Ario-Bold', cellWidth: 115 } },
              { content: 'Tổng SL :', styles: { cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.lstBorrow.totalQuantity || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 15 } },
              { content: 'T.Tiền :', styles: { halign: 'right', cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.lstBorrow.totalPriceVat || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 30 } },
            ],
          ],
          didDrawCell: data => {
            if (data.section === 'body' && data.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
            }
          },
        })

        for (let i = 0; i < this.lstBorrow.orderImports.length; i += 1) {
          const startYTotal = (i === 0) ? { startY: pdf.previousAutoTable.finalY } : {}
          pdf.autoTable({
            theme: 'plain',
            ...startYTotal,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Bold',
              fontSize: 7.5,
              textColor: 'black',
            },
            tableLineWidth: 0,
            tableLineColor: 'black',
            body: [
              [
                { content: `Số HĐ: ${this.lstBorrow.orderImports[i].redInvoiceNo}`, halign: 'right' },
                { content: `- Ngày HĐ: ${this.$formatISOtoVNI(this.lstBorrow.orderImports[i].orderDate)}` },
                { content: this.lstBorrow.orderImports[i].poNumber !== null ? `- Số PO: ${this.lstBorrow.orderImports[i].poNumber}` : '- Số PO:' },
                { content: `- Số nội bộ: ${this.lstBorrow.orderImports[i].internalNumber}` },
                { content: `- Mã nhập hàng: ${this.lstBorrow.orderImports[i].transCode}` },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 4) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          pdf.autoTable({
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            body: [
              [
                {
                  content: 'Tổng SL :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 132.5 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.lstBorrow.orderImports[i].totalQuantity)}`,
                  styles: {
                    halign: 'right', font: 'Ario-Bold', fillColor: 'white', cellWidth: 17.5,
                  },
                },
                {
                  content: 'T.Tiền :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 20 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.lstBorrow.orderImports[i].totalPriceVat)}`,
                  styles: {
                    font: 'Ario-Bold', halign: 'right', fillColor: 'white', cellWidth: 30,
                  },
                },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cursor.y + data.cell.height, data.cell.x + data.cell.width, data.cursor.y + data.cell.height)
              }
              if (data.section === 'body' && data.column.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          this.lstBorrow.orderImports[i].cats.forEach(data => {
            const row = [
              { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
              { content: `${data.catName}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
              { content: 'Tổng SL :', styles: { lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
              { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalPriceVat)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            ]
            this.bodyData.push(row)
            data.products.forEach(pro => {
              this.bodyData.push([
                { content: `${this.count}`, styles: { cellWidth: 10 } },
                { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
                { content: `${pro.productName}`, styles: { cellWidth: 80 } },
                { content: `${pro.uom1}`, styles: { cellWidth: 20, halign: 'center' } },
                { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 20, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.total)}`, styles: { cellWidth: 30, halign: 'right' } },
              ])
              this.count += 1
            })
          })

          pdf.autoTable({
            theme: 'grid',
            startY: pdf.previousAutoTable.finalY,
            pageBreak: 'avoid',
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            headStyles: {
              fillColor: 'white',
              font: 'Ario-Bold',
              textColor: 'black',
              fontSize: 9,
              lineWidth: 0.1,
              lineColor: 'black',
            },
            didDrawCell: data => {
              if (data.section === 'body' && data.row.raw.length === 6) {
                pdf.setDrawColor(200)
                pdf.setLineWidth(0.01)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 6) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
              }
            },
            columns: [
              { header: 'STT', dataKey: 'STT', cellWidth: 10 },
              { header: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35 },
              { header: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60 },
              { header: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15 },
              { header: 'SL', dataKey: 'SL', cellWidth: 15 },
              { header: 'Giá', dataKey: 'Giá', cellWidth: 20 },
              { header: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30 },
            ],
            body: [...this.bodyData],
          })
          this.bodyData = []

          // START - table tổng cộng và điều chỉnh
          this.createTableTotal(pdf, this.lstBorrow.orderImports[i], false)
          // END - table tổng cộng và điều chỉnh
        }
        this.count = 1
      }
    },
    // END - Bảng nhập vay mượn

    // START - table tổng cộng và điều chỉnh
    createTableTotal(pdf, data, isPo) {
      if (data.redInvoiceNo !== 'null') {
        pdf.autoTable({
          theme: 'plain',
          startY: pdf.previousAutoTable.finalY + 2,
          pageBreak: 'avoid',
          margin: { left: 145, right: 5 },
          styles: {
            font: 'Ario-Bold',
            fontSize: 9,
            textColor: 'black',
          },
          tableLineWidth: 0.1,
          tableLineColor: [211, 211, 211],
          tableWidth: 60,
          body: [
            [
              { content: 'Điều chỉnh:', styles: { halign: 'right' } },
              { content: `${this.$formatNumberToLocale(data.adjusted)}` !== 'null' ? `${this.$formatNumberToLocale(data.adjusted)}` : '', styles: { halign: 'right' } },
            ],
            [
              { content: 'VAT:', styles: { halign: 'right' } },
              { content: isPo ? `${this.$formatNumberToLocale(data.vat)}` : '', styles: { halign: 'right' } },
            ],
            [
              { content: 'T.Cộng:', styles: { halign: 'right' } },
              { content: `${this.$formatNumberToLocale(data.totalPriceVat)}`, styles: { halign: 'right' } },
            ],
          ],
        })
      }
    },
    // END - table tổng cộng và điểu chỉnh
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
  border-width: 1px;
}
td {
  border-style: dashed;
  border-width: 1px;
}

.top-border-only {
  border-top: 2.5px solid rgb(100, 99, 99);
}
.bot-border-dotted {
  border-bottom: none;
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

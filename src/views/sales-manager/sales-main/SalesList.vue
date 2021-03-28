<template>
  <b-container

    class="bg-white shadow rounded mt-1 flex-grow-1"
  >
    <b-row class="mx-0 mt-1 pb-1">
      <b-col class="px-0">
        <b-row class="mx-0">
          <div
            v-for="(item,index) in 12"
            :key="index"
            class="bg-info text-white mt-1 mr-1 px-1 rounded-pill"
          >
            Hay mua
          </div>
        </b-row>
      </b-col>
      <b-icon-chevron-down
        v-b-toggle.collapse-1
        class="m-1 cursor-pointer"
        font-scale="2"
      />
    </b-row>

    <!-- START - List Product -->
    <b-collapse
      id="collapse-1"
      visible
    >
      <b-row class="mx-0">
        <b-col
          v-for="(product, index) in 8"
          :key="index"
          class="my-1"
          xl="3"
          md="4"
          sm="6"
        >
          <b-row>
            <b-col
              cols="4"
              class="px-0"
            >
              <b-img-lazy
                src="https://d1icd6shlvmxi6.cloudfront.net/gsc/JFWRY5/e6/5f/1d/e65f1dfd798b432f8c2fcd443160bf50/images/b%C3%A1n_h%C3%A0ng_m%E1%BB%9Bi_/u412.png?token=fa890fff7701d126955836ad2ed9addaa53af15f779531fe8eaa49ee3cb94229"
                fluid
                width="90px"
              />
            </b-col>

            <b-col class="">
              <div
                class="text-dark"
              >
                Sữa dinh dưỡng Vinamilk không đường- Bịch 220m
              </div>
              <div
                class="my-1"
              >
                SP002
              </div>
              <div class="text-dark font-weight-bold">
                7.000
              </div>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
    </b-collapse>
    <!-- END - List Product -->

  </b-container>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

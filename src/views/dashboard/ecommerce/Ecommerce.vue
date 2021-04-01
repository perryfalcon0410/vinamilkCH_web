<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="4"
        md="6"
      >
        <ecommerce-medal :data="data.congratulations" />
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="4">
        <b-row class="match-height">
          <!-- Bar Chart - Orders -->
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-order-chart :data="data.statisticsOrder" />
          </b-col>
          <!--/ Bar Chart - Orders -->
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-profit-chart :data="data.statisticsProfit" />
          </b-col>
          <b-col
            lg="12"
            md="6"
          >
            <ecommerce-earnings-chart :data="data.earningsChart" />
          </b-col>
        </b-row>
      </b-col>

      <!-- Revenue Report Card -->
      <b-col lg="8">
        <ecommerce-revenue-report :data="data.revenue" />
      </b-col>
      <!--/ Revenue Report Card -->
    </b-row>

    <b-row class="match-height">
      <!-- Company Table Card -->
      <b-col lg="8">
        <ecommerce-company-table :table-data="data.companyTable" />
      </b-col>
      <!--/ Company Table Card -->

      <!-- Developer Meetup Card -->
      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-meetup :data="data.meetup" />
      </b-col>
      <!--/ Developer Meetup Card -->

      <!-- Browser States Card -->
      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-browser-states />
      </b-col>
      <!--/ Browser States Card -->

      <!-- Goal Overview Card -->
      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-goal-overview :data="data.goalOverview" />
      </b-col>
      <!--/ Goal Overview Card -->

      <!-- Transaction Card -->
      <b-col
        lg="4"
        md="6"
      >
        <ecommerce-transactions :data="data.transactionData" />
      </b-col>
      <!--/ Transaction Card -->
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import { getUserData } from '@/auth/utils'
import EcommerceMedal from './components/EcommerceMedal.vue'
import EcommerceStatistics from './components/EcommerceStatistics.vue'
import EcommerceRevenueReport from './components/EcommerceRevenueReport.vue'
import EcommerceOrderChart from './components/EcommerceOrderChart.vue'
import EcommerceProfitChart from './components/EcommerceProfitChart.vue'
import EcommerceEarningsChart from './components/EcommerceEarningsChart.vue'
import EcommerceCompanyTable from './components/EcommerceCompanyTable.vue'
import EcommerceMeetup from './components/EcommerceMeetup.vue'
import EcommerceBrowserStates from './components/EcommerceBrowserStates.vue'
import EcommerceGoalOverview from './components/EcommerceGoalOverview.vue'
import EcommerceTransactions from './components/EcommerceTransactions.vue'

export default {
  components: {
    BRow,
    BCol,

    EcommerceMedal,
    EcommerceStatistics,
    EcommerceRevenueReport,
    EcommerceOrderChart,
    EcommerceProfitChart,
    EcommerceEarningsChart,
    EcommerceCompanyTable,
    EcommerceMeetup,
    EcommerceBrowserStates,
    EcommerceGoalOverview,
    EcommerceTransactions,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/ecommerce/data')
      .then(response => {
        this.data = response.data

        // ? Your API will return name of logged in user or you might just directly get name of logged in user
        // ? This is just for demo purpose
        const userData = getUserData()
        this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
      })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>

<template>
  <b-form>
    <v-card-actions
      :title="'Thông tin chung'"
    >
      <b-col
        xl
        md="3"
        sm="4"
      >
        <label>
          Thời gian: {{ basicInfo.dayInMonth }}
        </label>
      </b-col>
      <b-col
        xl
        md="3"
        sm="4"
      >
        <label>
          Số ngày bán hàng thực tế: {{ basicInfo.saleDayInMonth }}
        </label>
      </b-col>
      <b-col
        xl
        md="3"
        sm="4"
      >
        <label>
          Số ngày bán hàng trong tháng: {{ basicInfo.salePlanInMonth }}
        </label>
      </b-col>
    </v-card-actions>
  </b-form>
</template>

<script>
import VCardActions from '@/@core/components/v-card-actions/VCardActions.vue'
import PoAutoService from '@/views/purchases/api-service'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      basicInfo: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.basicInfo = PoAutoService.getPoCreateBasicInfo()
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            this.basicInfo = res.data
          }
        })
    },
  },
}
</script>

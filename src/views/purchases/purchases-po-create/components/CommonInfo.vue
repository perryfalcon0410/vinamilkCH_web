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
          Thời gian:
        </label>
      </b-col>
      <b-col
        xl
        md="3"
        sm="4"
      >
        <label>
          Số ngày bán hàng thực tế:
        </label>
      </b-col>
      <b-col
        xl
        md="3"
        sm="4"
      >
        <label>
          Số ngày bán hàng trong tháng:
        </label>
      </b-col>
    </v-card-actions>
  </b-form>
</template>

<script>
import VCardActions from '@/@core/components/v-card-actions/VCardActions.vue'

export default {
  components: {
    VCardActions,
  },

}
</script>

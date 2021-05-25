<!-- START - Pagination -->
<template>
  <b-row
    v-show="totalElements"
    class="v-pagination px-1 mx-0"
    align-h="between"
    align-v="center"
  >
    <div
      class="d-flex align-items-center"
    >
      <span
        class="text-nowrap"
      >
        Số hàng hiển thị
      </span>
      <b-form-select
        v-model="elementSize"
        size="sm"
        :options="paginationOptions"
        class="mx-1"
        @input="(value)=>props.perPageChanged({currentPerPage: value})"
      />
      <span
        class="text-nowrap"
      >{{ pageNumber === 1 ? 1 : (pageNumber * elementSize) - elementSize +1 }}
        -
        {{ (elementSize * pageNumber) > totalElements ?
          totalElements : (elementSize * pageNumber) }}
        của {{ totalElements }} mục </span>
    </div>
    <b-pagination
      v-model="pageNumber"
      :total-rows="totalElements"
      :per-page="elementSize"
      first-number
      last-number
      align="right"
      prev-class="prev-item"
      next-class="next-item"
      class="mt-1"
      @input="(value)=>props.pageChanged({currentPage: value})"
    >
      <template slot="prev-text">
        <feather-icon
          icon="ChevronLeftIcon"
          size="18"
        />
      </template>
      <template slot="next-text">
        <feather-icon
          icon="ChevronRightIcon"
          size="18"
        />
      </template>
    </b-pagination>
  </b-row>
</template>
<!-- END - Pagination -->

<script>
import commonData from '@/@db/common'

export default {
  props: {
    totalElements: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
    }
  },
}

</script>

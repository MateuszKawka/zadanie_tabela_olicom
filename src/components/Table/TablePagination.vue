<template>
  <nav
    class="pagination is-rounded is-justify-content-center"
    role="navigation"
    aria-label="pagination"
  >
    <button
      class="pagination-previous button"
      :disabled="currentPage === 1"
      @click="previousPage"
    >
      Previous
    </button>
    <p class="pagination-link is-current">{{ currentPage }}</p>

    <span class="pagination-ellipsis" v-if="currentPage !== quantityOfPages"
      >&hellip;</span
    >
    <p
      class="pagination-link"
      @click="setPage(quantityOfPages)"
      v-if="currentPage !== quantityOfPages"
    >
      {{ quantityOfPages }}
    </p>
    <button
      class="pagination-next button"
      :disabled="currentPage === quantityOfPages"
      @click="nextPage"
    >
      Next page
    </button>
  </nav>
</template>

<script>
export default {
  name: "TablePagination",
  props: {
    currentPage: {
      type: Number,
    },
    quantityOfPages: {
      type: Number,
    },
  },
  methods: {
    nextPage() {
      this.$emit("nextPage");
    },
    previousPage() {
      this.$emit("previousPage");
    },
    setPage(page) {
      this.$emit("setPage", page);
    },
  },
};
</script>
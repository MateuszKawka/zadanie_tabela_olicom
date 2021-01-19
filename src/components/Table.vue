<template>
  <div>
    <div class="mt-5 table-container">
      <div class="field" v-if="search">
        <p class="control">
          <input
            class="input"
            type="text"
            placeholder="Search"
            v-model="searchQuery"
          />
        </p>
      </div>
      <Spinner v-if="!loaded" />
      <table class="table is-hoverable is-fullwidth" v-else>
        <thead>
          <tr>
            <th
              :class="{ 'is-clickable': sorting }"
              v-for="column in columnsData"
              :key="column"
              @click="sort(column)"
            >
              {{ createColumnName(column) }}

              <svg
                viewBox="0 0 24 24"
                fill="black"
                width="18px"
                height="18px"
                v-if="sorting"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
                />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody v-if="currentRowsData.length">
          <TableRow
            v-for="(rowData, index) in currentRowsData"
            :rowData="rowData"
            :columnsData="columnsData"
            :key="`row__${index}`"
          />
        </tbody>
        <tbody v-else>
          <p>No data</p>
        </tbody>
      </table>
    </div>
    <TablePagination
      :quantityOfPages="quantityOfPages"
      :currentPage="page"
      @nextPage="nextPage"
      @previousPage="previousPage"
      v-if="pagination"
    />
  </div>
</template>

<script>
import { getData } from "../services/api";
import {
  sortDataAscending,
  sortDataDescending,
  flattenObject,
} from "../helpers";
import TableRow from "./Table/TableRow";
import TablePagination from "./Table/TablePagination";
import Spinner from "./Spinner";
export default {
  data() {
    return {
      rowsData: [],
      sorted: false,
      page: 1,
      searchQuery: "",
      loaded: false,
    };
  },
  props: {
    columns: {
      type: String,
      required: true,
    },
    search: {
      type: Boolean,
      default: true,
    },
    sorting: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    apiEndpoint: {
      type: String,
      required: true,
    },
  },
  computed: {
    columnsData() {
      return this.columns.trim().split(", ");
    },
    currentRowsData() {
      if (this.pagination && this.filteredData.length > 3) {
        const lastElement = this.page === 1 ? 3 : this.page * 3;

        return this.filteredData.slice(lastElement - 3, lastElement);
      } else {
        return this.filteredData;
      }
    },
    filteredData() {
      return this.rowsData.filter((item) => {
        let values = Object.values(flattenObject(item));
        if (
          values.find((el) => {
            return el
              .toString()
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase());
          })
        ) {
          return item;
        }
      });
    },
    quantityOfPages() {
      return Math.ceil(this.filteredData.length / 3);
    },
  },
  methods: {
    createColumnName(column) {
      return column.replace(/\./g, " ");
    },
    sort(key) {
      if (this.sorting) {
        if (this.sorted) {
          this.rowsData = sortDataAscending(this.rowsData, key);
          this.sorted = false;
        } else {
          this.rowsData = sortDataDescending(this.rowsData, key);
          this.sorted = true;
        }
      }
    },
    nextPage() {
      this.page = this.page + 1;
    },
    previousPage() {
      this.page = this.page - 1;
    },
    setPage(page) {
      this.page = page;
    },
    joinData() {
      this.rowsData = 11;
    },
  },
  components: {
    TableRow,
    TablePagination,
    Spinner,
  },
  watch: {
    rowsData() {
      this.$emit("newData");
    },
  },
  mounted() {
    getData(this.apiEndpoint)
      .then((data) => (this.rowsData = data))
      .then(() => (this.loaded = true));
  },
};
</script>
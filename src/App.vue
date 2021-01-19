<template>
  <div id="app">
    <div class="container p-4">
      <Table
        :columns="columnsNames"
        :pagination="pagination"
        :sorting="sorting"
        :search="search"
        :apiEndpoint="apiEndpoint"
      />
    </div>
  </div>
</template>

<script>
import Table from "./components/Table";

export default {
  name: "App",
  data() {
    return {
      columnsNames: "name, username, email, company.name, phone, address.city",
      pagination: true,
      sorting: true,
      search: true,
      apiEndpoint: "https://jsonplaceholder.typicode.com/users",
    };
  },
  components: {
    Table,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<template>
  <tr>
    <td v-for="item in columnsData" :key="item">
      <div v-if="isEmail(flattenData[item])">
        <a :href="`mailto:${flattenData[item]}}`">{{ flattenData[item] }}</a>
      </div>
      <div v-else>
        {{ flattenData[item] }}
      </div>
    </td>
  </tr>
</template>

<script>
import { flattenObject } from "../../helpers";

export default {
  name: "TableRow",
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    columnsData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    flattenData() {
      return flattenObject(this.rowData);
    },
  },
  methods: {
    isEmail(str) {
      const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
      return regexp.test(str);
    },
  },
};
</script>
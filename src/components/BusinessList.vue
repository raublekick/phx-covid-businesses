<template>
  <section>
    <div class="mt-4" v-for="item in items" :key="item.BID">
      <business-item :item="item" />
    </div>
  </section>
</template>
<script>
import BusinessItem from "@/components/BusinessItem";

export default {
  name: "BusinessList",
  data() {
    return {};
  },
  props: {
    items: {
      type: Array
    }
  },
  components: {
    BusinessItem
  }
};
</script>
<style scoped></style>

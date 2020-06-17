<template>
  <section>
    <div class="mt-4" v-for="item in items" :key="item.BID">
      <business-item @clicked="clicked" :item="item" />
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
  },
  methods: {
    clicked(value) {
      this.$emit("clicked", value);
    }
  }
};
</script>
<style scoped></style>

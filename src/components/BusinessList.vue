<template>
  <section>
    <div class="mt-4" v-for="(item, i) in items" :key="item.BID">
      <business-item @clicked="clicked" :item="item" :persistent-tooltip="i === 0" />
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

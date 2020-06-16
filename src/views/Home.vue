<template>
  <div class="home container">
    <div class="columns">
      <div class="column">
        <map-view :items="businesses" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapView from "@/components/Map";
import businesses from "@/businesses";

export default {
  name: "Home",
  data() {
    return {
      businesses: businesses
    };
  },
  components: {
    MapView
  },
  computed: {},

  created() {}
};
</script>

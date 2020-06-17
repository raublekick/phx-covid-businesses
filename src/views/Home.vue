<template>
  <div class="home container">
    <div class="columns">
      <div class="column">
        <b-message
          title="About this map"
          type="is-info"
          has-icon
          aria-close-label="Close message"
        >
          Responses are manually moderated and will typically be updated the
          next day or so.
          <div>
            <b-button
              tag="a"
              type="is-primary"
              target="_blank"
              href="https://docs.google.com/forms/d/1ikzeLf68sLK1XZqIoXMKJUL7ooxR9n7744ESVJSjskE"
              >Fill out form</b-button
            >
          </div>
        </b-message>

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

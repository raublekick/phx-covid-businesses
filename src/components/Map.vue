<template>
  <section id="map-section">
    <l-map
      v-show="items.length"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer :url="url" :attribution="attribution" :id="id" />
      <l-marker
        v-for="item in items"
        :key="item.id"
        :draggable="false"
        :lat-lng.sync="item.latlng"
        ref="markersRef"
      >
        <l-icon
          :icon-url="icons[item.zone]"
          :icon-size="iconSize"
          :icon-anchor="iconAnchor"
          :popup-anchor="popupAnchor"
        >
        </l-icon>
        <l-popup v-show="true">
          <h1>
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </h1>
          <div>{{ item.address }}</div>
          <div>{{ item.businessType }}</div>
          <div>
            <strong>Employees wearing masks:</strong> {{ item.employeeMasks }}
          </div>
          <div>
            <strong>Customers wearing masks:</strong> {{ item.customerMasks }}
          </div>
          <div v-if="item.other">
            <strong>Other measures taken:</strong> {{ item.other }}
          </div>
          <div>Last updated: {{ item.timestamp | formatDateTime }}</div>
        </l-popup>
      </l-marker>
    </l-map>
  </section>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import * as _ from "lodash";
// import { Icon } from "leaflet";

// delete Icon.Default.prototype._getIconUrl;
// Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png")
// });

export default {
  name: "Map",
  data() {
    return {
      zoom: 12,
      id: "mapbox/streets-v11",
      url:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=" +
        process.env.VUE_APP_MAPBOX_KEY,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mapOptions: {
        zoomSnap: 0.5
      },
      iconSize: [45, 37],
      iconAnchor: [11, 36],
      popupAnchor: [0, -26],
      icons: [
        require("../assets/pin-blue.png"),
        require("../assets/pin-red.png"),
        require("../assets/pin-green.png"),
        require("../assets/pin-yellow.png")
      ]
    };
  },
  props: {
    items: {
      type: Array
    },
    center: {
      default: latLng(33.4515, -112.07)
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },
  computed: {},
  watch: {
    center: function(val) {
      _.forEach(this.markerObjects, item => {
        if (item._latlng.lat === val.lat && item._latlng.lng === val.lng) {
          item.openPopup();
        }
      });
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.markerObjects = this.$refs.markersRef.map(ref => ref.mapObject);
    });
  }
};
</script>

<style scoped>
#map-section > * {
  z-index: 1;
}
</style>

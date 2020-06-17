<template>
  <section>
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
      >
        <l-icon
          :icon-url="icons[item.zone]"
          :icon-size="iconSize"
          :icon-anchor="iconAnchor"
          :popup-anchor="popupAnchor"
        >
        </l-icon>
        <l-popup>
          <h1>
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </h1>
          <div>{{ item.address }}</div>
          <div>
            <strong>Employees wearing masks:</strong> {{ item.employeeMasks }}
          </div>
          <div>
            <strong>Customers wearing masks:</strong> {{ item.customerMasks }}
          </div>
          <div v-if="item.other">
            <strong>Other measures taken:</strong> {{ item.other }}
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </section>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
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
      center: latLng(33.4515, -112.07),
      id: "mapbox/streets-v11",
      url:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mapOptions: {
        zoomSnap: 0.5
      },
      iconSize: [45, 37],
      iconAnchor: [11, 36],
      popupAnchor: [0, -26],
      icons: [
        require("../assets/dark-blue.png"),
        require("../assets/dark-red.png"),
        require("../assets/dark-green.png"),
        require("../assets/dark-yellow.png")
      ]
    };
  },
  props: {
    items: {
      type: Array
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

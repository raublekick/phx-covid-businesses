import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

Vue.filter("formatDateTime", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY h:mm A");
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

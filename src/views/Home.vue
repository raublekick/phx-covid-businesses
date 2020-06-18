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
          <p class="mt-4">
            We currently use the latest response for a business location and
            trust that it is accurate. Responses are manually updated on this
            website with a delay of 1-2 days.
          </p>
          <div class="mt-4">
            <b-button
              tag="a"
              type="is-primary"
              target="_blank"
              href="https://docs.google.com/forms/d/1ikzeLf68sLK1XZqIoXMKJUL7ooxR9n7744ESVJSjskE"
              >Fill out form</b-button
            >
            - or -
            <b-button
              tag="a"
              type="is-info"
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/13cf0sM_IS6TAH09J3KCVOwZdHyakwG1BmgEWwqHvCsU"
              >View submission data</b-button
            >
          </div>
        </b-message>

        <map-view :items="filtered" :center="center" />

        <section class="mt-4">
          <b-field grouped group-multiline>
            <b-field label="Search">
              <b-input
                v-model="filter"
                placeholder="Search..."
                type="search"
                icon="magnify"
                icon-clickable
              >
              </b-input>
            </b-field>

            <b-field label="Business Type">
              <b-select placeholder="Select a value" v-model="businessType">
                <option value="">All</option>
                <option value="Restaurant / Bar / Food Service"
                  >Restaurant / Bar / Food Service</option
                >
                <option value="Grocery Store">Grocery Store</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </b-select>
            </b-field>

            <b-field label="Services Offered">
              <b-select placeholder="Select a value" v-model="services">
                <option value="">All</option>
                <option value="Dine-in / In-store shopping"
                  >Dine-in / In-store shopping</option
                >
                <option value="Take-out / Pick-up">Take-out / Pick-up</option>
                <option value="Retail">Retail</option>
                <option value="Delivery">Delivery</option>
                <option value="Curbside / Touchless Pick-up"
                  >Curbside / Touchless Pick-up</option
                >
              </b-select>
            </b-field>

            <b-field label="Employees wearing masks">
              <b-select placeholder="Select a value" v-model="employeeMasks">
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </b-select>
            </b-field>

            <b-field label="Customers wearing masks">
              <b-select placeholder="Select a value" v-model="customerMasks">
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </b-select>
            </b-field>
          </b-field>
        </section>

        <b-notification :closable="false" has-icon icon="information">
          Click a pin to go to that item on the map.
        </b-notification>

        <business-list class="mt-4" :items="filtered" @clicked="setCenter" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapView from "@/components/Map";
import BusinessList from "@/components/BusinessList";
import { latLng } from "leaflet";
import * as _ from "lodash";
import businesses from "@/businesses";

export default {
  name: "Home",
  data() {
    return {
      businesses: _.map(businesses, item => {
        return {
          id: item.BID,
          name: item.Name,
          latlng: [item.LAT, item.LNG],
          url: item.URL,
          address: item.Address,
          employeeMasks: item.empMask,
          customerMasks: item.custMask,
          other: item.Other,
          otherTags: item.Other.split(", "),
          notes: item.Notes,
          zone: item.ZONE,
          businessType: item.BizType,
          businessTypeTags: item.BizType.split(", "),
          services: item.Services,
          serviceTags: item.Services.split(", "),
          timestamp: item.Timestamp
        };
      }),
      filter: "",
      customerMasks: null,
      employeeMasks: null,
      businessType: null,
      services: null,
      center: latLng(
        process.env.VUE_APP_CENTER_LAT || 33.4515,
        process.env.VUE_APP_CENTER_LNG || -112.07
      )
    };
  },
  components: {
    MapView,
    BusinessList
  },
  computed: {
    filtered() {
      var filtered = this.businesses;

      if (this.filter) {
        filtered = this.search(filtered, this.filter);
      }

      if (this.businessType) {
        filtered = this.filterBusinessType(filtered, this.businessType);
      }

      if (this.services) {
        filtered = this.filterServices(filtered, this.services);
      }

      if (this.employeeMasks) {
        filtered = this.filterEmployeeMasks(filtered, this.employeeMasks);
      }

      if (this.customerMasks) {
        filtered = this.filterCustomerMasks(filtered, this.customerMasks);
      }

      return filtered;
    }
  },

  methods: {
    setCenter(value) {
      this.center = latLng(value[0], value[1]);
    },
    search(collection, text) {
      var that = this;
      return _.filter(collection, function(object) {
        var search = that.deepSearch(object, text.toLowerCase());
        return _.keys(search).length > 0;
      });
    },
    deepSearch(collection, predicate, thisArg) {
      if (_.isFunction(predicate)) {
        predicate = _.iteratee(predicate, thisArg);
      } else {
        var keys = _.flatten(_.tail(arguments));
        if (typeof keys === "string") {
          keys = keys.toLowerCase();
        }
        predicate = function(val) {
          if (typeof val === "string") {
            val = val.toLowerCase();
          }
          return _.includes(val, keys);
        };
      }
      var that = this;
      return _.transform(collection, function(memo, val, key) {
        var include = predicate(val, key);
        if (!include && _.isObject(val)) {
          val = that.deepSearch(val, predicate);
          include = !_.isEmpty(val);
        }
        if (include) {
          _.isArray(collection) ? memo.push(val) : (memo[key] = val);
        }
      });
    },
    filterBusinessType(collection, value) {
      return _.filter(collection, function(object) {
        return object.businessType.includes(value);
      });
    },
    filterServices(collection, value) {
      return _.filter(collection, function(object) {
        return object.services.includes(value);
      });
    },
    filterEmployeeMasks(collection, value) {
      return _.filter(collection, function(object) {
        return object.employeeMasks === value;
      });
    },
    filterCustomerMasks(collection, value) {
      return _.filter(collection, function(object) {
        return object.customerMasks === value;
      });
    }
  },

  created() {}
};
</script>

<style>
.mt-4 {
  margin-top: 1em;
}
.mr-4 {
  margin-right: 1em;
}
.ml-4 {
  margin-left: 1em;
}
</style>

<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left">
          <b-tooltip position="is-left" label="Go to this business on the map" :always="d_persistentTooltip" animated>
            <figure @mouseenter="handleIconHover" class="image is-48x48" @click="clicked(item.latlng)">
              <a href="#"><img :src="icons[item.zone]" :alt="item.title"/></a>
            </figure>
          </b-tooltip>
        </div>
        <div class="media-content">
          <p class="title is-4">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </p>
          <p class="subtitle is-6">{{ item.address }}</p>
          <p>{{ item.businessType }}</p>
        </div>
      </div>

      <div class="content">
        <!-- <a v-if="item.url" :href="item.url" target="_blank" :title="item.title"
          ><b-icon icon="link" size="is-small"> </b-icon> {{ item.url }}
        </a>-->

        <div>
          <strong>Employees wearing masks:</strong>
          {{ item.employeeMasks }}
        </div>
        <div>
          <strong>Customers wearing masks:</strong>
          {{ item.customerMasks }}
        </div>
        <div v-if="item.other">
          <strong>Other measures taken:</strong>
        </div>
        <b-taglist>
          <b-tag v-for="tag in tags" :key="tag" type="is-primary">{{
            tag
          }}</b-tag>
        </b-taglist>

        <b-taglist>
          <b-tag v-for="tag in services" :key="tag" type="is-primary">{{
            tag
          }}</b-tag>
        </b-taglist>

        <read-more :text="item.notes" align="right"></read-more>

        <br />
        <time :datetime="item.timestamp"
          >Last updated: {{ item.timestamp | formatDateTime }}
          
          <notification-icon
            v-if="daysSinceUpdated > 14"
            message="It has been two or more weeks since this information has been updated. Information displayed here may have changed."
            icon="alert"
            level="warning"
          />
        </time>
        <b-notification
          v-if="showWarning"
          type="is-warning"
          has-icon
          :closable="false"
          role="alert"
        >
          <p>
            As of June 19, 2020 cities across the valley are beginning to issue
            mask requirements.
            <a
              href="https://www.azfamily.com/news/continuing_coverage/coronavirus_coverage/list-these-arizona-cities-are-requiring-face-masks-in-public/article_83403294-b1a0-11ea-9c3a-abc7286a8c77.html"
              target="_blank"
              >Ongoing coverage</a
            >
          </p>
          <p>
            Please keep in mind that entries older than this may no longer
            reflect the current situation.
          </p>
        </b-notification>
      </div>
    </div>
  </div>
</template>
<script>
import ReadMore from "@raublekick/vue-read-more";
import * as _ from "lodash";
import moment from "moment";
import NotificationIcon from "./reusable/NotificationIcon";
export default {
  name: "BusinessItem",
  data() {
    return {
      icons: [
        require("../assets/dark-blue.png"),
        require("../assets/dark-red.png"),
        require("../assets/dark-green.png"),
        require("../assets/dark-yellow.png")
      ],
      d_persistentTooltip: false
    };
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    persistentTooltip: {
      type: Boolean,
      required: false
    }
  },

  components: {
    NotificationIcon,
    ReadMore
  },

  computed: {
    tags() {
      return _.filter(this.item.otherTags, tag => {
        return tag != "";
      });
    },
    services() {
      return _.filter(this.item.serviceTags, tag => {
        return tag != "";
      });
    },
    daysSinceUpdated() {
      var now = moment();

      return now.diff(this.item.timestamp, "days");
    },
    showWarning() {
      var now = moment();
      // now THIS is coding
      if (
        this.item.address &&
        this.item.address.toLowerCase().includes("phoenix") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("avondale") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("chandler") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("gilbert") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("scottsdale") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("surprise") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("tempe") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      } else if (
        this.item.address &&
        this.item.address.toLowerCase().includes("tolleson") &&
        now.diff(this.item.timestamp, "days") > 0
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    clicked(value) {
      this.$emit("clicked", value);
    },
    handleIconHover() {
      this.d_persistentTooltip = false;
    }
  },
  mounted() {
    if(this.persistentTooltip) {
      this.d_persistentTooltip = true;
    }
  }
};
</script>
<style lang="sass"></style>

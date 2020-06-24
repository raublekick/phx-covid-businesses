<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left">
          <b-tooltip
            position="is-left"
            label="Go to this business on the map"
            :always="d_persistentTooltip"
            animated
          >
            <figure
              @mouseenter="handleIconHover"
              class="image is-48x48"
              @click="clicked(item.latlng)"
            >
              <a href="#">
                <img :src="icons[item.zone]" :alt="item.title" />
              </a>
            </figure>
          </b-tooltip>
        </div>
        <div class="media-content d-flex">
          <p class="title is-4">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </p>
          <span class="subtitle is-6">{{ item.address }}</span>
          <span>{{ item.businessType }}</span>
        </div>
        <div class="details">
          <div class="last-updated" :class="{'warning': daysSinceUpdated > 14}">
            <notification-icon
              v-if="daysSinceUpdated > 14"
              message="It has been two or more weeks since this information was last updated."
              icon="alert"
              level="warning"
            />&nbsp;
            <time
              :datetime="item.timestamp"
            >Last updated: {{ item.timestamp | formatDateTime }}</time>
          </div>
          <div class="mask-audit">
            <div>
              <b-icon icon="check" v-if="item.employeeMasks === 'Yes'"></b-icon>
              <b-icon icon="help-circle-outline" v-if="item.employeeMasks === 'Maybe'"></b-icon>
              <b-icon icon="cancel" v-if="item.employeeMasks === 'No'"></b-icon>
              <strong>Employees wearing masks: {{item.employeeMasks}}</strong>
            </div>

            <div>
              <b-icon icon="check" v-if="item.customerMasks === 'Yes'"></b-icon>
              <b-icon icon="help-circle-outline" v-if="item.customerMasks === 'Maybe'"></b-icon>
              <b-icon icon="cancel" v-if="item.customerMasks === 'No'"></b-icon>
              <strong>Customers wearing masks: {{item.customerMasks}}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div v-if="item.other">
          <strong>Preventive measures taken:</strong>
        </div>
        <b-taglist>
          <b-tag v-for="tag in tags" :key="tag" type="is-primary">{{ tag }}</b-tag>
        </b-taglist>

        <strong>Services:</strong>
        <b-taglist>
          <b-tag v-for="tag in services" :key="tag" type="is-primary">{{ tag }}</b-tag>
        </b-taglist>
        
        <strong v-if="item.notes.length">Comments:</strong>
        <read-more :text="item.notes" align="right"></read-more>

        <br />

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
            >Ongoing coverage</a>
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
      return moment().diff(this.item.timestamp, "days");
    },
    showWarning() {
      const cityList = [
        "phoenix",
        "avondale",
        "chandler",
        "gilbert",
        "scottsdale",
        "surprise",
        "tempe",
        "tolleson"
      ];

      return (
        this.daysSinceUpdated > 0 &&
        cityList.some(city => {
          return (
            this.item.address && this.item.address.toLowerCase().includes(city)
          );
        })
      );
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
    if (this.persistentTooltip) {
      this.d_persistentTooltip = true;
    }
  }
};
</script>
<style>
.media-content.d-flex {
  display: flex;
  flex-direction: column;
}
.media-content.d-flex span {
  margin: 0;
}
.last-updated {
  display: inline-block;
  margin-bottom: 4px;
  font-weight: bold;
}
.last-updated.warning {
  border-bottom: 2px dashed #ffdd57;
}
.tags {
  margin-bottom: 0px !important;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>

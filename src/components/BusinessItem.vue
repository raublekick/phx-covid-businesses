<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left">
          <figure class="image is-48x48" @click="clicked(item.latlng)">
            <a href="#"><img :src="icons[item.zone]" :alt="item.title"/></a>
          </figure>
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

          <b-notification
            v-if="daysSinceUpdated > 14"
            type="is-info"
            has-icon
            :closable="false"
            role="alert"
          >
            It has been two or more weeks since this information has been
            updated. Information displayed here may have changed.
          </b-notification>
        </time>
        <b-notification
          v-if="showWarning"
          type="is-warning"
          has-icon
          :closable="false"
          role="alert"
        >
          <p>
            The city of Phoenix has passed mandatory mask restrictions on June
            19, 2020.
            <a
              href="https://www.phoenix.gov/cityclerksite/City%20Council%20Meeting%20Files/6-19%20Back-Up%20Information.pdf"
              target="_blank"
              >Read more</a
            >
          </p>
          <p>
            Please keep in mind that entries older than this may now be
            outdated.
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

export default {
  name: "BusinessItem",
  data() {
    return {
      icons: [
        require("../assets/dark-blue.png"),
        require("../assets/dark-red.png"),
        require("../assets/dark-green.png"),
        require("../assets/dark-yellow.png")
      ]
    };
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  components: {
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

      return now.diff(this.item.timestamp, "days"); // 1
    },
    showWarning() {
      var now = moment();
      if (
        this.item.address &&
        this.item.address.toLowerCase().includes("phoenix") &&
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
    }
  }
};
</script>
<style lang="sass"></style>

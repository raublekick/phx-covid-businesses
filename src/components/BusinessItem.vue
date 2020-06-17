<!-- TODO: Unit test -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- Add icon if saved -->
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="icons[item.zone]" :alt="item.title" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </p>
          <p class="subtitle is-6">{{ item.address }}</p>
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

        <read-more :text="item.notes" align="right"></read-more>

        <br />
        <!-- <time :datetime="item.updatedAt"
          >Updated: {{ item.updatedAt | formatDateTime }}</time
        > -->
      </div>
    </div>
  </div>
</template>
<script>
import ReadMore from "@raublekick/vue-read-more";
import * as _ from "lodash";

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
    }
  }
};
</script>
<style lang="sass"></style>

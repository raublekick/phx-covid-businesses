<template>
  <b-navbar fixed-top :class="{ 'navigation-bar': true, shadow: scrolled }">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <!-- <b-icon icon="handshake" size="is-large" type="is-primary"> </b-icon> -->
        <img :src="require('../assets/mask.png')" title="Preventative mask" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        Home
      </b-navbar-item>
      <b-navbar-item
        target="_blank"
        href="https://docs.google.com/spreadsheets/d/13cf0sM_IS6TAH09J3KCVOwZdHyakwG1BmgEWwqHvCsU"
      >
        View Submission Data
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        type="navbar-item"
        :to="{ name: 'About' }"
      >
        About
      </b-navbar-item>
      <b-navbar-item>
        <b-button
          tag="a"
          type="is-primary"
          target="_blank"
          href="https://docs.google.com/forms/d/1ikzeLf68sLK1XZqIoXMKJUL7ooxR9n7744ESVJSjskE"
          >Submit Your Experience</b-button
        >
      </b-navbar-item>
    </template>

    <template slot="end"> </template>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      scrolled: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 0;
    }
  }
};
</script>

<style>
.navigation-bar {
  z-index: 10;
}
.navigation-bar.shadow {
  box-shadow: 0px 0px 4px #666;
}
</style>

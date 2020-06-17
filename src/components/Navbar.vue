<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <b-icon icon="handshake" size="is-large" type="is-primary"> </b-icon>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        Home
      </b-navbar-item>
      <b-navbar-item
        target="_blank"
        href="https://docs.google.com/forms/d/1ikzeLf68sLK1XZqIoXMKJUL7ooxR9n7744ESVJSjskE"
      >
        Add Business
      </b-navbar-item>
      <b-navbar-item
        target="_blank"
        href="https://docs.google.com/spreadsheets/d/13cf0sM_IS6TAH09J3KCVOwZdHyakwG1BmgEWwqHvCsU"
      >
        View Results
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item type="navbar-item" :to="{ name: 'About' }">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end"> </template>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  computed: {}
};
</script>

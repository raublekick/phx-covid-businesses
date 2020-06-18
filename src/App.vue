<template>
  <div id="app">
    <nav-menu />
    <div class="container">
      <router-view />
    </div>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Phoenix Business Practices During COVID-19</strong> on
          <a href="https://github.com/raublekick/phx-covid-businesses">GitHub</a
          >. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        <div>
          Icons made by
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
            >Smashicons</a
          >
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavMenu from "@/components/Navbar";
export default {
  data() {
    return {};
  },
  components: {
    NavMenu
  }
};
</script>

<style>
.navbar {
  margin-bottom: 0.75rem;
}
</style>

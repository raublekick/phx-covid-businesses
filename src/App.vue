<template>
  <div id="app">
    <nav-menu />
    <div class="container">
      <router-view />
    </div>
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

<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Footer from "./components/Footer.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "app",
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {};
  },
  mounted() {
    const side0 = this.getSide0();
    const side1 = this.getSide1();
    if (side0) {
      this.setSide0(side0);
    }
    if (side1) {
      this.setSide1(side1);
    }
  },
  methods: {
    ...mapGetters(["getSide0", "getSide1"]),
    ...mapMutations(["setSide0", "setSide1"]),
  },
  watch: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
//@import url("./assets/reset.scss");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.button {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  width: 50%;
  margin: 10px 10px;
  border: 1px solid black;
  padding: 0 10px;
}

h1 {
  font-weight: 600;
  font-size: 1em;
  margin: 10px 0;
  padding: 10px;
}

h2 {
  font-weight: 300;
  font-size: 1em;
  margin: 10px 0;
  padding: 10px;
}
</style>

<template>
  <div>
    <h1>settings</h1>
    <h2>Customize your watermark</h2>
    <button @click="onDestroy()">destroy</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "settings",
  methods: {
    ...mapMutations(["destroy"]),
    onDestroy() {
      this.destroy();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
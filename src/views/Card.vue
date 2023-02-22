<template>
  <div class="home">
    <h1>New card</h1>
    <h2>save your ID card</h2>
    <h3 v-show="this.saved">saved</h3>
    <div class="imagesWrapper">
      <FilePreview :side="0" @imageChanged="imageChanged" :key="key1"/>
      <FilePreview :side="1" @imageChanged="imageChanged" :key="key2"/>
      <button class="button" @click="onSave()" v-if="this.showSavedBtn">
        save
      </button>
      <button class="button" @click="onCancel()" v-if="this.showSavedBtn">
        cancel
      </button>
    </div>
  </div>
</template>

<script>
import FilePreview from "../components/FilePreview.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Card",
  components: { FilePreview },
  methods: {
    ...mapGetters(["getTmpSide0", "getTmpSide1"]),
    ...mapMutations(["setSide0", "setSide1", "reset"]),
    onSave() {
      this.setSide0();
      this.setSide1();

      this.showSavedBtn = false;
      this.saved = true;
      setTimeout(this.hideMessage, 3000);
    },
    onCancel(){
      this.reset();
      this.key1--;
      this.key2++;
      this.showSavedBtn = false;
    },
    imageChanged() {
      this.showSavedBtn = true;
    },
    hideMessage(){
      this.saved = false;
    }
  },
  data() {
    return {
      showSavedBtn: false,
      saved: false,
      key1: 0,
      key2: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.imagesWrapper {
  position: relative;
  padding: 80px 16px;
  margin: 10px;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}
</style>
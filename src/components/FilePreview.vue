<template>
  <div class="imageWrapper">
    <img
      class="image"
      @click="selectImage"
      :src="previewImage"
      v-if="previewImage"
    />
    <side0 @click="selectImage" v-show="!previewImage && !side" />
    <side1 @click="selectImage" v-show="!previewImage && side" />
    <input ref="fileInput" type="file" @input="pickFile" v-show="false" />
  </div>
</template>

<script>
import side0 from "@/assets/templateImages/side0.svg";
import side1 from "@/assets/templateImages/side1.svg";

import { mapGetters, mapMutations } from "vuex";
//import store from 'vuex'

export default {
  props: {
    side: {
      type: Number,
      default: 0,
    },
  },
  components: {
    side0,
    side1,
  },
  mounted() {
    if (this.side) {
      this.previewImage = this.getSide1();
    } else {
      this.previewImage = this.getSide0();
    }
  },
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
    ...mapMutations(["setTmpSide0", "setTmpSide1"]),
    ...mapGetters(["getSide0", "getSide1", "getTmpSide0", "getTmpSide1"]),
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          if (this.side) {
            if (this.previewImage != this.getTmpSide1()) {
              this.$emit("imageChanged", 1);
              this.setTmpSide1(this.previewImage);
            }
          } else {
            if (this.previewImage != this.getTmpSide0()) {
              this.$emit("imageChanged", 0);
              this.setTmpSide0(this.previewImage);
            }
          }
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },
};
</script>

<style scoped >
.imageWrapper {
  margin: 20px;
}
.imagePreviewWrapper {
  position: relative;
  width: 300px;
  height: 250px;
  display: flex;
  border-radius: 8px;
  border: 1px solid black;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
.image {
  display: block;
  position: relative;
  width: 100%;
  object-fit: cover;
  max-width: 500px;
}
</style>
<template>
  <div>
    <h1>watermark</h1>
    <div v-if="hasAnyCard()">
      <h2>create a watermark for your ID card</h2>
      <div class="imagesWrapper">
        <img id="pattern" src="../assets/templateImages/side0.png" hidden/>
        <canvas id="canvas"></canvas>
        <div>
          <button @click="onSetText()">text</button>
          <input v-model="wmtext" size="30" maxlength="30" />
        </div>
        <button @click="onSetPattern()">pattern</button>
        <button @click="onReset()" v-show="modified">reset</button>
        <a id="download" @click="onDownload()" v-show="modified">download</a>
      </div>
    </div>
    <div v-else>
      <h2>Save your ID card before create a watermark</h2>
      <editCard class="icon" @click="goToCardView()" />
    </div>
  </div>
</template>

<script>
import editCard from "@/assets/icons/edit-regular.svg";
import { mapGetters } from "vuex";

export default {
  name: "Watermark",
  components: {
    editCard,
  },
  mounted() {
    if (this.hasAnyCard()) {
      this.imageSide0 = new Image();
      this.imageSide0.src = this.getSide0();

      this.imageSide1 = new Image();
      this.imageSide1.src = this.getSide1();

      this.imageSide0 = this.imageSize(this.imageSide0);
      this.imageSide1 = this.imageSize(this.imageSide1);

      this.imageSide0.onload;
      this.imageSide1.onload;

      this.wmtext = this.getDefaultText();

      this.createBaseImage();
    }
  },
  methods: {
    ...mapGetters([
      "getSide0", 
      "getSide1", 
      "getDefaultText",
      "getDefaultFilename"]),
    hasAnyCard() {
      const side0 = this.getSide0();
      const side1 = this.getSide1();
      return side0 && side1;
    },
    onDownload() {
      let anchor = document.getElementById("download");
      let canvas = document.getElementById("canvas");
      anchor.setAttribute("href", canvas.toDataURL("image/png"));
      anchor.setAttribute("download", this.getDefaultFilename());
      this.modified = false;
    },
    onSetText() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      // ctx.translate(10,10);
      ctx.fillStyle = this.colors[this.intensity % 5];
      ctx.strokeStyle = this.colors[this.intensity % 5];
      ctx.font = "2em serif";
      ctx.textAlign = "right";
      ctx.fillText(this.wmtext, canvas.width, 100);
      ctx.fillText(
        new Date().toISOString().substr(0, 10),
        canvas.width,
        canvas.height
      );
      this.intensity++;
      this.modified = true;
    },
    onSetPattern() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      const img = document.getElementById("pattern");
      // create pattern
      var ptrn = ctx.createPattern(img, "repeat-y");
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ptrn;
      ctx.fill();

      this.intensity++;
      this.modified = true;
    },
    onReset() {
      this.modified = false;
      this.wmtext = this.getDefaultText();
      this.createBaseImage();
    },
    goToCardView() {
      this.$router.push("card");
    },
    imageSize(img) {
      const aspectRel = img.width / img.height;
      img.width = screen.width < img.width ? screen.width : img.width;
      img.height = img.width / aspectRel;
      return img;
    },
    createBaseImage() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width =
        this.imageSide0.width > this.imageSide1.width
          ? this.imageSide0.width
          : this.imageSide1.width;
      canvas.height = this.imageSide0.height + this.imageSide1.height;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(this.imageSide0, 0, 0);
      ctx.drawImage(
        this.imageSide1,
        0,
        this.imageSide0.height,
        this.imageSide1.width,
        this.imageSide1.height
      );
    },
  },
  data() {
    return {
      wmtext: "",
      intensity: 1, // watermark intensity
      colors: ["#cccccc", "#999999", "#666666", "#333333", "#000000"],
      modified: false,
      imageSide0: null,
      imageSide1: null,
      textActions: [],
      patternActions: [],
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

.icon {
  width: 30%;
  color: #666666;
}

input {
  font-size: 5vw;
}
</style>
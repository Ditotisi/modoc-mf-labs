<template>
  <!-- <div class="w-full flex"> -->
  <figure
    class="gallery-container"
    :class="gridClassName.figure"
    ref="myFigure"
  >
    <div
      class="base-gallery-child"
      v-for="(media, i) in images"
      :key="media"
      :class="`${gridClassName.imageContainer} ${
        i === 0 ? gridClassName.firstImage : ''
      }`"
      @click="handleOpenImage"
    >
      <div v-if="ImageCount > 5 && i === 4" class="image-count-backdrop">
        <span class="image-count-backdrop-text">{{ ImageCount - 5 }}+</span>
      </div>
      <el-image
        :src="media"
        :preview-z-index="5000"
        :preview-src-list="isAllowed ? images : null"
        :zoom-rate="1.5"
        :teleported="true"
        alt="image 1"
        class="image"
        :class="ImageCount > 5 && i === 4"
        fit="cover"
        lazy
      >
        <div slot="error" style="height: 100%; width: 100%">
          <el-image
            :src="`${isHome ? '' : '/mb'}/img/no-img-article.png`"
            fit="cover"
            class="image-error"
          />
        </div>
      </el-image>
    </div>
    <el-drawer
      :append-to-body="true"
      :visible.sync="drawerLogin"
      :with-header="false"
      size="50%"
      direction="btt"
      z-index="6000"
      modal-class="background_black"
        >
      <drawerLogin  :isHome="isHome"/>
    </el-drawer>
  </figure>
</template>

<script>
export default {
  components: {
    drawerLogin: () => import('./gallery-assets/login-drawer.vue')
  },  
  props: {
    isLogin: {
      type: Boolean | undefined
    },
    medias: {
      type: Array,
      default: [],
    },
    isHome: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerLogin: false,
      isAllowed: true,
      images: [],
      ImageCount: 0,
      gridClassName: {
        figure: "",
        imageContainer: "",
      },
    };
  },
  mounted() {
    this.ImageCount = this.medias.length;
    this.images = this.ImageCount <= 5 ? this.medias : this.medias.slice(0, 5);
    this.imageFormationClassGenerator();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleOpenImage(){
      if(this.isLogin === false) {
        this.isAllowed = false
        this.drawerLogin = true
      } else {
      }
    },
    handleResize() {
      let containerWidth = this.$refs.myFigure.clientWidth;
      this.$refs.myFigure.style.height = `${containerWidth / 2}px`;
    },
    imageFormationClassGenerator() {
      const count = this.medias.length;
      switch (count) {
        case 1:
          this.gridClassName = {
            figure: "image-1",
            imageContainer: "child-gallery-1",
            firstImage: "",
          };
          break;
        case 2:
          this.gridClassName = {
            figure: "image-2",
            imageContainer: "child-gallery-2",
            firstImage: "",
          };
          break;
        case 3:
          this.gridClassName = {
            figure: "image-3",
            imageContainer: "child-gallery-3",
            firstImage: "first-gallery-child",
          };
          break;
        case 4:
          this.gridClassName = {
            figure: "image-4",
            imageContainer: "child-gallery-4",
            firstImage: "",
          };
          break;
        case 5:
          this.gridClassName = {
            figure: "image-5",
            imageContainer: "child-gallery-5",
            firstImage: "first-gallery-child-more",
          };
          break;
        default:
          this.gridClassName = {
            figure: "image-5",
            imageContainer: "child-gallery-5",
            firstImage: "first-gallery-child-more",
          };
          break;
      }
    },
  },
};
</script>

<style >
.gallery-container {
  display: -ms-grid;
  display: grid;
  grid-gap: 0.25rem;
  height: 100%;
  max-height: 300px;
  gap: 0.25rem;
  max-width: 600px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
}
.image-5 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
.child-gallery-5 {
  width: 100%;
}
.image-4 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
.child-gallery-4 {
  width: 100%;
}
.image-3 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
.child-gallery-3 {
  width: 100%;
}
.image-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.child-gallery-2 {
  width: 100%;
}
.image-1 {
  grid-template: auto;
}
.child-gallery-1 {
  width: 100%;
  max-width: 600px;
}
.first-gallery-child {
  -ms-grid-row-span: span 2 / span 2;
  grid-row: span 2 / span 2;
}
.first-gallery-child-more {
  -ms-grid-row-span: span 2 / span 2;
  grid-row: span 2 / span 2;
  -ms-grid-column-span: span 2 / span 2;
  grid-column: span 2 / span 2;
}
.base-gallery-child {
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border-width: 1px;
  display: flex;
}

.image {
  width: 100%;
}
.image-error {
  width: 100%;
  height: 100%;
}

.image-count-backdrop {
  position: absolute;
  width: 100%;
  z-index: 10;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.5);
}
.image-count-backdrop-text {
  color: white;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.el-image-viewer__wrapper {
  z-index: 6000 !important;
}
</style>

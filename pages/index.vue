<template>
  <div
    class="
      w-full
      min-h-screen
      justify-center
      flex flex-col
      items-center
      py-10
      gap-5
    "
    style="height: 200vh"
  >
    <!-- <mySingleImage :medias="medias" /> -->
    <!-- <myDoubleImage :medias="medias" /> -->
    <!-- <myTripleImage :medias="medias" /> -->
    <!-- <myFourImage :medias="medias" /> -->
    <!-- <myGallery :medias="medias" /> -->
    <myFiveMore :medias="medias" isHome :isLogin="false" />
  </div>
</template>

<script>
import Gallery from "~/components/gallery/gallery.vue";
import SingleImage from "~/components/gallery/SingleImage.vue";
import DoubleImage from "~/components/gallery/DoubleImage.vue";
import TripleImage from "~/components/gallery/TripleImage.vue";
import FourImage from "~/components/gallery/FourImage.vue";
import FiveMore from "~/components/gallery/FiveMore.vue";

export default {
  name: "IndexPage",
  components: {
    myGallery: Gallery,
    mySingleImage: SingleImage,
    myDoubleImage: DoubleImage,
    myTripleImage: TripleImage,
    myFourImage: FourImage,
    myFiveMore: FiveMore,
  },
  data() {
    return {
      medias: [
        "https://image.modocapis.com/resize/450x0/kotak/2023012404/63cf63c0bcba0_Screenshot_2023-01-24_103413.png",
        "https://image.modocapis.com/resize/450x0/kotak/2023012404/63cf63c4dfcdb_Screenshot_2023-01-24_103439.png",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010502/63b634140e6ed_1f466fec5affaa4dfb4a6e3348f20553.jpg",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010502/63b63417ead79_8f212c14638a35d356b28fe62e1d0027.jpg",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010502/63b6341c9154e_11da2dfd317aff6cb0fd8188c69b6895.jpg",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010502/63b634227158b_12503ef14e0d6a97df4069183da2a50f.jpg",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010502/63b63426894da_10606590_782200398506375_4031466508518232990_n.jpg",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010902/63bb7a1eab713_FB_IMG_1673230821953.jpg",
        // "https://image.modocapis.com/resize/450x0/kotak/2023010610/63b7f4bb5dc2a_FB_IMG_1672987632103.jpg",
      ],
    };
  },
};
</script>

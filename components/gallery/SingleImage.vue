<template>
  <figure class="grid grid-auto w-full w-600px h-300px">
    <div class="rounded-lg overflow-hidden bg-slate-300 border border-white flex cursor-pointer w-full" v-for="media in images" :key="media">
      <img :src="media" alt="image 1" class="w-full object-cover" />
    </div>
  </figure>
</template>

<script>
export default {
  props: {
    medias: {
      type: Array,
      default: []
    },
  },
  data() {
      return {
        images: [this.medias[0]],
        class: {
          figure: 'grid grid-cols-4 h-300px gap-1',
          imageContainer: ''
        }
      }
    }
}
</script>

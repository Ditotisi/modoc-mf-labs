<template>
  <figure class="grid grid-cols-2 grid-rows-2 h-300px gap-1">
    <div class="rounded-lg overflow-hidden bg-slate-300 border border-white flex cursor-pointer" v-for="media in images" :key="media" >
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
        images: [this.medias[0], this.medias[1], this.medias[2], this.medias[3]],
        class: {
          figure: 'grid grid-cols-4 h-300px gap-1',
          imageContainer: ''
        }
      }
    }
}
</script>

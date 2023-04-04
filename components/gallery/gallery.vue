<template>
  <div>
    {{ images.length }}
    <figure class="grid grid-cols-4 grid-rows-2 h-300px gap-1">
      <div class="rounded-lg overflow-hidden bg-slate-300 border flex cursor-pointer" v-for="(media, i) in images" :key="media" :class="i === 0 ? 'col-span-2 row-span-2' : ''">
        <img :src="media" alt="image 1" class="w-full object-cover" />
      </div>
    </figure>
  </div>
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
        images: this.medias.length <= 5 ? this.medias : this.medias.slice(0,5) ,
        class: {
          figure: 'grid grid-cols-4 h-300px gap-1',
          imageContainer: ''
        }
      }
    }
}
</script>

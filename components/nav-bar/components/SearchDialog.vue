<template>
  <div>
    <el-button slot="reference" class="!border-0 !p-0 relative w-32px h-32px bg-transparent" type="text" @click="modalSearch = !modalSearch">
      <i class="bx bx-search text-2xl" :style="myStyle"/>
    </el-button>
    <el-dialog
      title="Cari"
      :visible.sync="modalSearch"
      width="90%"
      center
    >
      <div class="w-full flex flex-col items-start">
        <div class="w-full px-1 py-2 bg-white shadow-sm rounded-xl mb-10 flex gap-2">
          <el-input
            v-model="search"
            placeholder="Cari..."
            class="inline-input w-full rounded-xl border"
            :autofocus="true"
            @keyup.enter.native="onSubmit()"
          />
          <el-button type="primary" size="mini" round icon="el-icon-search text-md !p-0" @click="onSubmit()" />
        </div>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
export default {
  props:{
    myStyle:{
      type: Object,
      default: {
        color: 'white'
      }
    },
    targetUrl: {
      type: String,
      default: process.env.BASE_URL
    }
  },
  methods: {
    onSubmit(){ 
      if(this.search){
        window.open(this.targetUrl + 'mb/search?keyword=' + this.search, '_self')
      } else {
        this.modalSearch = false
      }
    }
  },
  data() {
    return {
      search: '',
      modalSearch: false,
      isValidate: {
        status: true,
        message: ''
      }
    }
  }
}
</script>

<style>

</style>

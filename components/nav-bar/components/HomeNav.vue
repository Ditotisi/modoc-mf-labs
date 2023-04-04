<template>
 <div>
   <div>
     <el-menu :default-active="activeIndex" class="el-menu-demo flex items-center h-16 px-4">
        <div class="w-32 min-w-32 flex pl-4">
          <el-image
            src="/img/logo.png"
            class="main-logo w-full h-33px min-w-100px max-w-100px cursor-pointer object-contain"
            :fit="'contain'"
            :lazy="true"
            height="33"
            alt="logo-modoc"
            @click="$router.push(localeLocation('/'))"
          >
            <div slot="error" class="image-slot" />
          </el-image>
        </div>
        <div class="flex justify-end items-center ml-auto gap-2">
          <el-input
            v-model="search"
            placeholder="Cari"
            prefix-icon="el-icon-search"
            class="v2-input"
            @focus="onSearch"
          />
          </div>
          <notifications />
        </el-menu>
      </div>
      <SearchBar :modalSearch="false" />
 </div>
</template>

<script>
export default {
  components: ()=> import('./notifications.vue'),
  SearchBar: () => import('./SearchDialog.vue')
}
</script>

<style>

</style>
<template>

  <div>
    <figure class="login-banner-container">
      <el-image :src="`${isHome ? '' : '/mb'}/img/please_login.png`"/>
    </figure>
    <div style="margin: auto; padding: 1rem 1rem; text-align: center;">
      <span style="margin: auto" class="text-primary">Kamu harus login terlebih dahulu untuk melihat lebih lanjut konten ini</span>
    </div>
    <div style="margin: auto; padding: 1rem 5rem; text-align: center;">
      <el-button type="primary" size="small" @click="handleLogin">Login Sekarang</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHome : {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      showDrawer :  this.drawerLogin
    }
  },
  methods: {
    handleLogin(){
      window.open(process.env.BASE_ACCOUNT + 'mb/login', '_self')
    }
  }
}

</script>

<style>
  .login-banner-container {
    display: flex;
    width:10rem;
    margin: auto;
    justify-content: center;
  }
  .el-drawer__wrapper{
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
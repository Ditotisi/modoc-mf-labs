<template>
  <div class="bg-white items-center container-mobile-nav w-full flex justify-between items-center">
    <el-button
      id="home-mobile-step-1"
      class="!border-0 !m-0 w-20percent !p-0 !py-1"
      @click="$goHome()"
    >
      <div :class="selected === 'm' ? 'text-primary' : '!text-gray-400'" class="w-29px h-29px m-auto">
        <i class="bx bx-home-alt text-2xl" />
      </div>
      <div :class="selected === 'm' ? 'text-primary' : '!text-gray-400'" class="mt-1 text-0.6rem small capitalize">
        {{ handleTitle('nav-home') }}
      </div>
    </el-button>
    <el-button
      id="home-mobile-step-2"
      class="!border-0 !m-0 w-20percent !p-0 !py-1"
      @click="$goGarage()"
    >
      <div class="text-gray-400 w-29px h-29px m-auto">
        <i class="bx bxs-car-garage text-2xl" />
      </div>
      <div class="text-gray-400 mt-1 text-0.6rem small capitalize">
        {{ handleTitle('nav-garage') }}
      </div>
    </el-button>
    <el-button
      id="home-mobile-step-1"
      class="!border-0 !m-0 w-20percent !p-0 !py-1"
      @click="$goFeed()"
    >
      <div class="btn-nav-center mx-auto">
        <img width="24" height="21" class="m-auto" src="./assets/img/icon_feed.svg" alt="icon-modoc">
      </div>
      <div :class="selected === 'feed' ? 'text-primary' : '!text-gray-400'" class="mt-4 text-0.6rem small capitalize">
        Feed
      </div>
    </el-button>
    <el-button
      id="home-mobile-step-3"
      class="!border-0 !m-0 w-20percent !p-0 !py-1"
      @click="$goCommunity()"
    >
      <div class="text-gray-400 w-29px h-29px m-auto">
        <i class="bx bx-group bxs text-2xl" />
      </div>
      <div class="text-gray-400 mt-1 text-0.6rem small capitalize">
        {{ handleTitle('nav-community') }}
      </div>
    </el-button>
    <template v-if="$store.state.auth.user.fetchProfileLoading">
      <el-button
        id="home-mobile-step-4"
        class="!border-0 !m-0 w-20percent !p-0 !py-1"
      >
        <i class="el-icon-loading text-3xl" />
      </el-button>
    </template>
    <template v-else-if="$store.state.auth.user.isLogin">
      <el-button
        id="home-mobile-step-4"
        class="!border-0 !m-0 w-20percent !p-0 !py-1"
        @click="$profile('')"
      >
        <img
          v-if="avatar"
          :src="avatar"
          loading="lazy"
          class="w-7 h-7 rounded-full object-cover cursor-pointer mx-auto"
        >
        <img
          v-else
          height="29"
          width="29"
          class="w-7 h-7 rounded-full object-cover cursor-pointer mx-auto"
          src="https://image.modocapis.com/resize/48x0/kotak/assets/profile/AvatarMale.png"
        >
        <div :class="activeMenu('account') ? 'font-text__blue' : 'text-gray-400'" class="mt-1 text-0.6rem small capitalize">
          {{ handleTitle('nav-account') }}
        </div>
      </el-button>
    </template>
    <template v-else>
      <el-button
        id="home-mobile-step-6"
        class="!border-0 !m-0 w-20percent !p-0 !py-1"
        @click="$logout()"
      >
        <div :class="selected === 'account' ? 'text-primary' : '!text-gray-400'" class="w-29px h-29px m-auto">
          <i class="bx text-2xl bx-user" />
        </div>
        <div :class="selected === 'account' ? 'text-primary' : '!text-gray-400'" class="mt-1 text-0.6rem small capitalize">
          {{ handleTitle('nav-account') }}
        </div>
      </el-button>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    username: {
      type: [String, Number],
      default: null
    }
  },
  data: () => {
    return {
      BASE_URL: process.env.BASE_URL,
      nav: [
        {
          title: 'nav-home',
          icon: 'bx-home',
          url: '',
          target: '',
          local: false,
          active: false
        }
      ],
      selected: '',
      chat_modal: false
    }
  },
  mounted () {
    const split = window.location.host.split('.')
    if (split && split.length > 0) {
      this.selected = split[0]
    }
  },
  methods: {
    activeMenu (val) {
      const path = this.$route.path.split('.')
      if (path && path.length > 0) {
        const clean_path = path[0].split('/').join('')
        if (clean_path === val) {
          return true
        }
      }
      return false
    },
    handleTitle (val) {
      return this.$t(val)
    },
    goMarketplace () {
      window.open(process.env.BASE_MARKETPLACE_URL, '_self')
    }
  }
}
</script>
<style lang="scss">
.iframe-full{
  iframe{
    width: 100%;
    height: 640px;
  }
}
.container-mobile-nav{
  position: fixed;
  z-index: 4000;
  bottom: 0;
  padding: 0.5rem;
  max-width: 600px;
  margin: auto;
  box-shadow: 0px -4px 14px rgba(0, 0, 0, 0.1);
}
.btn-nav-center{
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  background: #0CBFF2;
  border-radius: 50%;
  border: 5px solid #89E9FF99;
}
.w-20percent {
  width: 20%;
}
</style>

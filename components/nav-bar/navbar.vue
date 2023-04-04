<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="!top-0 left-0 right-0 m-shadow-bottom"
      style="z-index: 4000; position: fixed"
    >
      <div class="flex items-center px-4 py-1" :style="{ ...handleVariant(variant).style }">
        <el-button
          slot="reference"
          type="text"
          @click="handleTitleClick('icon')"
          :style="{ color: handleVariant(variant).style.color }"
        >
          <div class="flex items-center">
            <i class="bx bx-sm mr-2" :class="`bx-${handleIconType().icon}`" />
          </div>
        </el-button>
        <div class="text-xl cursor-pointer" @click="handleTitleClick('title')">
          {{ title }}
        </div>
        <div class="flex justify-end items-center ml-auto gap-1">
          <Search v-if="withSearch" :myStyle="{ color: handleVariant(variant).style.color }" />
          <Notifications
            v-if="withNotification"
            :myStyle="{ color: handleVariant(variant).style.color }"
          />
        </div>
      </div>
    </el-menu>
    <el-drawer
      :visible.sync="drawer"
      direction="ltr"
      size="50%"
      :with-header="false"
      class="!z-998"
    >
      <el-col style="padding-top: 70px">
        <div v-if="$store.state.auth.user.isLogin" class="flex justify-center">
          <el-image
            alt="photo-profile"
            class="size-photo rounded-full object-cover"
            :fit="'cover'"
            :src="$store.state.auth.user.myProfile.avatar"
          >
            <div slot="error" class="image-slot">
              <img
                alt="photo-profile"
                class="size-photo"
                src="https://image.modocapis.com/resize/48x0/kotak/assets/profile/AvatarMale.png"
              />
            </div>
          </el-image>
        </div>
        <div v-if="$store.state.auth.user.isLogin" class="text-center py-4 text-primary">
          {{ $store.state.auth.user.myProfile.first_name }}
        </div>
        <p class="pl-2 text-gray-400 text-sm">FEATURES</p>
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item @click="handleMenu('community')">
            <i
              class="bx bx-group bxs text-2xl"
              :class="selected === 'community' ? 'text-primary' : '!text-gray-400'"
            />
            <span :class="selected === 'community' ? 'text-blue-400' : 'text-gray-400'"
              >Community</span
            >
          </el-menu-item>
          <el-menu-item @click="handleMenu('expert')">
            <i
              class="bx bx-chat bxs text-2xl"
              :class="selected === 'expert' ? 'text-primary' : '!text-gray-400'"
            />
            <span :class="selected === 'expert' ? 'text-primary' : 'text-gray-400'">Expert</span>
          </el-menu-item>
          <el-menu-item @click="handleMenu('post')">
            <i
              class="bx bxs-news bxs text-2xl"
              :class="selected === 'post' ? 'text-primary' : '!text-gray-400'"
            />
            <span :class="selected === 'post' ? 'text-primary' : 'text-gray-400'">News</span>
          </el-menu-item>
          <el-menu-item @click="handleMenu('rute-ganjil-genap')">
            <div class="flex">
              <img src="/mb/img/icon_add_road.svg" class="text-primary" />
              <span class="pl-1 text-gray-400">Rute Ganjil Genap</span>
            </div>
          </el-menu-item>
          <el-menu-item @click="handleMenu('charging-station')">
            <div class="flex">
              <img src="/mb/img/icon_ev_charge.svg" class="text-primary" />
              <span class="pl-2 text-gray-400">Charging Station</span>
            </div>
          </el-menu-item>
        </el-menu>
        <p class="pl-2 text-gray-400 text-sm pt-4">LAINNYA</p>
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item @click="handleMenu('privacy-policy')">
            <i class="bx bx-check-shield text-2xl text-gray-400" />
            <span class="text-gray-400">Privacy Policy</span>
          </el-menu-item>
          <el-menu-item @click="$logout()">
            <i class="bx bx-log-out text-2xl text-gray-400" />
            <span class="text-gray-400">{{
              $store.state.auth.user.isLogin ? 'Log Out' : 'Log In'
            }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-drawer>
  </div>
</template>
<script>
export default {
  components: {
    Notifications: () => import('./components/notifications.vue'),
    Search: () => import('./components/SearchDialog.vue')
  },
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: ''
    },
    isBackNav: {
      type: Boolean,
      default: false
    },
    withSearch: {
      type: Boolean,
      default: false
    },
    withNotification: {
      type: Boolean,
      default: false
    },
    type: {
      type: 'base' | 'back' | 'home',
      default: 'base'
    }
  },
  data: () => ({
    drawer: false,
    BASE_URL: process.env.BASE_URL,
    activeIndex: '',
    search: '',
    iframe_url: '',
    chat_modal: false,
    interval: null,
    selected: ''
  }),
  mounted() {
    const split = window.location.host.split('.')
    if (split && split.length > 0) {
      this.selected = split[0]
    }
  },
  methods: {
    handleIconType() {
      switch (this.type) {
        case 'back':
          return {
            icon: 'chevron-left'
          }
        case 'home':
          return {
            icon: 'home'
          }

        default:
          return {
            icon: 'menu'
          }
      }
    },
    handleTitleClick(pos) {
      switch (pos) {
        case 'icon':
          if (this.type === 'base') {
            this.drawer = !this.drawer
          } else if (this.type === 'home') {
            this.$goHome()
          } else {
            this.$router.back()
          }
          break
        // 'base' | 'back' | 'home'
        case 'title':
          if (this.type === 'base') {
            this.$router.push(this.localeLocation('/'))
          } else if (this.type === 'home') {
            this.$goHome()
          } else {
            this.$router.back()
          }
          break

        default:
          break
      }
    },
    handleVariant(variant) {
      switch (variant) {
        case 'primary':
          return {
            style: {
              backgroundColor: '#00c9ff',
              color: '#fff'
            }
          }
        case 'secondary':
          return {
            style: {
              backgroundColor: '#F7921E',
              color: '#ffff'
            }
          }
        default:
          return {
            style: {
              backgroundColor: '#ffff',
              color: '#00c9ff'
            }
          }
      }
    },
    handleMenu(val) {
      const res = this.title === val ? this.$router.push(this.localeLocation('/')) : val
      switch (res) {
        case 'community':
          return this.$goCommunity()
        case 'post':
          return this.$goPost()
        case 'expert':
          return this.$goExpert()
        case 'rute-ganjil-genap':
          return this.$goHome('rute-ganjil-genap')
        case 'charging-station':
          return this.$goHome('charging-station')
        case 'privacy-policy':
          return this.$goHome('privacy-policy')
      }
    },
    querySearch(queryString, cb) {
      const links = this.links
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    activeMenu(val) {
      const path = this.$route.path.split('.')
      if (path && path.length > 0) {
        const clean_path = path[0].split('/').join('')
        if (clean_path === val) {
          return true
        }
      }
      return false
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.fetchNotifications()
        this.fetchMailbox()
      }, 30000)
    },
    async fetchMailbox() {
      await this.$store.dispatch('public/getMailbox').catch((err) => {
        throw new Error(err)
      })
    },
    async fetchNotifications() {
      await this.$store.dispatch('public/getNotifications').catch((err) => {
        clearInterval(this.interval)
        throw new Error(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-logo {
  height: 33px;
}
.size-photo {
  width: 57px;
  height: 57px;
}
.iframe-full {
  iframe {
    width: 100%;
    height: 640px;
  }
}
</style>

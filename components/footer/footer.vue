<template>
  <footer class="w-full md:px-8 px-4 pb-8 pt-4 mb-10 relative mb-50px font-bg__blue">
    <div class="w-full">
      <el-image
        :src="`${isHome ?  '': '/mb' }/img/modoc-white-logo.svg`"
        class="h-50px"
        :fit="'contain'"
        :lazy="true"
        height="35"
        width="100"
        alt="logo-modoc-footer"
      >
        <div slot="error" class="image-slot">
          <i class="bx bx-image-alt bx-sm" />
        </div>
      </el-image>
    </div>
    <div class="flex text-white mt-2 text-sm relative z-1">
      <div v-for="item in footerHyperlink" :key="item.id">
        <span  class="cursor-pointer mr-4" @click="$goHome(item.url)">{{ item.name }}</span> <span v-if="item.id !== 3" class="mr-4"> &#124;</span>
      </div>
    </div>

    <p class="mt-3 text-white text-xs relative z-1 font-light">
      Copyright 2022 Modoc | All Rights Reserved | Owned by PT Mobility Doctor Indonesia
    </p>
    <div class="flex justify-end relative z-1">
      <el-button class="w-30px h-30px !bg-white !p-0" circle type="primary" @click="openSocialMedia('https://www.instagram.com/modoc.id/?hl=id')">
        <i class="bx bxl-instagram text-xl font-text__blue" />
      </el-button>
      <el-button class="w-30px h-30px !bg-white !p-0" circle type="primary" @click="openSocialMedia('https://web.facebook.com/Modoc-ID-104649245492872')">
        <i class="bx bxl-facebook text-xl font-text__blue" />
      </el-button>
    </div>
    <div class="absolute left-0 bottom-0" style="bottom:1rem">
      <img :src="`${isHome ?  '': '/mb' }/img/modoc-logo-white-transparent.png`" alt="logo-modoc-background">
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    isHome: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      footerHyperlink: [
        {
          id: 1,
          name: 'About Us',
          url: 'about-us'
        },
        {
          id: 2,
          name: 'Privacy Policy',
          url: 'privacy-policy'
        },
        {
          id: 3,
          name: 'Contact Us',
          url: 'contact-us'
        },

      ]
    }
  },
  methods: {
    openSocialMedia (url) {
      window.open(url, '_blank')
    },
    selectLanguage (val) {
      this.$store.commit('public/SET_LANGUAGE', val)
      this.$i18n.setLocaleCookie(val)
    }
  }
}
</script>

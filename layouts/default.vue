<template>
  <div class="min-h-screen w-full max-w-600px mx-auto">
    <navbar
      :avatar="'https://randomuser.me/api/portraits/women/11.jpg'"
      :username="'Maria'"
      title="Detail My Garage"
      variant="secondary"
      type="base"
      withNotification
      withSearch
    />
    <div class="w-full flex justify-center">
      <Nuxt keep-alive />
    </div>
    <footerSection :isHome="true" />
    <mobileNavbar
      :avatar="'https://randomuser.me/api/portraits/women/11.jpg'"
      :username="'Maria'"
    />
  </div>
</template>

<script>
export default {
  components: {
    footerSection: () => import('~/components/footer/footer.vue'),
    mobileNavbar: () => import('~/components/mobile-navbar-new/mobile-navbar-new.vue'),
    navbar: () => import('~/components/nav-bar/navbar.vue')
  },
  mounted() {}
}
</script>

<style></style>

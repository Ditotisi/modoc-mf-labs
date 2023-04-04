<template>
  <el-popover
    placement="bottom"
    trigger="click"
    popper-class="w-full !z-9999 max-h-70vh overflow-x-hidden overflow-y-auto"
  >
    <el-tabs type="card">
      <el-tab-pane label="Notifikasi" class="w-full">
        <div class="w-full">
          <template v-if="$store.state.public.notifications && $store.state.public.notifications.length === 0">
            <div class="text-center text-xs text-gray-400 py-10">
              Kamu tidak punya notifikasi
            </div>
          </template>
          <ul class="notifications-list">
            <li
              v-for="(item, index) in $store.state.public.notifications"
              :key="index"
              class="border border-gray-200 cursor-pointer rounded py-2 px-4 bg-blue-50 hover:bg-gray-50 hover:text-gray-600 mb-2"
              @click="handleClickNotification(item.slug)"
            >
              <p class="font-semibold mb-1 text-xs">
                {{ handleTitle(item.title) }}
              </p>
              <p class="mb-1 text-xs">
                {{ handleActivity(item.message) }}
              </p>
              <div class="flex justify-between">
                <span class="text-xs text-gray-600">{{ item.created_at ? diffTime(item.created_at) : null }}</span>
                <span class="text-xs text-primary">
                  Lihat <i class="bx bx-right-arrow-alt" />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$store.state.public.mailbox && $store.state.public.mailbox.length > 0 ? `Mailbox (${$store.state.public.mailbox.length})` : 'Mailbox'">
        <template v-if="$store.state.public.mailbox && $store.state.public.mailbox.length === 0">
          <div class="text-center text-xs text-gray-400">
            <div class="w-full flex justify-center mb-1">
              <img width="100" src="/mb/img/no-mailbox.png" alt="img-mailbox">
            </div>
            Upss... Mailbox kamu kosong nih.
          </div>
        </template>
        <template v-else>
          <ul class="notifications-list">
            <li
              v-for="(item, index) in $store.state.public.mailbox"
              :key="index"
              class="border border-gray-200 cursor-pointer rounded py-2 px-4 bg-blue-50 hover:bg-gray-50 hover:text-gray-600 mb-2"
            >
              <p class="font-semibold mb-1 text-xs text-primary font-semibold">
                {{ item.title_message }}
              </p>
              <p class="mb-1 text-xs">
                {{ item.message }}
              </p>
              <div class="flex justify-between">
                <span class="text-xs text-gray-400">{{ item.created_at ? diffTime(item.created_at) : null }}</span>
              </div>
            </li>
          </ul>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-button slot="reference" class="!border-0 !p-0 relative w-32px h-32px bg-transparent" type="text">
      <div
        v-if="$store.state.public.mailbox &&
          $store.state.public.mailbox.length > 0 &&
          $store.state.public.notifications &&
          $store.state.public.notifications.length > 0"
        class="bg-secondary px-1 py-0 rounded-full text-xs text-white absolute top-1 right-1"
      >
        {{ $store.state.public.notifications.length + $store.state.public.mailbox.length }}
      </div>
      <i class="bx bx-bell text-2xl " :style="myStyle"/>
    </el-button>
  </el-popover>
</template>
<script>
export default {
  props: {
    myStyle: {
      type: Object,
      default: {
        color: 'white'
      }
    }
  },
  data: () => ({
    notification: false,
    time: 5,
    interal: null,
    stopInterval: false
  }),
  methods: {
    handleTitle (val) {
      if (!val) { return }
      const clear_str = val.replace(/::/g, '')
      const split_str = clear_str.split('.')

      if (split_str && split_str.length > 0) {
        if (this.$store.state.public.lang === 'id') {
          const str = this.notificationTitleId(split_str[1])
          return str
        }
      }
    },
    handleActivity (val) {
      if (!val) { return }
      const clear_str = val.replace(/::/g, '')
      const str = this.notificationBodyId(clear_str)
      return str
    },
    handleClickNotification (slug) {
      const split = slug.split('/')
      if (split.length > 0) {
        if (split[1] === 'marketplace') {
          return this.$router.push(this.localeLocation('/marketplace/product/' + split[2]))
        } else {
          const url = slug.substring(1)
          return this.$goTo(url)
        }
      }
    },
    diffTime (time) {
      const date = this.$moment(time, true)
      const now = this.$moment()
      let days = now.diff(date, 'days')
      const weeks = now.diff(date, 'weeks')
      let result = ''

      if (weeks) {
        result += weeks + ' minggu'
        days = days % 7
      } else if (!days || weeks === 0) {
        result = 'Hari ini'
        return result
      } else if (days || weeks === 0) {
        result += days + ' hari'
      }

      result += ' yang lalu'

      return result
    },
    notificationTitleId (val) {
      switch (val) {
        case 'invite_as_member' : return 'Kamu diundang sebagai member'
        case 'invite_as_contributor' : return 'Kamu diundang sebagai kontributor'
        case 'invite_as_moderator_message' : return 'Kamu diundang menjadi moderator'
        case 'request_follow' : return 'mengirim permintaan mengikuti komunitas'
        case 'invite_as_moderator' : return 'Permintaan'
        case 'delete_as_member' : return 'Kamu dihapus sebagai member'
        case 'delete_as_contributor' : return 'Kamu dihapus sebagai kontributor'
        case 'balance_point' : return 'Poin kamu'
        case 'post' : return 'Postingan'
        case 'marketplace_comment' : return 'Seseorang mengomentari produkmu di marketplace'
        // case 'comment_marketplace' : return 'Seseorang membuat komentar di produk marketplace kamu'
      }
    },
    notificationBodyId (val) {
      switch (val) {
        case 'earn_point' : return 'Kamu dapat poin sebesar '
        case 'deduct_point' : return 'poin telah dikurangi '
        case 'from' : return 'dari'
        case 'news' : return 'berita'
        case 'answer' : return 'jawaban'
        case 'more_notif' : return 'Selengkapnya'
        case 'comminity' : return 'komunitas'
        case 'create_question' : return 'membuat pertanyaan'
        case 'create_discussion' : return 'mebuat diskusi'
        case 'create_news' : return 'membuat berita'
        case 'delete_news' : return 'menghapus berita'
        case 'like_post' : return 'Seseorang menyukai postingan kamu'
        case 'like_comment' : return 'Seseorang menyukai komentar kamu'
        case 'comment_post' : return 'Seseorang mengomentari postingan kamu'
        case 'delete_community' : return 'Menghapus Komunitas'
        case 'delete_discussion' : return 'Menghapus Diskusi'
        case 'delete_question' : return 'Menghapus Pertanyaan'
        case 'best_answer_discussion' : return 'Jawaban terbaik'
        case 'delete_best_answer' : return 'Menghapus Jawaban Terbaik'
      }
    }
  }
}
</script>

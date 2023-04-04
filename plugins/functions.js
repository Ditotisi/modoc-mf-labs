import moment from 'moment'
export default ({ store, app }, inject) => {
  const i18n = app.i18n

  const currencyFormat = (number) => {
    if (!number) { number = 0 }
    return 'Rp ' + number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
  }
  const goTo = (path, other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_URL + path + operator + 'lang=' + store.state.public.lang, '_self')
  }
  const logout = () => {
    window.open(`${process.env.BASE_ACCOUNT}mb/login`, '_top')
  }
  const profile = (username) => {
    const params = username ? `?slug=${username}` : ''
    window.open(`${process.env.BASE_ACCOUNT}mb/profile${params}`, '_top')
  }
  const mainUrl = (path) => {
    return process.env.BASE_URL + path + '?lang=' + store.state.public.lang
  }
  const goHome = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_HOME + path + operator + 'lang=' + store.state.public.lang, '_top')
  }
  const goFeed = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_FEED + 'mb/' + path + operator + 'lang=' + store.state.public.lang, '_top')
  }
  const goPost = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_POST + 'mb/' + path + operator + 'lang=' + store.state.public.lang, '_top')
  }
  const goLinkPlus = (slug) => {
    window.open(process.env.BASE_LINKPLUS + slug, '_self')
  }
  const goExpert = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_EXPERT + 'mb/' + path + operator + 'lang=' + store.state.public.lang, '_self')
  }
  const goGarage = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_GARAGE + 'mb/' + path + operator + 'lang=' + store.state.public.lang, '_top')
  }
  const goCommunity = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_COMMUNITY + 'mb/' + path + operator + 'lang=' + store.state.public.lang, '_top')
  }
  const goMarketplace = (path = '', other) => {
    const operator = other ? '&' : '?'
    window.open(process.env.BASE_MARKETPLACE_URL + 'mb/' + path + operator + 'lang=' + store.state.public.lang, '_self')
  }
  const postUrl = (path) => {
    return process.env.BASE_POST + 'mb/' + path + '?lang=' + store.state.public.lang
  }
  const expertUrl = (path) => {
    return process.env.BASE_EXPERT + 'mb/' + path + '?lang=' + store.state.public.lang
  }
  const basePath = (path) => {
    return process.env.BASE_URL + path
  }
  const imgUrl = (url, width = 0, height = 0, watermark = false) => {
    if (!url) { return '' }
    const split1 = url.split('//')
    const split2 = split1.length > 0 && split1[1] ? split1[1].split('/') : ['']

    if (split2[0] === 'image.modocapis.com') {
      const img = split1.length > 0 && split1[1] && split2.length > 0 ? split2.splice(4, 4).join('/') : ''
      const isWatermark = watermark ? 'watermark' : 'resize'
      const size = width + 'x' + height
      const result = process.env.BASE_IMAGE + `${isWatermark}/${size}/kotak/` + img
      return result
    } else {
      // const img = split1.length > 0 && split1[1] && split2.length > 0 ? split1[1].substring(split2[0].length + 1) : ''
      // const isWatermark = watermark ? 'watermark' : 'resize'
      // const size = width + 'x' + height
      const result = url
      return result
    }
  }
  const diffTime = (time) => {
    const date = moment(time, true)
    const now = moment()
    const hours = now.diff(date, 'hours')
    const days = now.diff(date, 'days')
    const weeks = now.diff(date, 'weeks')
    const months = now.diff(date, 'months')
    const years = now.diff(date, 'years')
    if (years) {
      if (years > 0) {
        return years + ` ${i18n.t('global-year-ago')}`
      } else {
        return Math.abs(years) + ` ${i18n.t('global-year-left')}`
      }
    } else if (months) {
      if (months > 0) {
        return months + ` ${i18n.t('global-month-ago')}`
      } else {
        return Math.abs(months) + ` ${i18n.t('global-month-left')}`
      }
    } else if (weeks) {
      if (weeks > 0) {
        return weeks + ` ${i18n.t('global-week-ago')}`
      } else {
        return Math.abs(weeks) + ` ${i18n.t('global-week-left')}`
      }
    } else if (days || weeks === 0) {
      if (days === 0) {
        if (hours === 0) {
          return i18n.t('global-recently')
        }
        return Math.abs(hours) + ` ${i18n.t('global-hours')}`
      } else if (days > 0) {
        return days + ` ${i18n.t('global-day-ago')}`
      } else {
        return Math.abs(days) + ` ${i18n.t('global-day-left')}`
      }
    }
  }

  const colorLevel = (lvl) => {
    const splitLvl = lvl.split(' ')
    const getLvl = splitLvl.length > 0 && splitLvl[2]
    if (splitLvl.length > 0 && splitLvl[1] === 'Beginner') {
      if (getLvl <= 5) {
        return '#4CD4FF'
      } else if (getLvl > 5) {
        return '#0CBFF2'
      }
    } else if (splitLvl.length > 0 && splitLvl[1] === 'Intermediate') {
      if (getLvl <= 5) {
        return '#9AD620'
      } else if (getLvl > 5) {
        return '#87A746'
      }
    } else if (splitLvl.length > 0 && splitLvl[1] === 'Expert') {
      if (getLvl <= 5) {
        return '#FAC300'
      } else if (getLvl > 5) {
        return '#ECAB03'
      }
    } else if (splitLvl.length > 0 && splitLvl[1] === 'Master') {
      if (getLvl <= 5) {
        return '#FC852E'
      } else if (getLvl > 5) {
        return '#FB6509'
      }
    }
  }

  const numLevel = (lvl) => {
    const splitLvl = lvl.split(' ')
    const getLvl = splitLvl.length > 0 && splitLvl[2]
    return getLvl
  }

  const defineSlots = (units) => {
    const { path, size, dom_id } = units
    window.googletag.cmd.push(function () {
      window.googletag.defineSlot(path, size, dom_id).addService(window.googletag.pubads())
      window.googletag.pubads().enableSingleRequest()
      window.googletag.enableServices()
    })
    window.googletag.cmd.push(function () {
      window.googletag.display(dom_id)
    })
  }

  inject('currencyFormat', currencyFormat)
  inject('goTo', goTo)
  inject('profile', profile)
  inject('basePath', basePath)
  inject('imgUrl', imgUrl)
  inject('diffTime', diffTime)
  inject('mainUrl', mainUrl)
  inject('goHome', goHome)
  inject('goFeed', goFeed)
  inject('goLinkPlus', goLinkPlus)
  inject('goPost', goPost)
  inject('goExpert', goExpert)
  inject('goGarage', goGarage)
  inject('goCommunity', goCommunity)
  inject('goMarketplace', goMarketplace)
  inject('postUrl', postUrl)
  inject('expertUrl', expertUrl)
  inject('logout', logout)
  inject('profile', profile)
  inject('colorLevel', colorLevel)
  inject('numLevel', numLevel)
  inject('defineSlots', defineSlots)
}

<template>
  <div id="app">
    <navigation :profile="profile"></navigation>
    <transition name="page" mode="out-in" appear>
      <router-view :key="$route.fullPath" :profile="profile" @profileChange="profileChange" v-if="profileInit" />
    </transition>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import { helper, http } from '@/helper'

  export default {
    name: 'app',
    components: {
      'navigation': Navigation
    },
    data () {
      return {
        profile: false,
        profileInit: false
      }
    },
    methods: {
      profileChange: function (profile) {
        this.profile = profile
      }
    },
    created () {
      const vue = this
      // login
      console.log(helper.getCookie('token'))
      if (!helper.getCookie('token')) {
        this.profile = false
        if (this.$route.name !== 'Home') {
          this.$router.push('/')
        }
        vue.profileInit = true
      } else {
        // load profile
        http.request('get', '/user', 0, function (result) {
          if (result.error) {
            if (result.error === 'register_first') {
              vue.$router.push('/')
            }
          } else {
            vue.profileChange(result)
            if (vue.$route.name === 'Home') {
              vue.$router.push('/dashboard')
            }
          }
          vue.profileInit = true
        })
      }
    }
  }
</script>

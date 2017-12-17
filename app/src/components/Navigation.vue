<template>
  <div class="nav">
    <transition name="page">
      <div class="nav_profile" v-if="profile">
        <router-link to="/account">
          <div class="nav_profile_img nav_profile_elem bg_gradient">
            <img :src="profile.img" class="border_gradient" v-if="profile.img != 0" />
            <div class="nav_profile_img_icon" v-if="profile.img == 0">
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>
          </div>
        </router-link>
        <div class="nav_profile_menu" :class="{active: navProfileMenu}">
          <div class="nav_profile_menu_triangle nav_profile_elem" @click="navProfileMenuChange">
            <img class="nav_profile_menu_triangle_img" src="/static/media/triangle.png" />
          </div>
          <div class="nav_profile_menu_content bg_gradient">
            <div class="nav_profile_menu_content_inner">
              <router-link to="account">
                <p class="nav_profile_menu_content_element" @click="navProfileMenuChange">Edit account</p>
              </router-link>
              <router-link to="/">
                <p class="nav_profile_menu_content_element" @click="logout">Log out</p>
              </router-link>
            </div>
          </div>
        </div>
        <router-link to="/dashboard">
          <div class="nav_profile_text nav_text nav_profile_elem" :class="{active: $route.name=='Dashboard'}">
            DASHBOARD
          </div>
        </router-link>
        <div class="clear"></div>
      </div>
    </transition>
    <div class="nav_logo">
      <img class="nav_logo_img" src="/static/media/logo.png" />
    </div>
    <transition name="page">
      <div class="nav_project" v-if="profile">
        <router-link to="/projects">
          <div class="nav_project_text nav_text nav_project_elem" :class="{active: $route.name=='Projects'}">
            <span>ALL PROJECTS</span>
          </div>
        </router-link>
        <div class="clear"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default{
    name: 'navigation',
    data () {
      return {
        navProfileMenu: false
      }
    },
    props: [
      'profile'
    ],
    methods: {
      navProfileMenuChange: function () {
        this.navProfileMenu = !this.navProfileMenu
      },
      logout: function () {
        document.cookie = 'token='
        this.navProfileMenuChange()
      }
    }
  }
</script>

<template>
  <div class="dashboard page">
    <transition name="page" mode="out-in">
      <div class="dashboard_inner" v-show="ownProjectsInit && likedProjectsInit">
        <div class="dashboard_row">
          <h2 class="page_headline">
            Your Projects
          </h2>
          <div class="dashboard_project">
            <projects :projects="ownProjects" :profile="profile" :fullscreen="false" :add="true"></projects>
          </div>
        </div><div class="dashboard_row">
          <h2 class="page_headline">
            Liked Projects
          </h2>
          <div class="dashboard_project">
            <transition name="page" mode="out-in">
              <projects v-if="likedProjects.length>0" :projects="likedProjects" :profile="profile" :fullscreen="false" @unlike="unlikeProject"></projects>
              <div class="dashboard_project_empty" v-if="likedProjects.length==0">
                you did not liked any projects yet! <router-link to="/projects">browse now</router-link>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import '@/assets/style/dashboard.css'
  import ProjectList from '@/components/ProjectList'
  import { http } from '@/helper'

  export default {
    name: 'Dashboard',
    props: ['profile'],
    components: {
      projects: ProjectList
    },
    data () {
      return {
        ownProjects: [],
        ownProjectsInit: false,
        likedProjects: [],
        likedProjectsInit: false,
        projectPage: false,
        projectPageButton: 0
      }
    },
    methods: {
      ownProjectsLoad: function () {
        const vue = this
        let url = '/project/list?user_id=' + this.profile.ID + '&relation=owner,member'
        http.request('get', url, {}, function (result) {
          vue.ownProjects = result
          vue.ownProjectsInit = true
        })
      },
      likedProjectsLoad: function () {
        const vue = this
        let url = '/project/list?user_id=' + this.profile.ID + '&relation=liked'
        http.request('get', url, {}, function (result) {
          vue.likedProjects = result
          vue.likedProjectsInit = true
        })
      },
      unlikeProject: function (id) {
        for (let x = 0; x < this.likedProjects.length; x++) {
          if (this.likedProjects[x].ID === id) {
            this.likedProjects.splice(x, 1)
          }
        }
      }
    },
    created () {
      // cache url for projectPage
      document.cookie = 'projectPageBack=dashboard'
      this.ownProjectsLoad()
      this.likedProjectsLoad()
    }
  }
</script>

<style>

</style>

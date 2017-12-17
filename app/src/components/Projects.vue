<template>
  <div class="projects page">
    <transition name="page" mode="out-in">
      <div class="projects_list" v-show="availableProjectsInit">
        <h2 class="page_headline">Available Projects</h2>
        <projects :projects="availableProjects" :profile="profile" :fullscreen="true"></projects>
      </div>
    </transition>
  </div>
</template>

<script>
  import '@/assets/style/projects.css'
  import '@/assets/style/vue-visual.css'

  import VueVisual from 'vue-visual'
  import ProjectList from '@/components/ProjectList'
  import { http } from '@/helper'

  export default {
    name: 'Projects',
    components: {
      'visual': VueVisual,
      'projects': ProjectList
    },
    props: [
      'profile'
    ],
    data () {
      return {
        availableProjects: [],
        availableProjectsInit: false
      }
    },
    created: function () {
      // cache url for projectPage
      document.cookie = 'projectPageBack=projects'
      const vue = this
      http.request('get', '/project/list', {}, function (result) {
        vue.availableProjects = result
        vue.availableProjectsInit = true
      })
    }
  }
</script>

<style>

</style>

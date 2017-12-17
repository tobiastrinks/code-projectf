<template>
  <div class="projectpage page">
    <div class="projectpage_close">
      <router-link :to="projectPageBack">
        <img src="/static/media/close.png" />
      </router-link>
    </div>
    <transition name="page">
      <h2 class="page_headline" v-if="notFound">project not found</h2>
    </transition>
    <transition name="page">
      <div class="projectpage_inner" v-if="!notFound" v-show="projectInit">
        <div class="projects_elem_head">
          <div class="projects_elem_img_wrapper">
            <visual class="projects_elem_img"
                    :image="project.img"
                    background="cover"></visual>
          </div>
          <router-link :to="'/projects/' + $route.params.project + '/edit'">
            <div v-if="getButton()=='edit'" class="projects_elem_button projects_elem_button_edit">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
          </router-link>
          <div v-if="getButton()=='like' || getButton()=='liked'" class="projects_elem_button projects_elem_button_like" :class="{ bg_gradient: getButton()=='liked' }" @click="likeButton">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </div>
        </div>
        <div class="projects_elem_body">
          <p class="projects_elem_hashtags">
            <span v-for="hashtag in project.hashtags">#{{hashtag}}</span>
          </p>
          <p class="projects_elem_name">
            {{project.name}}
          </p>
          <p class="projects_elem_descr">
            {{project.short_descr}}
          </p>
          <p class="projectpage_descr">
            {{project.descr}}
          </p>
          <p class="projectpage_contact">
            for team meetings contact: <a :href="'mailto:' + project.owner.email">{{project.owner.email}}</a>
          </p>
          <div class="projectpage_members">
            <div class="project_member owner">
              <div class="project_member_img bg_gradient">
                <img :src="project.owner.img" />
              </div>
              <p class="project_member_text">{{project.owner.fname}}</p>
            </div>
            <div v-for="member in project.members" class="project_member">
              <div class="project_member_img bg_gradient">
                <img :src="member.img" />
              </div>
              <p class="project_member_text">{{member.fname}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import '@/assets/style/projectPage.css'

  import VueVisual from 'vue-visual'
  import { helper, http } from '@/helper'

  export default {
    name: 'projectpage',
    components: {
      visual: VueVisual
    },
    props: ['profile'],
    data () {
      return {
        project: {
          name: false,
          owner: false,
          member: false,
          img: ''
        },
        projectInit: false,
        notFound: false
      }
    },
    methods: {
      getButton: function () {
        return (helper.getButton(this.profile.projects, this.project.ID))
      },
      likeButton: function () {
        this.profile.projects.liked = helper.likeButton(this.profile, this.project.ID)
      }
    },
    computed: {
      projectPageBack: function () {
        let cookie = helper.getCookie('projectPageBack')
        if (cookie) {
          return ('/' + cookie)
        } else {
          return ('/projects')
        }
      }
    },
    created () {
      let vue = this
      let projectRoute = vue.$route.params.project
      http.request('get', '/project?route=' + projectRoute, {}, function (result) {
        if (result.error) {
          if (result.error === 'project_not_found') {
            vue.notFound = true
          }
        } else {
          vue.project = result
        }
        vue.projectInit = true
      })
    }
  }
</script>

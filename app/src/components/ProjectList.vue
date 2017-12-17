<template>
  <div class="projects_list" :class="{fullscreen: fullscreen}">
    <div v-for="(project, index) in projects" class="projects_elem">
      <div class="projects_elem_head">
        <router-link :to="'/projects/' + project.route">
          <div class="projects_elem_img_wrapper">
            <visual class="projects_elem_img"
                    :image="project.img"
                    background="cover"></visual>
          </div>
        </router-link>
        <router-link :to="'/projects/' + project.route + '/edit'">
          <div v-if="getListButton(project.ID) == 'edit'" class="projects_elem_button projects_elem_button_edit">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </div>
        </router-link>
        <div v-if="getListButton(project.ID) == 'like' || getListButton(project.ID) == 'liked'" class="projects_elem_button projects_elem_button_like" :class="{ bg_gradient: getListButton(project.ID)=='liked' }" @click="likeButton(project.ID)">
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </div>
        <div v-if="getListButton(project.ID) == 'member'" class="projects_elem_button projects_elem_button_like bg_gradient">
          <i class="fa fa-user" aria-hidden="true"></i>
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
      </div>
    </div><div class="projects_elem add" v-if="add">
      <router-link to="/create">
        <div class="projects_elem_head">
          <div class="projects_elem_img_wrapper">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import VueVisual from 'vue-visual'
  import { helper } from '@/helper'

  export default{
    name: 'projects',
    components: {
      visual: VueVisual
    },
    props: [
      'profile', 'projects', 'fullscreen', 'add'
    ],
    data () {
      return {
        button: false
      }
    },
    methods: {
      getListButton: function (id) {
        return (helper.getButton(this.profile.projects, id))
      },
      likeButton: function (id) {
        this.profile.projects.liked = helper.likeButton(this.profile, id)
        this.$emit('unlike', id)
      }
    }
  }
</script>

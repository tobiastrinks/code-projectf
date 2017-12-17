<template>
  <div class="projectcreate page">
    <h2 class="page_headline">
      <span v-if="create">Set up a new project</span>
      <span v-if="!create">Edit your project</span>
    </h2>
    <transition name="page">
      <div class="projectcreate_inner" v-show="projectInit || create">
        <div class="input bg_gradient">
          <input type="text" placeholder="Project name" v-model="project.name" @change="editProject('name')" />
        </div>
        <div class="projectcreate_img">
          <div class="projectcreate_img_dropzone dropzone" :class="{drag: dropzoneDrag, empty: (project.img==0)}">
            <div class="dropzone_content">
              <dropzone id="projectcreate_img_dropzone"
                        ref="accountImgDropzone"
                        class="dropzone_content_elem"
                        :options="dropzoneOptions"
                        :include-styling="false"
                        @vdropzone-drag-enter="dropzoneDragChange"
                        @vdropzone-drag-leave="dropzoneDragChange"
                        @vdropzone-sending="dropzoneSending"
                        @vdropzone-success="dropzoneSuccess"
                        @vdropzone-error="dropzoneError"></dropzone>
            </div>
            <div class="dropzone_hover">
              <div class="dropzone_hover_msg">
                <span v-if="(project.img!=0)">change project image</span>
                <span v-if="(project.img==0)">add project image</span>
              </div>
            </div>
          </div>
          <div class="projectcreate_img_content">
            <visual class="projectcreate_img_content_visual"
                    v-if="project.img!=0"
                    :image="project.imgsrc"
                    background="cover"></visual>
          </div>
        </div>
        <div class="projectcreate_descr">
          <div class="projectcreate_descr_elem short bg_gradient input">
            <textarea v-model="project.short_descr" placeholder="short description for list view" @change="editProject('short_descr')"></textarea>
          </div>
          <div class="projectcreate_descr_elem bg_gradient input">
            <textarea v-model="project.descr" placeholder="long description for project page" @change="editProject('descr')"></textarea>
          </div>
        </div>
        <h3 class="projectcreate_subheadline">Project-Hashtags</h3>
        <div class="projectcreate_hashtag">
          <div v-for="(hashtag, index) in project.hashtags" class="input third bg_gradient">
            <input type="text" :placeholder="'#' + (parseInt(index)+1)" v-model="project.hashtags[index]" @change="editProject('hashtags')" />
          </div>
          <div class="clear"></div>
        </div>
        <h3 class="projectcreate_subheadline">Team</h3>
        <div class="projectcreate_team bg_gradient">
          <div class="projectcreate_team_inner">
            <input class="projectcreate_team_search" type="text" v-model="userSearchStr" placeholder="Add people" @input="userSearchInput" />
            <div class="projectcreate_team_add" v-if="userSearchStr!=''">
              <p class="projectcreate_team_add_headline" v-if="!userSearchLoading && !userSearchEmpty">choose people to add them</p>
              <div v-for="(user, index) in userSearch" v-if="!userSearchLoading" class="project_member" @click="userSearchAdd(index)">
                <div class="project_member_img bg_gradient">
                  <img :src="user.img" />
                </div>
                <p class="project_member_text">{{user.fname}}</p>
              </div>
              <div class="projectcreate_team_add_status projectcreate_team_add_loading" v-if="userSearchLoading">Loading</div>
              <div class="projectcreate_team_add_status projectcreate_team_add_no_results" v-if="userSearchEmpty">no results</div>
            </div>
            <div class="projectcreate_team_content" v-if="userSearchStr==''">
              <div v-for="member in project.members" class="project_member">
                <div class="project_member_img bg_gradient">
                  <img :src="member.img" />
                  <div class="project_member_img_hover" @click="userSearchRemove(member.ID)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </div>
                </div>
                <p class="project_member_text">{{member.fname}}</p>
              </div>
              <div class="clear"></div>
              <div class="projectcreate_team_content_empty" v-if="project.members.length==0">
                <span>add some more people who are working with you</span>
              </div>
            </div>
          </div>
        </div>
        <div class="projectcreate_buttons">
          <div v-if="!create" class="projectcreate_delete button">
            <button @click="deleteProject">Delete Project</button>
          </div>
          <div class="projectcreate_submit button bg_gradient">
            <button v-if="create" @click="submitProject">Create Project</button>
            <router-link :to="'/projects/' + $route.params.project" v-if="!create">
              <button>Close</button>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import '@/assets/style/projectCreate.css'
  import Dropzone from 'vue2-dropzone'
  import { http, helper } from '@/helper'
  import VueVisual from 'vue-visual'

  export default {
    name: 'ProjectCreate',
    components: {
      dropzone: Dropzone,
      visual: VueVisual
    },
    props: ['profile'],
    data: function () {
      return ({
        create: true,
        project: {
          name: '',
          hashtags: ['', '', ''],
          members: [],
          img: 0
        },
        projectInit: false,
        dropzoneOptions: {
          url: 'https://projectf-api.ttrks.de/media/upload',
          headers: {
            'Accept': 'application/json',
            'Authorization': helper.getCookie('token')
          },
          maxFilesize: 4,
          acceptedFiles: 'image/*',
          thumbnailWidth: 600,
          thumbnailHeight: 360,
          previewTemplate: this.dropzoneTemp()
        },
        dropzoneDrag: false,
        userSearch: [],
        userSearchStr: '',
        userSearchLoading: false,
        userSearchEmpty: false,
        userSearchTimeout: false
      })
    },
    methods: {
      dropzoneTemp: function () {
        return `<div class="dz-preview dz-file-preview">
                <div class="dz-details">
                  <img data-dz-thumbnail />
                </div>
                <div class="dz-blk"></div>
                <div class="dz-progress"><div class="dz-upload bg_gradient" data-dz-uploadprogress></div></div>
              </div>
            </div>`
      },
      dropzoneDragChange: function () {
        this.dropzoneDrag = !this.dropzoneDrag
      },
      dropzoneSending (file, xhr, formData) {
        formData.append('type', 'project_img')
      },
      dropzoneSuccess: function (file, response) {
        this.dropzoneDrag = false
        const vue = this
        var result = JSON.parse(response)
        this.project.img = result.id
        this.project.imgsrc = result.src
        this.$refs.accountImgDropzone.removeFile(file)
        // update db
        vue.editProject('img')
      },
      dropzoneError: function (file, response) {
        console.log('error: ' + response)
      },
      editProject: function (attr) {
        // update db
        if (!this.create) {
          let val = this.project[attr]
          if (attr === 'hashtags') {
            val = this.project.hashtags.join(',')
          }
          http.request('post', '/project/update', {
            id: this.project.ID,
            attr: attr,
            val: val
          }, function (result) {
            console.log(result)
          })
        }
      },
      editProjectMembers: function (method, userId) {
        if (!this.create) {
          let url = '/project/relation/'
          let params = {}
          if (method === 'add') {
            url += 'create'
            params = {
              project_id: this.project.ID,
              user_id: userId,
              relation: 'member'
            }
          } else {
            url += 'delete'
            params = {
              project_id: this.project.ID,
              user_id: userId
            }
          }
          http.request('post', url, params, function (result) {
            console.log(result)
          })
        }
      },
      userSearchInput: function () {
        const vue = this
        vue.userSearchLoading = true
        vue.userSearchEmpty = false
        clearTimeout(this.userSearchTimeout)
        if (vue.userSearchStr !== '') {
          this.userSearchTimeout = setTimeout(function () {
            http.request('post', '/user/search', {
              str: vue.userSearchStr
            }, function (result) {
              vue.userSearchLoading = false
              if (!result.error) {
                vue.userSearch = result
              } else {
                vue.userSearch = []
                vue.userSearchEmpty = true
              }
            })
          }, 1000)
        }
      },
      userSearchAdd: function (index) {
        let newUser = this.userSearch[index]
        let added = false
        for (let x = 0; x < this.project.members.length; x++) {
          if (newUser.ID === this.project.members[x].ID) {
            added = true
          }
        }
        if (!added) {
          this.project.members.push(newUser)
          this.editProjectMembers('add', newUser.ID)
        }
        this.userSearchStr = ''
        this.userSearchInput()
      },
      userSearchRemove: function (userId) {
        for (let x = 0; x < this.project.members.length; x++) {
          if (this.project.members[x].ID === userId) {
            this.editProjectMembers('delete', this.project.members[x].ID)
            this.project.members.splice(x, 1)
          }
        }
      },
      submitProject: function () {
        const vue = this
        http.request('post', '/project/create', {
          project: this.project
        }, function (result) {
          let profile = vue.profile
          let ownProjects = profile.projects.owner
          if (!ownProjects) {
            ownProjects = [result.ID]
          } else {
            ownProjects.push(result.ID)
          }
          profile.projects.owner = ownProjects
          vue.$emit('profileChange', profile)
          vue.$router.push('dashboard')
        })
      },
      deleteProject: function () {
        if (!this.create) {
          if (confirm('Are you sure to delete your project?')) {
            http.request('post', '/project/delete', {
              project_id: this.project.ID
            }, function (result) {
              console.log(result)
            })
            this.$router.push('/dashboard')
          }
        }
      }
    },
    created () {
      const vue = this
      if (vue.$route.params.project) {
        let projectRoute = vue.$route.params.project
        vue.create = false
        http.request('get', '/project?route=' + projectRoute, {}, function (result) {
          if (result.error) {
            if (result.error === 'project_not_found') {
              vue.notFound = true
            }
          } else {
            vue.project = result
            vue.project.imgsrc = result.img
          }
          vue.projectInit = true
        })
      }
    }
  }
</script>

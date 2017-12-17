<template>
  <div class="account page">
    <h2 class="page_headline">Edit account</h2>
    <div class="account_general">
      <div class="input half bg_gradient">
        <input type="text" placeholder="Prename" v-model="profile.fname" @change="editProfile('fname')" />
      </div>
      <div class="input half bg_gradient">
        <input type="text" placeholder="Lastname" v-model="profile.lname" @change="editProfile('lname')" />
      </div>
      <div class="clear"></div>
      <div class="input bg_gradient">
        <input type="email" placeholder="Email" v-model="profile.email" readonly />
      </div>
    </div>
    <div class="account_img">
      <div class="account_img_dropzone dropzone" :class="{drag: dropzoneDrag, empty: (profile.img==0)}">
        <div class="dropzone_content">
          <dropzone id="account_img_dropzone"
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
            <span v-if="(profile.img!=0)">change picture</span>
            <span v-if="(profile.img==0)">add picture</span>
          </div>
        </div>
      </div>
      <div class="account_img_content">
        <img v-if="profile.img != 0" :src="profile.img" />
      </div>
    </div>
    <div class="account_button">
      <router-link to="dashboard">
        <div class="account_button_dashboard button bg_gradient">
          <button>Dashboard</button>
        </div>
      </router-link>
      <div class="account_button_delete button">
        <button>Delete account</button>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/style/account.css'
  import Dropzone from 'vue2-dropzone'
  import { http, helper } from '@/helper'

  export default {
    name: 'Account',
    components: {
      dropzone: Dropzone
    },
    props: [
      'profile'
    ],
    data () {
      return {
        dropzoneOptions: {
          url: 'https://projectf-api.ttrks.de/media/upload',
          headers: {
            'Accept': 'application/json',
            'Authorization': helper.getCookie('token')
          },
          thumbnailWidth: 200,
          thumbnailHeight: 200,
          maxFilesize: 4,
          acceptedFiles: 'image/*',
          previewTemplate: this.dropzoneTemp()
        },
        dropzoneDrag: false
      }
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
        formData.append('type', 'user_img')
      },
      dropzoneSuccess: function (file, response) {
        this.dropzoneDrag = false
        var result = JSON.parse(response)
        this.profile.img = result.src
        this.$refs.accountImgDropzone.removeFile(file)
        // update db
        http.request('post', '/user/update', {
          attr: 'img', val: result.id
        }, function (result) {
          console.log(result)
        })
      },
      dropzoneError: function (file, response) {
        console.log('error: ' + response)
      },
      editProfile: function (attr) {
        const vue = this
        http.request('post', '/user/update', {
          attr: attr, val: vue.profile[attr]
        }, function (result) {
          console.log(result)
        })
      }
    },
    created () {}
  }
</script>

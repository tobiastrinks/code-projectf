<template>
  <div class="home page">
    <transition name="page" mode="out-in">
      <div class="home_login home_element" v-if="!switchBool">
        <h2 class="page_headline">Login</h2>
        <form method="post" action="javascript:void(0);" @submit="login_submit">
          <div class="home_element_input input bg_gradient">
            <input type="email" class="home_login_email" placeholder="Email" v-model="login.email" />
          </div>
          <div class="home_element_input input bg_gradient">
            <input type="password" class="home_login_pw" placeholder="password" v-model="login.pw" />
          </div>
          <p class="home_element_switch" @click="switchHome">
            Register now
          </p>
          <div class="home_element_button button bg_gradient">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </transition>
    <transition name="page" mode="out-in">
      <div class="home_register home_element" v-if="switchBool">
        <h2 class="page_headline">Registration</h2>
        <form method="post" action="javascript:void(0);" @submit="register_submit">
          <div class="home_element_input input half bg_gradient">
            <input type="text" class="home_login_pw" placeholder="Surname" v-model="register.fname" />
          </div>
          <div class="home_element_input input half bg_gradient">
            <input type="text" class="home_login_pw" placeholder="Last name" v-model="register.lname" />
          </div>
          <div class="home_element_input input bg_gradient">
            <input type="email" class="home_login_pw" placeholder="email" v-model="register.email" />
          </div>
          <div class="home_element_input input bg_gradient">
            <input type="password" class="home_login_pw" placeholder="password" v-model="register.pw" />
          </div>
          <div class="home_element_input input bg_gradient">
            <input type="text" class="home_login_pw" placeholder="factory number" v-model="register.factory_nb" />
          </div>
          <p class="home_element_switch" @click="switchHome">
            already registered
          </p>
          <div class="home_element_button button bg_gradient">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
  import '@/assets/style/home.css'
  import { http } from '@/helper'

  export default {
    name: 'Home',
    props: ['profile'],
    data () {
      return {
        login: [],
        register: [],
        switchBool: false
      }
    },
    methods: {
      switchHome: function () {
        this.switchBool = !this.switchBool
      },
      login_submit: function () {
        const vue = this
        http.request('post', '/login', {
          email: this.login.email,
          pw: this.login.pw
        }, function (result) {
          if (!result.error) {
            console.log(result.token)
            document.cookie = 'token=' + result.token
            // load profile
            http.request('get', '/user', 0, function (result) {
              vue.$emit('profileChange', result)
              vue.$router.push({ path: 'dashboard' })
            })
          } else {
            alert('wrong data')
          }
        })
      },
      register_submit: function () {
        const vue = this
        http.request('post', '/user/create', {
          fname: this.register.fname,
          lname: this.register.lname,
          email: this.register.email,
          pw: this.register.pw,
          factory_nb: this.register.factory_nb
        }, function (result) {
          if (!result.error) {
            vue.login.email = vue.register.email
            vue.login.pw = vue.register.pw
            vue.login_submit()
          } else if (result.error === 'email_used') {
            alert('this email was already used for creating an account')
          } else if (result.error === 'factory_nb_used') {
            alert('this factory number was already used for creating an account')
          } else {
            console.log(result)
          }
        })
      }
    },
    created: function () {
      this.$emit('profileChange', false)
    }
  }
</script>

<style>

</style>

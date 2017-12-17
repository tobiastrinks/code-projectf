import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Projects from '@/components/Projects'
import ProjectPage from '@/components/ProjectPage'
import ProjectCreate from '@/components/ProjectCreate'
import Account from '@/components/Account'
import Livechat from '@/components/Livechat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/projects/:project',
      name: 'ProjectPage',
      component: ProjectPage
    },
    {
      path: '/projects/:project/edit',
      name: 'ProjectEdit',
      component: ProjectCreate
    },
    {
      path: '/create',
      name: 'ProjectCreate',
      component: ProjectCreate
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/livechat',
      name: 'Livechat',
      component: Livechat
    }
  ]
})

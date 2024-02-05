import { createRouter as createVueRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue"
import Reports from "../views/Reports.vue"
import People from "../views/People.vue"
import { createAuthGuard } from "@auth0/auth0-vue"

export function createRouter(app) {
  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      beforeEnter: createAuthGuard(app)
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: createAuthGuard(app)
    },
    {
      path: "/people",
      name: "People",
      component: People,
      beforeEnter: createAuthGuard(app)
    },
  ]

  return createVueRouter({
    routes,
    history: createWebHistory()
  })
}

<template>

  <v-navigation-drawer permanent theme="dark" v-model="drawer">
      <v-sheet color="blue-darken-2" class="pa-4">
        
        <v-list>
          <v-list-item
            :title="isAuthenticated ? user.name : 'Login'"
            :subtitle="isAuthenticated ? user.email : 'to continue'"
            :to="isAuthenticated ? '/profile' : '/'"
          >
            <template v-slot:prepend>
              <v-avatar v-if="isAuthenticated" :src="user.picture"></v-avatar>
              <v-avatar v-else>
                <v-icon color="white">mdi-account</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

      </v-sheet>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          to="/"
        ></v-list-item>

        <v-list-item
          v-for="[icon, text, route] in routes"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="route"
        ></v-list-item>

      <v-list-item v-if="!isAuthenticated"
        prepend-icon="mdi-login"
        title="Login"
        link
        @click="login"
      ></v-list-item>

      <v-list-item v-if="isAuthenticated"
        prepend-icon="mdi-logout"
        title="Logout"
        link
        @click="logout"
      ></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
      drawer: true,
    }
  },
  mounted () {
    console.log('isAuthenticated?', this.isAuthenticated)
    if (this.isAuthenticated) {
      const user = this.user
      console.log('user', user)
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth0.isAuthenticated.value
    },
    isLoading () {
      return this.$auth0.isLoading
    },
    user () {
      return this.$auth0.user.value
    },
    routes () {
      if (!this.isAuthenticated) {
        return []
      } else {
        return [
          ['mdi-file-chart', 'Expense Reports', '/reports'],
          ['mdi-account-supervisor-circle', 'Supervisors', '/people'],
        ]
      }
    }
  },
  methods: {
    login () {
      this.$auth0.loginWithRedirect()
    },
    async logout () {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  }
}
</script>

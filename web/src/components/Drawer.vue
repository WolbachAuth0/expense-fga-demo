<template>

  <v-navigation-drawer permanent theme="dark" v-model="drawer">
      <v-sheet color="blue-darken-2" class="pa-4" v-if="isAuthenticated">
        <v-list>
          <v-list-item>
            <v-list-item-avatar class="mb-4" color="grey-darken-1" size="50">
              <img :src="isAuthenticated ? user.picture : ''" />
            </v-list-item-avatar>
            <v-list-item-content>
              {{ isAuthenticated ? user.email : '' }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in routes"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link
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
          ['mdi-file-chart', 'Reports'],
          ['mdi-account-supervisor-circle', 'Supervisors'],
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

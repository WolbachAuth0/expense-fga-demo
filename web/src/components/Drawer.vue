<template>

  <v-navigation-drawer permanent theme="dark" v-model="drawer">
      <v-sheet color="primary" class="pa-4">
        
        <v-list>
          <v-list-item
            :title="isAuthenticated ? user.name : ''"
            :subtitle="isAuthenticated ? user.email : ''"
            :to="isAuthenticated ? '/profile' : '/'"
          >
            <template v-slot:prepend>
              <v-avatar v-if="isAuthenticated" size="60">
                <v-img :src="user.picture"></v-img>
              </v-avatar>
              <v-avatar v-else size="60" color="info">
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

        <v-list-item v-if="isAuthenticated"
          prepend-icon="mdi-account-supervisor-circle"
          title="Profile"
          to="/profile"
        ></v-list-item>

        <v-list-item v-if="isAuthenticated"
          prepend-icon="mdi-file-chart"
          title="Expense Reports"
          to="/reports"
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

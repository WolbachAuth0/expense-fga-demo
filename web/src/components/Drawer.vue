<template>

  <v-navigation-drawer
    permanent
    expand-on-hover
    rail
    theme="dark"
  >

    <v-list>
      <v-list-item :title="profile.title" :subtitle="profile.subtitle" :to="profile.to">
        <template v-slot:prepend>
          <v-avatar v-if="isAuthenticated" size="40">
            <v-img :src="user.picture"></v-img>
          </v-avatar>
          <v-avatar v-else size="40" color="info">
            <v-icon color="white">mdi-account</v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>

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
    },
    profile () {
      return {
        title: this.isAuthenticated ? this.transformEmailToName(this.user.email) : '',
        subtitle: this.isAuthenticated ? this.user.email : '',
        to: this.isAuthenticated ? '/profile' : '/'
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
    },
    transformEmailToName(email) {
      let name = email.split('@')[0]
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
  }
}
</script>

<template>
    <!-- Application bar -->
		<v-app-bar :elevation="11" rounded>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        {{ title }}
      </v-app-bar-title>

      <template v-slot:append>
        
        <v-btn
          v-if="!isAuthenticated"
          prepend-icon="mdi-login"
          variant="elevated"
          color="primary"
          class="mx-4 text-white"
          @click="login"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
          Login
        </v-btn>

        <!-- <v-avatar class="m-4" color="grey-darken-1" size="50" v-if="isAuthenticated">
          <img :src="user.picture" />
        </v-avatar> -->

        <v-btn 
          v-if="isAuthenticated"
          prepend-icon="mdi-logout"
          variant="elevated"
          color="primary"
          class="mx-4 text-white"
          @click="logout"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
          Logout
        </v-btn>

      </template>
    </v-app-bar>
</template>

<script>
import authdocs from '../assets/auth0docs.svg'
import logo from '../assets/okta-logo-white.svg'

export default {
  name: 'NavigationBar',
  data () {
    return {
      title: 'Auth0 FGA Example App',
      shieldSRC: 'https://cdn.auth0.com/manhattan/versions/1.3435.0/assets/./badge.png',
      logo,
      authdocs,
      oktahomeURL: 'https://www.okta.com/',
      authdocsURL: 'https://auth0.com/docs',
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth0.isAuthenticated.value
    },
    isLoading () {
      return this.$auth0.isLoading.value
    },
    user () {
      return this.$auth0.user.value
    },
  },
  methods: {
    async login () {
      this.$auth0.loginWithRedirect()
    },
    async logout () {
      await this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  }
}
</script>

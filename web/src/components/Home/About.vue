<template>
  <v-sheet
    color="grey-darken-1"
    elevation="16"
    border
    rounded
  >
    <v-row>
      <v-col cols="6">
        <v-card class="ml-2 mt-2 px-2">
          <v-card-subtitle class="bg-primary text-white">Application Architecture</v-card-subtitle>
          <v-card-text>
            <p>
              This application is built to illustrate how a modern web application might use the Auth0 
              authentication (authN) and authorization (authZ) services. It consists of a Single Page Application
              (SPA) for a user interface, a REST API and a database. At the highest level, the SPA allows
              an authenticated user to interact with the UI, the SPA communicates with the REST API and the
              REST API brokers changes to the database on behalf of the user.
            </p>
          </v-card-text>

        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="mr-2 mt-2 pa-4">
          <v-card-text class="text-center">
            <v-img :src="architecture.light" cover></v-img>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>

export default {
  name: 'About',
  data () {
    return {
      orgChart: {
        light: '/img/org-chart-light.png',
        dark: '/img/org-chart-dark.png',
      },
      architecture: {
        light: '/img/architecture-light.png',
        dark: '/img/architecture-dark.png'
      },
    }
  }
}
</script>
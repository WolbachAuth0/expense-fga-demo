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
            <br/>
            <p>

            </p>
          </v-card-text>
          
          <v-card-subtitle class="bg-primary text-white">Authentication</v-card-subtitle>
          
          <v-list lines="one">
            <v-list-subheader title="User Authentication"></v-list-subheader>

            <v-list-item 
              v-for="item in authNItems"
              :key="item.value"
              :title="item.title"
            >
              <v-tooltip activator="parent" location="bottom" v-if="item.tooltip">
                {{ item.tooltip }}
              </v-tooltip>
            </v-list-item>

            <v-list-subheader title="Authorization"></v-list-subheader>

            <v-list-item 
              v-for="item in authZItems"
              :key="item.value"
              :title="item.title"
            >
              <v-tooltip activator="parent" location="bottom" v-if="item.tooltip">
                {{ item.tooltip }}
              </v-tooltip>
            </v-list-item>
          </v-list>

          <v-card-text>
            <p>
              
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
      authNItems: [
        {
          value: 1,
          title: '1. User navigates to application',
          tooltip: ''
        },
        {
          value: 2,
          title: '2. User clicks login',
          tooltip: 'User is redirected to Auth0 Universal Login (UL)'
        },
        {
          value: 3,
          title: '3. User submits credentials to Auth0',
          tooltip: 'Credentials are sent to the Auth0 server for verification'
        },
        {
          value: 4,
          title: '4. Succeful Authentication',
          tooltip: ' Auth0 redirects user back to application with tokens'
        },
      ],
      authZItems: [
        {
          value: 5,
          title: '5. User interaction',
          tooltip: `The front end sends http requests to the REST API.`
        },
        {
          value: 6,
          title: '6. Middleware calls Auth0 FGA API',
          tooltip: 'Check that user is authorized to perform action'
        },
        {
          value: 7,
          title: '7. CRUD action to database',
          tooltip: 'If the the user is authorized, persist data and respond to request.'
        },
      ]
    }
  }
}
</script>
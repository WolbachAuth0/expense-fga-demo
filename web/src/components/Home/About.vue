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
          <v-card-subtitle class="bg-primary text-white">Application</v-card-subtitle>
          <v-card-text>
            <p>
              This application is built to illustrate how a modern web application might use the Auth0 
              authentication (authN) and authorization (authZ) services. It consists of a Single Page Application
              (SPA) for a user interface, a database for persisting data and a REST API to broker data between the 
              user interface and the database. User authentication - determining who the user is - occurs at the 
              SPA layer and is handled by the <a href="https://auth0.com/">Auth0</a> authentication service. On 
              the other hand, user authorization - determining what the user is permitted to do - is performed 
              at the API layer and is handle by 
              <a href="https://auth0.com/fine-grained-authorization">Okta Fine Grained Authorization</a> service.
            </p>
          </v-card-text>
          
          <v-card-subtitle class="bg-primary text-white">Authentication & Authorization</v-card-subtitle>
          <v-card-text>
            <p>
              The diagram to the right shows a layout of the applications components and describes the Authentication
              and authorization flow. The process begins with a user navigating to the web application 
              <span class="text-primary">(1)</span> and initiating the login. When a user clicks the login button, 
              they will be redirected to the Auth0 Universal Login screen <span class="text-primary">(2)</span>.
              The user will enter their credentials into the UL. When the user submits their credentials 
              <span class="text-primary">(3)</span>, the Auth0 authentication server will perform the verification and 
              configured security tasks (e.g. MFA, attack protection etc.) and upon success, the user will be redirected 
              back to the front end of the application <span class="text-primary">(4)</span> with ID and Access Tokens. 
              At that point the user is successfully authenticated into the application.
            </p>
            <p>
              As the user interacts with the user interface, they will attempt to perform various tasks. For example, In this 
              demonstration application the user may attempt to list, submit and approve expense reports. As the user interacts with 
              UI elements, the SPA will send HTTP requests down to the REST API <span class="text-primary">(5)</span> to handle 
              fetching and updating the expense report data from the database. The HTTP request sends information about the expense 
              report which is being operated on (e.g. report_id) and who the authenticated user is (e.g. user_id) to the REST API. 
              Then the REST API has middleware which checks with the Okta FGA service <span class="text-primary">(6)</span> that 
              the user (by user_id) has permission to perform the current action on the specified resource (by report_id). The FGA 
              service responds back to the API <span class="text-primary">(7)</span> with either "Allowed" or "Not Allowed". If the 
              action is "Not Allowed", the REST API responds immediately to the SPA front end with an "Unauthorized" response 
              <span class="text-primary">(10)</span>. But if the action is "Allowed" by the FGA service, then the API will perform 
              any read and write actions <span class="text-primary">(8 & 9)</span> the database necessary for this action 
              <span class="text-primary">(7)</span> before responding back to the SPA front end with a successful response 
              <span class="text-primary">(10)</span>.
            </p>
          </v-card-text>

          <!-- <v-list lines="one">
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
          </v-list> -->
          
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
          title: '6. Middleware calls Okta FGA API',
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
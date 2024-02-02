<template>

  <v-card class="bg-secondary">
    <v-card-title class="bg-primary text-white">Welcome</v-card-title>

    <v-row class="py-1">
      <v-col cols="5">
        <v-card class="ml-2">
          <v-card-subtitle class="bg-primary text-white">Application Architecture</v-card-subtitle>
          <v-card-body>
            <p>Explain in this section how the app is architected.</p>
            <p>Describe how the authN and authZ flow works.</p>
            <p v-for="i in 22" :key="i">blah blah blahbity blah blah</p>
          </v-card-body>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card class="mr-2 p-2">
          <v-card-subtitle class="bg-primary text-white">Authorization Flow</v-card-subtitle>
          <v-img class="align-end" :src="architecture.dark" cover></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-card class="ml-2 p-2">
          <v-card-subtitle class="bg-primary text-white">How To Use This App</v-card-subtitle>
          <v-card-body>
            <p>Explain how the Authorization model works.</p>
            <p>Explain which users to login with.</p>
            <p v-for="i in 9" :key="i">blah blah blahbity blah blah</p>
          </v-card-body>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card class="mr-2 p-2">
          <v-card-subtitle class="bg-primary text-white">User Organization</v-card-subtitle>
          <v-img class="align-end" :src="orgChart.dark" cover></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-card class="ml-2 p-2">
          <v-card-subtitle class="bg-primary text-white">How To Use This App</v-card-subtitle>
          <v-card-body>
            <p>Explain how the Authorization model works.</p>
            <p>Explain which users to login with.</p>
            <p v-for="i in 9" :key="i">blah blah blahbity blah blah</p>
          </v-card-body>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card class="mr-2 p-2">
          <v-card-subtitle class="bg-primary text-white">Authorization Model</v-card-subtitle>
          <div class="row">
            <highlightjs language="yaml" :code="authModel" />
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-card>

</template>

<script>

export default {
  name: "home-view",
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
      authModel: `model
  schema 1.1

type employee
  relations
    define can_manage: manager or can_manage from manager
    define manager: [employee]

type report
  relations
    define approver: can_manage from submitter
    define submitter: [employee]`
    }
  }
};
</script>


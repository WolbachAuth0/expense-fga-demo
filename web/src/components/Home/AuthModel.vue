<template>
  <v-sheet color="grey-darken-1" elevation="16" border rounded>
    <v-row>
      <v-col cols="5">
        <v-card class="ml-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">How To Use This App</v-card-subtitle>
          <v-card-text>
            <p>Explain how the Authorization model works.</p>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card class="mr-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">Authorization Model</v-card-subtitle>
          <div class="row">
            <highlightjs language="yaml" :code="authModel" />
          </div>
        </v-card>

        <v-card class="mr-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">Organization Chart</v-card-subtitle>
          <v-card-text class="text-center">
            <v-img :src="orgChart.light" cover></v-img>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

  </v-sheet>
</template>

<script>

export default {
  name: 'AuthModel',
  data () {
    return {
      orgChart: {
        light: '/img/org-chart-light.png',
        dark: '/img/org-chart-dark.png',
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
}
</script>
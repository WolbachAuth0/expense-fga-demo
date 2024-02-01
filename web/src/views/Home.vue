<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="bg-primary text-white">Welcome</v-card-title>
        <v-card-subtitle class="text-white">How This App is Built</v-card-subtitle>
        <v-img class="align-end" :src="architecture.dark" cover></v-img>

        <v-card-subtitle class="text-white">How the Users are Organized</v-card-subtitle>
        <v-img class="align-end" :src="orgChart.dark" cover></v-img>
        
        
      </v-card>
    </v-col>
  </v-row>
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
      }
    }
  }
};
</script>


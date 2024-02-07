<template>
   <v-card class="bg-secondary">
    <v-card-title class="bg-primary text-white">People</v-card-title>

    <v-row>
      <v-col cols="12">
        <v-card class="ma-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">User Organization</v-card-subtitle>
          <v-img class="align-end" :src="orgChart.dark" cover></v-img>
        </v-card>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>

export default {
  name: "People",
  data () {
    return {
      orgChart: {
        light: '/img/org-chart-light.png',
        dark: '/img/org-chart-dark.png',
      }
    }
  }
};
</script>


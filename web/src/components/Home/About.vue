<template>
  <v-sheet
    color="grey-darken-1"
    elevation="16"
    border
    rounded
  >
    <v-row>
      <v-col cols="7">
        <v-card class="ml-2 mt-2 px-2">
          <v-card-subtitle class="bg-primary text-white">Application Architecture</v-card-subtitle>
          <v-card-text>
            <p>

            </p>
          </v-card-text>

        </v-card>
      </v-col>

      <v-col cols="5">
        <v-card class="mr-2 mt-2 px-2">
          <v-card-subtitle class="bg-primary text-white">Authorization Flow</v-card-subtitle>
          <v-img class="align-end" :src="architecture.dark" cover></v-img>
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
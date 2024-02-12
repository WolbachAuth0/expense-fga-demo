<template>
  <v-card>
    <v-tabs v-model="tab" density="compact">
      <v-tab value="0" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-human-greeting">Welcome</v-tab>
      <!-- <v-tab value="1" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-information">Architecture</v-tab> -->
      <v-tab value="1" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-wrench">Architecture</v-tab>
      <v-tab value="2" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-globe-model">FGA Model</v-tab>
    </v-tabs>

    <v-divider></v-divider>

    <v-window v-model="tab">

        <v-window-item :value="0">
          <Welcome/>
        </v-window-item>

        <v-window-item :value="1">
          <About/>
        </v-window-item>

        <v-window-item :value="2">
          <AuthModel/>
        </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import About from '../components/Home/About.vue'
import Welcome from '../components/Home/Welcome.vue'
import AuthModel from '../components/Home/AuthModel.vue'

export default {
  name: "home-view",
  components: {
    About,
    Welcome,
    AuthModel
  },
  data () {
    return {
      tab: 0
    }
  }
};
</script>

<style>

  div.v-card-text > p {
    text-indent: 30px;

  }

</style>

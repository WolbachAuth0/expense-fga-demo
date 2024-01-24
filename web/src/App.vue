<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <drawer></drawer>
    <error />
    <v-main>
       <v-container class="py-8 px-6" fluid>
            <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Error from './components/Error.vue';
import NavigationBar from './components/Navigationbar.vue';
import Drawer from './components/Drawer.vue'

export default {
  components: {
    NavigationBar,
    Error,
    Drawer
  }
};
</script>

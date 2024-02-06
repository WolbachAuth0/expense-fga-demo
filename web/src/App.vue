<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <drawer></drawer>
    
    <v-main>
       <v-container class="py-8 px-6" fluid>
          <announcer 
            :visible="alert.visible"
            :text="alert.text"
            :type="alert.type"
            :location="alert.location"
            @show="show"
            @hide="hide"
          ></announcer>
          <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import NavigationBar from './components/Navigationbar.vue'
import Drawer from './components/Drawer.vue'
import Announcer from './components/Announcer.vue'
import EventBus from './services/EventBus'

export default {
  components: {
    NavigationBar,
    Drawer,
    Announcer
  },
  data() {
		return {
			alert: {
        visible: false,
        text: '',
        type: 'success',
				location: 'top center'
      }
		}
	},
	async mounted() {
		EventBus.on('announce', this.makeAnnouncement)
  },
	methods: {
		makeAnnouncement ({ text='announcement text', type='success', top=true, right=true, left=false }) {
			this.alert.text = text
			this.alert.type = type
			this.alert.top = top
			this.alert.right = right
			this.alert.left = left

			this.alert.visible = true
		},
		show () {
			this.alert.visible = true
		},
		hide () {
			this.alert.visible = false
		}
	}
};
</script>

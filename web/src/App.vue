<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <drawer></drawer>

        <v-main>
            <v-container class="py-8 px-6 mb-12" fluid>
                <announcer :visible="alert.visible" :text="alert.text" :type="alert.type" :location="alert.location"
                    @show="show" @hide="hide"></announcer>
                <router-view />
            </v-container>
        </v-main>
        <status-footer></status-footer>
    </v-app>
</template>

<script>

import NavigationBar from './components/Navigationbar.vue'
import Drawer from './components/Drawer.vue'
import StatusFooter from './components/StatusFooter.vue'
import Announcer from './components/Announcer.vue'
import EventBus from './services/EventBus'

export default {
    components: {
        NavigationBar,
        Drawer,
        Announcer,
        StatusFooter
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
        makeAnnouncement({ text = 'announcement text', type = 'success' }) {
            this.alert.text = text
            this.alert.type = type
            this.alert.visible = true
        },
        show() {
            this.alert.visible = true
        },
        hide() {
            this.alert.visible = false
        }
    }
};
</script>

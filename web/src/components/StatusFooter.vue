<template>
    <v-footer class="bg-grey-darken-4" style="height: 50px; position:fixed; bottom:0; width: 100%">
        <v-row justify="center" no-gutters>
            <span>API Status: <v-icon class="ml-2" size="x-small" :color="statusColor" icon="mdi-circle"></v-icon> </span>
        </v-row>
    </v-footer>
</template>
<script>

import { getAPIStatus } from './../services/api'
export default {
    name: 'StatusFooter',
    data() {
        return { statusColor: "white" }
    },
    async mounted() {
        await this.getStatus();
    },
    methods: {
        async getStatus() {
            try {
                const result = await getAPIStatus();
                const color = result.message === "up" ? "secondary" : "error";
                this.statusColor = color;
            } catch (e) {
                // API is completely down
                this.statusColor = "error";
            }
        }
    }
}
</script>

<template>
    <v-navigation-drawer permanent expand-on-hover rail rail-width="82" theme="dark">

        <v-list>
            <v-list-item :title="profile.title" :subtitle="profile.subtitle" :to="profile.to">
                <template v-slot:prepend>
                    <v-avatar v-if="isAuthenticated" size="50">
                        <v-img :src="user.picture"></v-img>
                    </v-avatar>
                    <v-avatar v-else size="50" color="info">
                        <v-icon color="white">mdi-account</v-icon>
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>

            <v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>

            <v-list-item v-if="isAuthenticated" prepend-icon="mdi-account-supervisor-circle" title="Profile"
                to="/profile"></v-list-item>

            <v-list-item v-if="isAuthenticated" prepend-icon="mdi-file-chart" title="Expense Reports"
                to="/reports"></v-list-item>

            <v-list-item prepend-icon="mdi-school" title="Learn More" href="https://docs.fga.dev/"
                target="_blank"></v-list-item>

            <v-list-item prepend-icon="mdi-play-circle-outline" title="Get Started" href="https://dashboard.fga.dev/"
                target="_blank"></v-list-item>

            <!-- login / logout list items should be last -->

            <v-list-item v-if="!isAuthenticated" prepend-icon="mdi-login" title="Login" link @click="login"></v-list-item>

            <v-list-item v-if="isAuthenticated" prepend-icon="mdi-logout" title="Logout" link @click="logout"></v-list-item>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { transformEmailAddressToFirstName } from "./../utils/string_utils";

export default {
    name: 'Drawer',
    data() {
        return {
            drawer: true,
        }
    },
    mounted() {
        console.log('isAuthenticated?', this.isAuthenticated)
        if (this.isAuthenticated) {
            const user = this.user;
        }
    },
    computed: {
        isAuthenticated() {
            return this.$auth0.isAuthenticated.value;
        },
        isLoading() {
            return this.$auth0.isLoading;
        },
        user() {
            return this.$auth0.user.value;
        },
        profile() {
            return {
                title: this.isAuthenticated ? this.transformEmailToName(this.user.email) : '',
                subtitle: this.isAuthenticated ? this.user.email : '',
                to: this.isAuthenticated ? '/profile' : '/'
            }
        }
    },
    methods: {
        login() {
            this.$auth0.loginWithRedirect();
        },
        async logout() {
            this.$auth0.logout({
                logoutParams: {
                    returnTo: window.location.origin
                }
            });
        },
        transformEmailToName(email) {
            return transformEmailAddressToFirstName(email);
        },
    }
}
</script>

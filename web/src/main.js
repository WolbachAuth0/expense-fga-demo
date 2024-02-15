import App from "./App.vue";
import { createApp } from "vue";
import { createRouter } from "./router";
import { createAuth0 } from "@auth0/auth0-vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
// make sure to also import the coresponding css
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import theme from "./plugins/theme";

const environ = import.meta.env;

const vuetify = createVuetify({
  components,
  directives,
  theme,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
app
  .use(createRouter(app))
  .use(vuetify)
  .use(
    createAuth0({
      domain: environ.VITE_AUTH0_TENANT_DOMAIN,
      clientId: environ.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environ.VITE_API_AUDIENCE,
      },
      cacheLocation: "localstorage",
    }),
  )
  .mount("#app");

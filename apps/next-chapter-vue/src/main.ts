import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { clerkPlugin } from "vue-clerk";
import { router } from "./Routes";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import "./style.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  display: {
    thresholds: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});

const app = createApp(App);

app.use(vuetify);

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
});

app.use(router);

app.use(VueQueryPlugin);

app.mount("#app");

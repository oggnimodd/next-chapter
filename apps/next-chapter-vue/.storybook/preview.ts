import "../src/style.css";

import type { Preview } from "@storybook/vue3";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { clerkPlugin } from "vue-clerk";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { setup } from "@storybook/vue3";

setup((app) => {
  const vuetify = createVuetify({
    components,
    directives,
  });

  app.use(vuetify);

  app.use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  });

  app.use(router);

  app.use(VueQueryPlugin);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

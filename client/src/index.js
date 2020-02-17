import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router/index";

import { domain, clientId, audience } from "../../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth/index.js";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push({ name: "home" });
  }
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

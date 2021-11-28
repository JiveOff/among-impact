import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "./assets/scss/app.scss";
import "./assets/css/stylesheet.css";

Vue.use(Buefy);

import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";

const socket = io(process.env.VUE_APP_API_URL + "/game", {
  reconnectionDelayMax: 10000,
  withCredentials: true,
  path: "/game/",
});

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socket,
  })
);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

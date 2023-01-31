import Vue from "vue";
import App from "./App.vue";

import 'bulma/css/bulma.css';
import Buefy from "buefy";

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEyeSlash,
  faUser,
  faGavel,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/scss/app.scss";
import "./assets/css/stylesheet.css";

Vue.use(VueToast);
Vue.use(Buefy);

import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL + "/game", {
  reconnectionDelayMax: 10000,
  withCredentials: true,
  path: "/game/",
});

library.add(faEye, faEyeSlash, faUser, faGavel, faTimes);
Vue.component("font-awesome-icon", FontAwesomeIcon);

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

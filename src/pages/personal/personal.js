import Vue from "vue";
import "./personal.scss";
import "minireset.css";
import Top from "components/top/top.vue";
import Search from "components/search/search.vue";
import Foot from "components/foot/foot.vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
new Vue({
  el: "#app",
  router,
  components: {
    Top,
    Foot,
    Search,
    App
  },
  store
});

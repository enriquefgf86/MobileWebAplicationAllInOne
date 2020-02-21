import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";
import "firebase/firestore";
import SearchTag from "./components/SearchBar.vue";
import FiltersTag from "./components/Filters.vue";
import SuggestedTags from "./components/Suggested.vue";
import * as VueGoogleMaps from "vue2-google-maps";
export default firebase;

// router.beforeEach((to, from, next)=>{
//   if(store.getters.getUser==null||store.getters.getUser==undefined && next.path==='/welcome' ){
//     next('/welcome')
//   }
//     else next()
// });

Vue.use(VueChatScroll);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS///hiding this apikey in global variables on .env file . already gitignore it
  }
});

Vue.config.productionTip = false;
Vue.component("search-tag", SearchTag);
Vue.component("filter-tag", FiltersTag);
Vue.component("Suggested", SuggestedTags);
new Vue({
  router,
  store,
  VueGoogleMaps,
  vuetify,
  render: h => h(App),

  created() {
    require("firebase/firestore");

    firebase.initializeApp({
      apiKey: "AIzaSyCz8WcIwP0zpdfLzjw09E1prGtuFo2SDGM",
      authDomain: "webappmob-c6b01.firebaseapp.com",
      databaseURL: "https://webappmob-c6b01.firebaseio.com",
      projectId: "webappmob-c6b01",
      storageBucket: ""
    });
    store.dispatch("keepUserSigned");
    store.dispatch("fecthLocationCoordenates");
  }
}).$mount("#app");

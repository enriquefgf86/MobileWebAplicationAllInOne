import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allEvents: [],
    country: "",
    loader: false,
    users: null
    // userData: [
    //   { name: 'pedro' }
    // ]
  },
  getters: {
    getAllEvents(state) {
      return state.allEvents;
    },
    getCountryCode(state) {
      return state.country;
    },
    getLoader(state) {
      return state.loader;
    },
    getEventSelected: state => idItemSelected => {
      return state.allEvents.find(myEvent => myEvent.id === idItemSelected);
    },
    getUser(state) {
      return state.users;
    }
  },
  mutations: {
    settingEvents(state, payload) {
      state.allEvents = payload;
    },
    settingCountryCode(state, payload) {
      state.country = payload;
    },
    settingLoader(state, payload) {
      state.loader = payload;
    },
    // settingUser(state, payload) {
    //   state.users = payload
    // },
    settingUserIn(state, payload) {
      state.users = payload;
    }
    // settingCreatedUser(state, payload) {
    //   state.userData = payload
    // }
  },
  actions: {
    fetchAllEvents({ commit, getters }) {
      commit("settingLoader", true);
      fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=" +
          getters.getCountryCode +
          "&apikey=u9J2KO1suMtXiOpzTDFujBjH41xFIeqD",
        {
          method: "GET"
        }
      )
        .then(response => {
          return response.json();
        })
        .then(test => {
          // console.log(test._embedded.events);
          commit("settingLoader", false);
          commit("settingEvents", test._embedded.events);
        })
        .catch(error => {
          error;//console.log omitido por problemas de posteo en netlify
          commit("settingLoader", false);
        });
    },
    fecthLocationCoordenates({ commit, dispatch }) {
      commit("settingLoader", true);

      fetch(
        "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
          process.env.VUE_APP_GOOGLE_MAPS_GEO,
        {
          method: "POST"
        }
      )
        .then(response => {
          return response.json();
        })
        .then(test => {
          // console.log(test);
          commit("settingLoader", false);

          dispatch("fetchCurrentLocation", test.location);
        })
        .catch(err => {
          commit("settingLoader", false);
          err;//console.log omitido por problemas de posteo en netlify
        });
    },
    fetchCurrentLocation({ commit, dispatch }, payload) {
      commit("settingLoader", true);
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          payload.lat +
          "," +
          payload.lng +
          "&key=" +
          process.env.VUE_APP_GOOGLE_MAPS_LAT_LONG,
        {
          method: "POST"
        }
      )
        .then(response => {
          return response.json();
        })
        .then(path => {
          // console.log(path.results[0].address_components[0].short_name);
          commit(
            "settingCountryCode",
            path.results[0].address_components[0].short_name
          );
          dispatch("fetchAllEvents");
          commit("settingLoader", false);
        })
        .catch(error => {
          error;//console.log omitido por problemas de posteo en netlify
          commit("settingLoader", false);
        });
    },

    settingCountryCode({ commit }, payload) {
      // console.log(payload);
      commit("settingCountryCode", payload);
    },
    signUserUp({ commit }, payload) {
      commit("settingLoader", true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          let user = firebase.auth().currentUser;
          // console.log(user);
          user
            .updateProfile({
              displayName: payload.name
            })

            .then(() => {
              const User = {
                id:user.uid,
                email: user.email,
                name: user.displayName
              };
              commit("settingUserIn", User);
              commit("settingLoader", false);
            });
        })
        .catch(error => {
          error;//console.log omitido por problemas de posteo en netlify
          commit("settingLoader", false);
        });
    },
    signUserIn({ commit }, payload) {
      commit("settingLoader", true);

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const User = {
            id: user.user.uid,
            email: user.user.email,
            name: user.user.displayName
          };
          // console.log(User);
          commit("settingUserIn", User);
          commit("settingLoader", false);
        })
        .catch(error => {
          error;//console.log omitido por problemas de posteo en netlify
          commit("settingLoader", false);
        });
    },
    keepUserSigned({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // console.log(user);

          const newUser = {
            id: user.uid,
            email: user.email,
            name: user.displayName
          };

          commit("settingUserIn", newUser);
        } else {
          alert("No user");
          this.user = null;
        }
      });
    },
    signUserOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("settingUserIn", null);
          // console.log(firebase);
          // this.$router.push('/welcome')
        });
    }
  }
});

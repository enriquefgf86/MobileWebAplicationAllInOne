<template>
  <v-app>
    <div>
      <v-toolbar fixed height="50px" dark prominent src="./assets/alli.jpg">
        <v-toolbar-title>
          <div
            style="cursor:pointer"
            @click="drawer=!drawer"
            small
            class="hidden-md-and-up mt-5 mr-1"
          >
            <img class="arrowRight" src="./assets/right.png" />
          </div>

          <router-link to="/" class="router" color="orange">
            <img class="casita hidden-md-and-up" src="./assets/home1.png" />
            <h1 class="textColor hidden-md-and-down" color="orange">All in One</h1>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
       

        <v-toolbar-items>
          <v-spacer></v-spacer>
          <h2 class="all-one hidden-md-and-down" v-if="getUser">Welcome: {{getUser.name}}</h2>
          <div v-for="buttons in toolBarButtons" v-bind:key="buttons.title">
            <div class="hidden-md-and-down">
              <v-btn
                id="barItems"
                clickable
                class="amber darken-3 ml-3"
                router
                v-bind:to="buttons.link"
                style="cursor:pointer"
              >
                <v-icon>{{buttons.icon}}</v-icon>
                <v-list color="amber darken-3 ml-3">{{buttons.title}}</v-list>
              </v-btn>
            </div>
          </div>
          <div class="logOut">
            <v-btn
              small
              v-show="user"
              @click="getUserOut"
              clickable
              class="amber darken-3 ml-3"
              style="cursor:pointer"
            >
              <v-icon small large>mdi-logout</v-icon>
              <v-list class="amber darken-3 ml-3">Log Out</v-list>
            </v-btn>
          </div>
        </v-toolbar-items>
      </v-toolbar>
      <v-navigation-drawer absolute height="350px" class="amber lighten-3" v-model="drawer">
        <div
          style="cursor:pointer"
          @click="drawer=!drawer"
          small
          class="hidden-md-and-up mt-5 mr-1"
        >
          <img class="arrowLeft" src="./assets/left.png" />
          <h2 class="all-onedrw hidden-md-and-up" v-if="getUser">Welcome: {{getUser.name}}</h2>
        </div>

        <div v-for="buttons in toolBarButtons" v-bind:key="buttons.title">
          <div color="amber darken-3 ml-3">
            <v-btn text router v-bind:to="buttons.link" style="cursor:pointer">
              <v-icon large id="text0">{{buttons.icon}}</v-icon>
              <v-list id="text1">{{buttons.title}}</v-list>
            </v-btn>
            <v-spacer></v-spacer>
          </div>
        </div>
        <v-btn text v-if="user" @click="getUserOut" clickable style="cursor:pointer">
          <v-icon large id="text0">mdi-logout</v-icon>
          <v-list id="text1">Log Out</v-list>
        </v-btn>
        <div class="socialsBlock">
          <div>
            <a href="http://www.instagram.com">
              <img class="socials" src="./assets/insta.jpg" />
            </a>
          </div>
          <div>
            <a href="http://www.twitter.com">
              <img class="socials" src="./assets/twitt.jpg" />
            </a>
          </div>
          <div>
            <a href="http://www.linkedin.com">
              <img class="socials" src="./assets/linkedin.svg" />
            </a>
          </div>
          <div>
            <a href="http://www.gmail.com">
              <img class="socials" src="./assets/gmail.jpg" />
            </a>
          </div>
          <div>
            <a href="http://www.facebook.com">
              <img class="socials" src="./assets/facebook.jpg" />
            </a>
          </div>
        </div>
      </v-navigation-drawer>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  components: {},

  data() {
    return {
      drawer: false
    };
  },
  methods: {
    ...mapActions(["signUserOut"]),

    getUserOut() {
      return (
        this.$store.dispatch("signUserOut") && this.$router.push("/welcome")
      );
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    user() {
      return this.$store.getters.getUser;
    },

    toolBarButtons() {
      const notSigned = [
        { title: "Sign In", icon: "mdi-login", link: "/signIn" },
        { title: "Sign Up", icon: "mdi-login", link: "/signUp" }
      ];
      const items = [
        { title: "Chat Room", icon: "mdi-wechat", link: "/chat" },
        { title: "About", icon: "mdi-information", link: "/about" }
        // {title:'Search Results', icon:'mdi-cloud-search-outline',link:'/results'},
        // {title:'Welcoming Page', icon:'mdi-wechat',link:'/welcome'},
      ];
      if (this.user != null && this.user != undefined) {console.log(this.user);
        return items;
        
      }
 
      return notSigned;
      
    }
  },
  
};
</script>
<style>
.textColor {
  position: absolute;
  color: rgb(255, 123, 0);
  font-size: 150%;
  font-family: cursive;
  margin-top: -40px;
  margin-left: 30px;
}
.textColor:active {
  color: orange;
}
.textColor:visited {
  color: orange;
}
#text1,
#text0 {
  color: rgb(255, 123, 0);
  font-size: 100%;
  font-family: cursive;
  font-weight: bold;
}
#text1 {
  margin-left: 10px;
}
#text0 {
  margin-left: 5px;
}
.router {
  text-decoration: none;
  color: orange;
}
.casita {
  margin-left: 30px;
  height: 40px;
  width: 40px;
  margin-top: -35px;
  position: absolute;
}
.all-one {
  background-color: white;
  border-radius: 50px;
  opacity: 0.7;
  margin-right: 130px;
  height: 40px;
}
.all-onedrw {
  background-color: white;
  border-radius: 50px;
  opacity: 0.7;
  margin-right: 130px;
  width: 220px;
  text-align: center;
  padding-left: 10px;
}

.arrowRight,
.arrowLeft {
  position: absolute;
  height: 30px;
  width: 30px;
  cursor: pointer;
}
.arrowRight {
  position: absolute;
  margin-top: -25px;
  margin-left: -5px;
}
.arrowLeft {
  position: absolute;
  margin-top: -5px;
  margin-left: 220px;
}
.socials {
  /* position:absolute; */
  height: 30px;
  width: 30px;
  margin-top: 10px;
}
.socialsBlock {
  display: flex;
  flex-direction: row;
  width: 200px;
  align-content: space-between;
  justify-content: space-between;
  margin-left: 20px;
}
#barItems {
  border-radius: 50px;
}
</style>

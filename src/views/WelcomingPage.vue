<template>
<div>
  <div >
    <video autoplay muted loop id="myVideo">
      <source src="../assets/all.mp4" type="video/mp4" />
    </video>
    <div class="welcome">
      <div class="allHeads">
        <div class="head1">
          <h1>All in One</h1>
        </div>
        <div class="head2">
          <div class="head3">
            <h3>Go anywhere without asking to yourself what you want to do!!!</h3>
          </div>
          <h3>we got all your responses!!!!</h3>
        </div>
      </div>
    </div>
    <div class="userorNot">
      <div>
        <h1>Are you User</h1>
      </div>
      <div class="AllButtons">
        <div class="butt2">
          <v-btn class="amber darken-4 white--text" @click="routingIn" style="cursor:pointer">Yes</v-btn>
        </div>
        <v-btn style="cursor:pointer" @click="routingUp" class="amber darken-4 white--text">No</v-btn>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "WelcomingPage",
  computed: {
    ...mapGetters(["getUser"]),
user(){ 
  // console.log(this.$store.getters.getUser);
  return this.$store.getters.getUser
 
}

    
  },
  methods: {
    routingUp() {
      return this.$router.push("/signUp");
    },
    routingIn() {
      return this.$router.push("/signIn");
    },
  },
  watch:{
    user(value) {
      if(value!=null||value!=undefined){
          this.$router.push('/')
      }
      else{
        return this
      }
    },
  }
  // created(){
  //   this.user();
    
  // }
  
};
</script>

<style>
#myVideo {
  position: fixed;
  bottom: 0;
  top: 50px;
  right: 0;
  min-height: 100%;
  min-width: 100%;
}
.welcome,
.userorNot {
  position: fixed;
  background: rgba(39, 2, 2, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}
.welcome {
  bottom: 500px;
}
.userorNot {
  bottom: 250px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: center;
}
.AllButtons {
  width: 250px;
  display: flex;
  top: 50px;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-between;
}
.allHeads {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media screen and (orientation: landscape) and (min-device-width: 340px) {
  .welcome {
    bottom: 150px;
  }
  .userorNot {
    bottom: 20px;
    height: 150px;
  }
}
</style>

<template>
  <div class='card'><div>
      
      <v-container  >
    <v-card id='card' class="mx-auto"  max-width="290" scale="40px" >
      <v-img :src="Suggested._embedded.attractions[0].images[0].url" height="80px"/>

      <v-card-title>
        {{ Suggested.name }}
      </v-card-title>

      <v-card-title>
          <div>
        <v-img class='imgTitle' src='../assets/alli.jpg'/><h2 class='h2One'>All In One</h2></div>
      </v-card-title>

      <v-card-actions>
          <router-link :to="'/results/'+Suggested.id">
        <v-btn color='deep-orange'  text>See More Details</v-btn>
          </router-link>

        <v-spacer></v-spacer>

        <v-btn icon large color='deep-orange' @click="show = !show">
          <v-icon>{{ show ?  'mdi-chevron-up-circle-outline'  : 'mdi-chevron-down-circle-outline' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <h2>{{ Suggested.name}}</h2>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card></v-container><router-view />
  </div></div>
</template>

<script>
// import { mapGetters} from 'vuex'
export default {
  name: "Suggested",
  props: {
    Suggested: Object
  },
  data() {
    return {
      show: false
    };
  },
  computed:{
  }
};
</script>

<style>
.card{
    /* padding:1rem; */
    /* box-shadow: 1px 2px 5px 7px; */
    align-items: center;
    margin-left:13px;
    border:solid 6px white;
}
.imgTitle{
   position:absolute;
   width:50px;
   height:50px;
   margin-top:-30px
}
.h2One{
  position:absolute;
  font-size:20px;
   margin-top:-30px;   
   margin-left:50px;
}
</style>

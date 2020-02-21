<template>
  <v-container>
    <v-container>

      <v-layout v-if="loading">
        <v-flex xs12 class="primary--text">
          <v-progress-circular indeterminate :width="7" :size="70" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>

      <v-layout   justify-center v-else>
        <v-flex >

          <v-layout row wrap justify->
            <v-flex xs12 sm6 md6 lg4 xl4 offset-xl12>

              <v-layout wrap column justify-space-around="10px">
                <v-flex  xs12 sm6 md5 lg5 xl4 >
                  <v-img class='im' :src="SearchResults.images[0].url" height="400px" />
                </v-flex>
              </v-layout>


              <v-layout column wrap justify-space-between>
                <v-flex  xs12 sm6 md5 lg5 xl4 >
                  <v-col>
                    <v-row align="center" class="mx-0"></v-row>

                    <div class="Title">{{ SearchResults.name }}</div>
                    <div class="details">
                      <div>
                        <h3>Place:</h3>
                        {{ SearchResults._embedded.venues[0].name }}
                      </div>
                      <div>
                        <h3>Adress:</h3>
                        {{ SearchResults._embedded.venues[0].address.line1 }}
                      </div>
                      <div>
                        <h3>City:</h3>
                        {{ SearchResults._embedded.venues[0].city.name }}
                      </div>
                      <div>
                        <h3>Country:</h3>
                        {{ SearchResults._embedded.venues[0].country.name }}
                      </div>
                    </div>
                  </v-col>
                  <div class="tags">
                    <v-col class="px-0">
                      <v-rating
                        color="orange"
                        :value="4.5"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                    </v-col>
                  </div>
                </v-flex>
              </v-layout>

            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-around>
            <v-flex>
              <div class="pinMap1">
                <img
                  id="pinJumper"
                  v-show="!showHideMap"
                  class="box bounce-4"
                  src="../assets/pin.jpg"
                />
              </div>
              <v-btn id="map" text class="orange--text" @click.stop="showHideMap = true">
                {{
                showHideMap ? "" : "Show Map"
                }}
              </v-btn>
              <router-link to="/">
                <v-btn id="homeButt" v-show="!showHideMap" class="orange white--text">Go Back</v-btn>
              </router-link>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex>
              <v-dialog v-model="showHideMap" height="800px" width="100%">
                <div>
                  <v-btn
                    class="orange white--text"
                    @click.native="showHideMap = false"
                  >{{ showHideMap ? "HideMap" : "" }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <gmap-map
                    v-bind:center="getEventPosition"
                    :zoom="12"
                    style="width:100%;  height: 400px;"
                  >
                    <gmap-marker :position="getEventPosition"></gmap-marker>
                  </gmap-map>
                </div>
              </v-dialog>
            </v-flex>
          </v-layout>

        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchResults",
  props: ["idItemSelected"],
  data() {
    return {
      showHideMap: false
    };
  },
  computed: {
    ...mapGetters(["getEventSelected"]),

    SearchResults() {
      return this.getEventSelected(this.idItemSelected);
    },
    getEventPosition() {
      return {
        lat: Number(this.SearchResults._embedded.venues[0].location.latitude),
        lng: Number(this.SearchResults._embedded.venues[0].location.longitude)
      };
    },
    loading() {
      return this.$store.getters.getLoader;
    }
  }
};
</script>

<style>
.tags {
  position: absolute;
  margin-top: -450px;
  margin-left: 150px;
}
h3 {
  font-family: cursive;
  font-size: 1.5rem;
}
.Title {
  font-family: cursive;
  font-weight: bold;
  font-size: 1.6rem;
  text-align: center;
}
.pinMap1 {
  position: absolute;
  margin-top: -10px;
  margin-left: 120px;
  align-items: center;
}
.pinMap {
  position: absolute;
  margin-top: -40px;
}
#homeButt {
  position: absolute;
  margin-left: 7rem;
  margin-top: 0rem;
}
.details {
  padding-bottom: 3rem;
}
.box {
  align-self: flex-end;
  animation-duration: 1s;
  animation-direction: reverse;
  animation-iteration-count: infinite;
  height: 50px;
  margin: 0 auto 0 auto;
  transform-origin: bottom;
  width: 50px;
}
.bounce-4 {
  animation-name: bounce-4;
  animation-timing-function: ease-in-out;
}
@keyframes bounce-4 {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-30px);
  }
  50% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@media screen and (orientation: landscape) and (min-device-width: 340px) {
  .tags {
    position: absolute;
    margin-top: -300px;
    margin-left: 550px;
  }
  .im{
    height:250px !important;
    position:relative!important;
  }
  .Title {
    position: absolute;
    margin-top: -250px;
    margin-left: 440px;
     font-size: 1.2rem;
  }
  h3 {
  font-size: 1rem;
}
  .details {
    position: absolute;
    margin-top: -220px;
    margin-left: 440px;
  }
  #pinJumper {
    margin-top: -20px;
    position: absolute;
    margin-left: 440px;
  }
  #map {
    margin-top: -20px;
    position: absolute;
    margin-left: 440px;
  }
  #homeButt {
    position: absolute;
    margin-left: 650px;
    margin-top: -20px;
  }
}
  @media screen and (min-width: 900px) {
    .Title {
    position: absolute;
    margin-top: -250px;
    margin-left: 440px;
     font-size: 1.6rem;
  }
  h3 {
  font-size: 1.4rem;
  margin-top:10px
      /* margin-top: -200px; */

}
  #pinJumper {
    margin-top: 100px;
    margin-left: 240px;
  }
  #map {
    margin-top: 100px;
    margin-left: 440px;
  }
  #homeButt {
    margin-left: 650px;
    margin-top: 100px;
  }
  .tags {
  margin-top: 50px;
  margin-left: 150px;
}
}
</style>

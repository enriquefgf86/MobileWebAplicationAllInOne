<template>
  <div v-if="user" class="home">
    <img class="body" src="../assets/alli.jpg" />
    <SearchBar
      @receivingSelfSearch="autoSearch"
      v-bind:val="Search"
    ></SearchBar>
    <!-- <filter-tag ></filter-tag> -->
    <Filters
      @receiveCountryList="theCountryList"
      v-bind:countryList="allCountries"
      @receiveEventList="theEventList"
      v-bind:eventList="allEvents"
      @receiveModalityList="theModalityList"
      v-bind:modalityList="allModalities"
    >
    </Filters>
    <div class="container1">
      <v-content id="containerScroll">
        <v-container v-if="loadingLoader">
          <v-flex xs12 class="primary--text">
            <v-progress-circular
              indeterminate
              :width="7"
              :size="50"
              color="primary"
            >
            </v-progress-circular>
          </v-flex>
        </v-container>
        <v-container v-else class="d-flex flex-wrap" id="cards direction">
          <!-- <v-flex xs12 sm8 md6 lg4 xl4> -->
          <Suggested
            v-for="(suggestions, index) in autoSearchFilter"
            v-bind:Suggested="suggestions"
            v-bind:key="index"
          ></Suggested> </v-container
      ></v-content>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
// import { mapState } from "vuex"
import Filters from "../components/Filters.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "home",
  components: {
    Filters,
    SearchBar
  },
  data() {
    return {
      listCountries: "",
      listEvents: "",
      listModalities: "",
      Search: ""
    };
  },
  methods: {...mapActions(['fecthLocationCoordenates','fetchCurrentLocation','settingCountryCode']),
    autoSearch(text) {
      this.Search = text;
    },
    theCountryList(countries) {
      this.listCountries = countries;
    },
    theEventList(events) {
      this.listEvents = events;
    },
    theModalityList(modalities) {
      this.listModalities = modalities;
    }
  },
  computed: {
    ...mapGetters(["getCountryCode", "getAllEvents", "getLoader","getUser"]),

    loadingLoader() {
      return this.$store.getters.getLoader;
    },
    user(){
      return this.$store.getters.getUser
    },

    autoSearchFilter:function() {
      
      // console.log(this.Search);
      if (this.Search != 0) {
        return this.getAllEvents.filter(selfSearch => {
          return (
            selfSearch.classifications[0].genre.name
              .toUpperCase()
              .includes(this.Search.toUpperCase()) ||
            selfSearch.classifications[0].subGenre.name
              .toUpperCase()
              .includes(this.Search.toUpperCase()) ||
            selfSearch.name.toUpperCase().includes(this.Search.toUpperCase()) ||
            // selfSearch._embedded.attractions[0].name
            //   .toUpperCase()
            //   .includes(this.Search.toUpperCase()) ||
            selfSearch._embedded.venues[0].city.name
              .toUpperCase()
              .includes(this.Search.toUpperCase()) ||
            selfSearch._embedded.venues[0].name
              .toUpperCase()
              .includes(this.Search.toUpperCase()) ||
            selfSearch._embedded.venues[0].state.name
              .toUpperCase()
              .includes(this.Search.toUpperCase()) ||
            selfSearch._embedded.venues[0].country.countryCode
              .toUpperCase()
              .includes(this.Search.toUpperCase()) ||
            selfSearch._embedded.venues[0].country.name
              .toUpperCase()
              .includes(this.Search.toUpperCase())
          );
        });
      } else if (this.listModalities) {
        return this.getAllEvents.filter(events => {
          return (
            events.classifications[0].subGenre.name.toUpperCase() ===
            this.listModalities.toUpperCase()
          );
        });
      } else {
        // console.log(this.getAllEvents);
        return Array.from(new Set(this.getAllEvents));
      }
    },
    allEvents: function() {
      // console.log(this.getAllEvents);
      return Array.from(
        new Set(
          this.getAllEvents.map(
            mapEvents => mapEvents.classifications[0].segment.name
          )
        )
      );
    },
    allCountries:function() {
      return [
        "US",
        "CA",
        "IE",
        "GB",
        "AU",
        "NZ",
        "MX",
        "AT",
        "BE",
        "DE",
        "DK",
        "ES",
        "FI",
        "NL",
        "NO",
        "PL",
        "SE",
        "FR"
      ];
    },
    allModalities:function() {
      return Array.from(
        new Set(
          this.getAllEvents
            .filter(
              eventSelected =>
                eventSelected.classifications[0].segment.name ==
                this.listEvents
            )
            .map(modEventSelected =>
              modEventSelected.classifications[0].subGenre.name.toUpperCase()
            )
        )
      );
    }
  },
  created() {}
};
</script>
<style>
.body {
  position: absolute;
  height: 90%;
  width: 110%;
  margin-top:150px;
  opacity: 0.3;
}

#containerScroll {
  height: 600px;
  overflow: scroll;
}
 #containerScroll::-webkit-scrollbar {
  width: 1em;
}
 
#containerScroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
#containerScroll::-webkit-scrollbar-thumb {
  background-color: orange;
  outline: 1px solid orange;
}
@media screen and (orientation: landscape) and (min-device-width: 340px) {
  .body {
  position: absolute;
  height: 90%;
  width: 110%;
  margin-top:100px;
  opacity: 0.3;
}
  #containerScroll {
    /* width:500px;
  height:200px;*/
    height: 300px;
    overflow: scroll;
  }
  .container1 {
    position: absolute;
    margin-top: -110px;
  }
}
@media  (min-width: 870px) {
  #containerScroll {
    width: 100%;
    height:600px;
    overflow: scroll;
  }
 #containerScroll::-webkit-scrollbar {
  width: 2em;
}
 
  .container1 {
    position: absolute;
    margin-top: -110px;
    margin-left:160px
  }
}
</style>

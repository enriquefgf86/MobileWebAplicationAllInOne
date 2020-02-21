<template>
  <v-container>
    <div class="generalContainer">
      <div class="mainFilters">
        <div>
          <select
            @change="sendingCountries()"
            class="drop1"
            placeholder="Country"
            v-model="dropDownCountry"
          >
            <option disabe seleced="true"><h2>Country</h2></option>
            <option
              v-for="(country, index) in countryList"
              v-bind:key="index"
              v-bind:value="country"
            >
              {{ country.toUpperCase() }}
            </option>
          </select>
        </div>

        <div>
          <select
            @change="sendingEvents()"
            class="drop2"
            placeholder="Event"
            v-model="dropDownEvent"
          >
            <option disabe seleced="true"><h2>Event</h2></option>
            <option
              v-for="(event, index) in eventList"
              v-bind:key="index"
              v-bind:value="event"
            >
              {{ event.toUpperCase() }}
            </option>
          </select>
        </div>
      </div>

      <div class="lastFilter">
        <div>
          <select
            @change="sendingModalities()"
            class="drop3"
            placeholder="Modality"
            v-model="dropDownModality"
          >
            <option disabe seleced="true"><h2 >Modality</h2></option>
            <option
              v-for="(modality, index) in modalityList"
              v-bind:key="index"
              v-bind:value="modality"
            >
              {{ modality.toUpperCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Filters",
  props: ["eventList", "countryList", "modalityList"],
  data() {
    return {
      dropDownEvent: "Event",
      dropDownCountry: "Country",
      dropDownModality: "Modality"
    };
  },
  methods: {
    ...mapActions(["settingCountryCode", "fetchAllEvents"]),

    sendingCountries() {
      this.settingCountryCode(this.dropDownCountry);
    },

    sendingModalities() {
      this.$emit("receiveModalityList", this.dropDownModality);
    },

    sendingEvents() {
      this.$emit("receiveEventList", this.dropDownEvent);
    }
  },

  computed: { ...mapGetters(["getCountryCode"])
  },
  watch: {
    getCountryCode() {
      console.log(this.getCountryCode)
      this.fetchAllEvents();
    }
  }
};
</script>

<style>
.mainFilters {
  display: flex;
  flex-direction: row;
  width: 300px;
  align-content: space-around;
  justify-content: space-around;
}
.lastFilter {
  display: flex;
  flex-direction: row;
  width: 300px;
  align-content: space-around;
  justify-content: space-around;
}
.generalContainer {
  display: flex;
  flex-direction: column;
  height: 90px;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;
}
.drop1,.drop2,.drop3 {
  border: solid orange;
  /* color:orange; */
  border-radius: 10px;
  font-size: 1.2rem;
  font-family: cursive;
  font-weight: bold;
}
.drop1 {
width:4.8rem
}
.drop2{
width:12rem
}
.drop3 {
width:9rem
}

option,h2{
    color:orange;

}
@media screen and (orientation: landscape) and (min-device-width: 340px) {
    .mainFilters {
  display: flex;
  flex-direction: row;
  width: 300px;
  align-content: space-around;
  justify-content: space-around;
  margin-top:-170px;
  margin-left:205px
}
.lastFilter {
  position: absolute;
  margin-top:-85px;
  margin-left:325px;
  width: 300px;
  align-content: space-around;
  justify-content: space-around;
}
.generalContainer {
  display: flex;
  flex-direction: column;
  height: 90px;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;
}
.drop1,.drop2,.drop3 {
  border: solid orange;
  /* color:orange; */
  border-radius: 10px;
  font-size: 1.2rem;
  font-family: cursive;
  font-weight: bold;
}
.drop1 {
width:4.8rem
}
.drop2{
width:10rem
}
.drop3 {
width:7rem
}

option,h2{
    color:orange;

}
}
</style>

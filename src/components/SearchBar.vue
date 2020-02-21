<template>
  <v-container>
    <input class='input'
       
      placeholder="write words for search"
      type="text"
      v-model="sendingSelfSearch"
    />
  </v-container>
</template>
<script>
export default {
  name: "SearchBar",
//   data(){
//       return{
//            clientSearch:this.Search
//       }
//   },
  props: {
      SearchBar:Object,
      Search:String
  },
//   data() {
//     return {
//       SearchBar: ""
//     };
//   },
//   methods:{
//       sendingSelfSearch(){
//           this.$emit('receivingSelfSearch',this.Search)
//       }
//   },
  computed:{
     sendingSelfSearch:{
         get(){
             return this.Search
         },
         set(val){ this.$emit('receivingSelfSearch', val) }
     },
  }
};
</script>

<style>
.input{
    border: solid;
    color:orange;
    border-radius: 10px;
    font-family: cursive;
    font-weight: bold;
    font-size: 1.5rem
}
</style>

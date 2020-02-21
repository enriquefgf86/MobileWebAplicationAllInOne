<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12 sm12 lg6 xl6>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent='signUpUser' >
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name='name'
                                            label='name'
                                            id='name'
                                            v-model='name'
                                            type='name'
                                            required >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name='email'
                                            label='email'
                                            id='email'
                                            v-model='email'
                                            type='email'
                                            required >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name='password'
                                            label='password'
                                            id='password'
                                            v-model='password'
                                            type='password'
                                            required >
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name='confirmPassword'
                                            label='confirm password'
                                            id='confirmPassword'
                                            v-model='confirmPassword'
                                            type='password'
                                             v-bind:rules="[passwwordComparison]">
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs8>
                                            <v-btn type='submit' class='amber darken-3 white--text'   :disabled="!validator" >Sign Up</v-btn>
                                        </v-flex>
                                    </v-layout>
                                    
                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
name:'SignUpPage',
data(){
    return{
        name:'',
        password:'',
        email:'',
        confirmPassword:'',
    }
},
methods:{...mapActions(['signUserUp','creatingUserData']),
    signUpUser(){
          return this.$store.dispatch('signUserUp',{ email:this.email,password:this.password,name:this.name})
    },
    // getUserData(){
    //     var userDetails={
    //         name:this.name
    //     }
    //     return this.$store.dispatch('creatingUserData',{userDetails})
    // }
},
computed:{ ...mapGetters(['getUser']),
   passwwordComparison(){
       if(this.password!=this.confirmPassword){
           return 'These Passwords do not match'

       }
       else{
           return 'Perfect!!!' 
       }
   },
   validator() {
      return (
        this.name !== "" &&
        this.password!== "" &&
        this.confirmPassword !== "" &&
        this.email !== "")
   },    
   user(){
       return this.$store.getters.getUser
   }
},
watch:{
    user(value){
        if(value!==null &value!=undefined){
            this.$router.push('/')
        }
    }
}
}
</script>

<style>

</style>
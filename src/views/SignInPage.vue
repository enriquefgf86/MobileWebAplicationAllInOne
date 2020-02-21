<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12 sm12 lg6 xl6>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent='signUserIn'>
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
                                        <v-flex xs8>
                                            <v-btn type='submit' class='amber darken-3 white--text'   :disabled="!validator">Sign In</v-btn>
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
import {mapActions,mapGetters} from 'vuex'
export default {
name:'SignInPage',
data(){
    return{
        name:'',
        password:'',
        email:'',
    }
},
methods:{...mapActions(['signUserIn']),
    signUserIn(){
       return this.$store.dispatch('signUserIn',{email:this.email, password:this.password})
    }
},
computed:{ ...mapGetters(['getUser']),
 user(){
     return this.$store.getters.getUser
 },
 validator() {
      return (
        this.name !== "" &&
        this.password!== "" &&
        this.email !== "")
   },
},
watch:{
    user(value){
        if(value!=null&&value!=undefined){
            return this.$router.push('/')
        }
    }
}
}
</script>

<style>

</style>
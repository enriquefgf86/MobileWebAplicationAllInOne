<template>
  <div class='container'>
 <!--     <div>
          <v-form @submit.prevent='createMessage'>
              <div class='formGroup'>
                  <input type='text' name ='message' class='form' placeholder="enter message" v-model='newMessage'/>
              </div>
              <v-btn type='submit' name='action'>Send</v-btn> 
          </v-form>
      </div>-->
  </div>
</template>

 <script>

// import * as firebase from 'firebase';
// import 'firebase/firestore'
// export default {
// name:'CreateMessageComponent',
// props:['name'],
// data(){
//     return{
//         newMessage:''
//     }
// },
// methods:{
//      createMessage(){
//          if(this.newMessage){
//              firebase.firestore().collection('messages').add({
//                  message:this.newMessage,
//                  name:this.name,
//                  timestamp:Date.now()
//              })
//              .catch(err=>{
//                  console.log(err)
//              });
//              this.newMessage=null;
             
//          }
//          else{
//              return 'enter text'
//          }
//      }
// }
// }
</script>

 <style>

 </style>
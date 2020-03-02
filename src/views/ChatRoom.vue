<template>
  <v-container fluid fill-height>
        <img class="body" src="../assets/alli.jpg" />

    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card v-if="authUser" class="elevation-12" color="amber accent-2">
          <v-toolbar dark color="primary amber accent-4">
            <v-toolbar-title class="amber accent-4">Chatboard</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list ref="chat" id="logs" class='log1'>
              <template v-for="(v, k, index) in messageBox">
                <v-subheader v-if="v" :key="index">
                  <div class="containerMessdet">
                    <div class='messageSen'>{{getUser.name}}</div>
                    <div/>
                    <div class='messageRes'>{{ v.msg }}</div>
                  </div>
                </v-subheader>
              </template>

              <div class="containerMess"></div>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-form @submit.prevent="sendMsg">
              <v-text-field v-model="message" label="Message" single-line solo-inverted></v-text-field>

              <v-btn fab dark small color="deep-orange" type="submit" v-if='!message.length==0'>
                <v-icon dark>mdi-send</v-icon>
              </v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <h2>Real time Chat</h2>
  <v-card >
    <v-layout>
      <div class='messages' v-chat-scroll='{always:false,smooth:true}'>
      <div v-for='(message ) in messages'  :key='message.id'>
        <span class='text'>
          {{message.name}}
        </span>
        <span class='text'>
          {{message.message}}
        </span> 
        <span class='text'>
          {{message.timestamp}}
        </span> 
      </div>

      </div>
    </v-layout>
  </v-card>
  <v-card-actions>
    <CreateMessageComponent :name='name'/>
    </v-card-actions>-->
  </v-container>
</template>

<script>
import firebase from "../main";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ChatRoom",
  props: {
    msg: String
  },
  data() {
    return {
      message: "",
      messageBox: []
    };
  },
  methods: {
    ...mapActions(["signUserUp", "signUserUpIn"]),
    // scrollToEnd(){
    //      let containerX=document.querySelector("log1");
    //      let scrollHeight=containerX.scrollHeight;
    //      containerX.scrollTop=scrollHeight;
    // },
    sendMsg() {
      // console.log(firebase);
      firebase
        .database()
        .ref()
        .child("/chats/")
        .push({ user: this.authUser, msg: this.message });
      // this.message = "";
    },
    getMsg() {
      firebase
        .database()
        .ref("/chats/")
        .on("value", snapshot => {
          // console.log(snapshot.val());
          this.messageBox = snapshot.val();
        });
    }
  },
  computed: {
    ...mapGetters(["getUser"]),

    authUser() {
      // console.log(this.getUser);
      return this.getUser;
    }
  },
  watch: {
    messageBox() {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    },
    authUser(value) {
      if (value != null || value != undefined) {
        this.sendMsg();
      }
    }
  },
  created() {
    this.getMsg();
  },
  // mounted(){
  //   this.scrollToEnd();
  // },
  // updated(){
  //   this.scrollToEnd();
  // }
};
// import CreateMessageComponent from '../components/CreateMessageComponent.vue';
// import {mapGetters} from 'vuex';
// import * as firebase from 'firebase';
// import 'firebase/firestore'
// import moment from 'moment';
// export default{
//   name:'ChatRoom',
//   props:['name'],
//   components:{
//     CreateMessageComponent
//   },
//   computed: {
//     ...mapGetters(["getUser"]),
//     // authUser() {
//     //   return this.$store.getters.getUser;
//     // }
//   },
//   data(){
//     return{
//       messages:[],
//     }
//   },
//   created(){
//     let ref=firebase
//     .firestore()
//     .collection('messages')
//     .orderBy('timestamp');

//     ref.onSnapshot(snapshot =>{
//       snapshot.docChanges().forEach(change=>{
//         if(change.type=='added'){
//            let doc=change.doc;
//           this.messages.push({
//             id:doc.id,
//             name:doc.data().displayName,
//             message:doc.data().message,
//             timestamp:moment(doc.data().timestamp).format('LTS')
//           })
//         }
//       })
//     })
//   }

// };
</script>


<style>
#logs {
  height: 200px;
  overflow: auto;
}
.containerMessdet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;

}
.messageRes{
  /* position:relative;
  margin-top:18px;
  margin-left:150px; */
color:white;
width: 200px;
  word-break: break-word;
  font-weight: bold;
  padding-top:20px;
  background-color: rgba(265,165,0, 0.9);
  border-radius:10px;
  text-align: center
   } 
.messageSen{
 color:white; 
 background-color: rgba(265,165,0, 0.9);
  border-radius:10px;
  text-align: center;
  padding-right:10px;
  padding-left:5px;

}
.body {
  position: absolute;
  height: 100%;
  width: 110%;
  opacity: 0.3;
  top:50px
    /* z-index: -2; */
}
</style>

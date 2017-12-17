<template>
  <div class="livechat">
    LIVECHAT
    <input type="text" v-model="msg" @keyup.enter="submitMsg" />
    <div>
      <div v-for="list_elem in list">
        {{list_elem}}
      </div>
    </div>
  </div>
</template>

<script>
  // import VueFire from 'vuefire'
  import firebase from 'firebase'

  var firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDXm16fJWrXyMN6Em0G-vapleYwzx3bgS0',
    authDomain: 'livechat-494cd.firebaseapp.com',
    databaseURL: 'https://livechat-494cd.firebaseio.com',
    projectId: 'livechat-494cd',
    storageBucket: 'livechat-494cd.appspot.com',
    messagingSenderId: '217103570681'
  })
  var db = firebaseApp.database()

  export default {
    name: 'Livechat',
    data () {
      return {
        msg: '',
        list: []
      }
    },
    methods: {
      receiveMsg: function () {
        var thisApp = this
        var commentsRef
        commentsRef = db.ref('msg').limitToLast(1)

        commentsRef.on('child_added', function (data) {
          thisApp.list.push(data.val().content)
        })
      },
      initMsg: function () {
        var thisApp = this
        db.ref('msg').once('value', function (list) {
          list.forEach(function (msg) {
            thisApp.list.push(msg.val().content)
          })
        })
        thisApp.list.pop()
        this.receiveMsg()
      },
      submitMsg: function () {
        var thisApp = this

        /* firebase.database().ref('msg/1').set({
          content: 'Hello World'
        });
        firebase.database().ref('/msg/1').once('value').then(function (content) {
          console.log(content.val().content);
        }); */

        var postListRef = db.ref('msg')
        var newPostRef = postListRef.push()
        newPostRef.set({
          content: thisApp.msg
        })
        thisApp.msg = ''
      }
    },
    created: function () {
      this.initMsg()
    }
  }
</script>

<style>

</style>

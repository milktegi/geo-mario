 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 

  // Initialize Firebase
  
var config = {
    
    apiKey: "AIzaSyDrXSOUgCvX1XPiARFIIjU7wQV6so-bht8",
    authDomain: "geo-mario.firebaseapp.com",
    databaseURL: "https://geo-mario.firebaseio.com",
    projectId: "geo-mario",
    storageBucket: "geo-mario.appspot.com",
    messagingSenderId: "135621376194"

};

const firebaseApp =  firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots : true })
export default firebaseApp.firestore()
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';
// You don't need to import firebase/app either since it's being imported above
import 'firebase/auth';
import 'firebase/firestore';

Vue.config.productionTip = false

// wait for firebase auth to init
// before creating the app

let app = null;

firebase.auth().onAuthStateChanged(() => {

  // init app if not already created 
  if(!app) {
    /* eslint-disable no-new */
  app = new Vue({
    
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  
        })
    }
})



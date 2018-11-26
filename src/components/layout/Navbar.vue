<template>
	
<div class="navbar">
<nav class="indigo darken-1">
	<div class="container">
		<router-link :to="{ name: 'GMap'}"
		class="brand-logo left">geo-marios</router-link>
		<ul class="right">
			<li v-if="!user"><router-link :to="{ name: 'Signup'}">회원가입</router-link></li>
			<li v-if="!user"><router-link :to="{ name: 'Login'}">로그인</router-link></li>
			<li v-if="user">{{user.email}}</li>
			<li v-if="user"><a @click="logout">로그아웃</a></li>

		</ul>
	</div>
</nav>
</div>

</template>

<script>
import * as firebase from 'firebase/app';

export default {
	name: 'Navbar',
	data() {
		return {
			user: null
		}
	},
	methods: {
		logout() {
			// since we using firebase, 
			firebase.auth().signOut()
					.then(() => {
			this.$router.push({ name: 'Login'})		
			})
		}
	},
  created() {

// let user = firebase.auth().currentUser 가 아니고 
	firebase.auth().onAuthStateChanged(user => {
		if(user) this.user = user;
		else this.user = null;
	  }) 
	}

}
</script>

<style>
.navbar nav {
    padding: 0 30px
}

</style>

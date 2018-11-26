<template>
	
<div class="navbar">
<nav class="indigo darken-1">
	<div class="container">
		<router-link :to="{ name: 'GMap'}">geo-marios</router-link>
		<ul class="right">
			<li><router-link :to="{ name: 'Signup'}">회원가입</router-link></li>
			<li><router-link :to="{ name: 'Login'}">로그인</router-link></li>
			<li><a @click="logout">로그아웃</a></li>
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

		}
	},
	methods: {
		logout() {
			// since we using firebase, 
			firebase.auth().signOut()
					.then(() => {
			this.$router.push({ name: 'Signup'})		
					})
		}
	}

}
</script>

<style>
.navbar nav {
    padding: 0 30px
}

</style>

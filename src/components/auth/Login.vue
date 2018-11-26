<template>
	
<div class="login container">
	<form @submit.prevent="login" class="card-panel">
	<h2 class="center deep-blue-text">로그인</h2>

	<div class="field">
	  <label for="email">이메일: </label>
	  <input v-model="email" type="text" name="email">
	</div>
	<div class="field">
	 <label for="password">비밀번호: </label>
	 <input v-model="password" type="password" name="password">
   </div>
<p v-if="feedback" class="red-text center">{{ feedback }}></p>
<div class="field">
	<button class="btn deep-purple lighten-1">로그인</button>
</div>

   </form>
</div>


</template>

<script>

import * as firebase from 'firebase/app';

export default {
	name: 'Login',
	data() {
		return {
			email: null,
			password: null,
			feedback: null
		}
	},
	methods: {
		// login the user
		login() {
			// null check 
			if(this.email && this.password) {
				firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then((cred) => {
					console.log(cred.user)
					this.$router.push({ name: 'GMap'})
				})
				.catch(err => {
					this.feedback = err.message
				})
				this.feedback = null
			} else {
				this.feedback = '유효하지 않은 입력값입니다.😕'
			}
		}
	}
	
}
</script>

<style>

.login{

	max-width: 400px;
	margin-top: 60px;

}
.login h2{
	font-size: 2.3em;
}

.login .field {
	margin-bottom: 16px;
}


</style>

<template>

<div class="signup container">
  <form @submit.prevent="signup" class="card-panel">
	<h2 class="deep-purple-text">회원가입</h2>		
		<div class="field">
			<label for="email">이메일: </label>
			<input v-model="email" type="text" name="email">
		</div>
		<div class="field">
			<label for="passowrd">비밀번호: </label>
			<input v-model="passowrd" type="password" name="passowrd">
		</div>
		<div class="field">
			<label for="alias">닉네임: </label>
			<input v-model="alias" type="text" name="alias">
		</div>
  </form>
  <!-- button -->
  <div class="field center">
	  <button class="btn deep-purple">제출</button>
  </div>
</div>


</template>

<script>
export default {
	name: 'Signup',
	data() {
		return {
			email: null,
			password: null,
			alias: null
		}
	},
	methods: {
		signup() {
			// interact with firebase 
		}
	}
}
</script>

<style>

.signup {
	max-width: 400px;
	margin-top: 60px;
}
.signup h2{
	font-size: 2.4em;
}
.signup .field{
	margin-bottom: 16px;
}

</style>

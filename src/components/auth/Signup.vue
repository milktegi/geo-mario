<template>

<div class="signup container">
  <form @submit.prevent="signup" class="card-panel">
	<h2 class="deep-purple-text">회원가입</h2>		
		<div class="field">
			<label for="email">이메일: </label>
			<input v-model="email" type="text" name="email">
		</div>
		<div class="field">
			<label for="password">비밀번호: </label>
			<input v-model="password" type="password" name="password">
		</div>
		<div class="field">
			<label for="alias">닉네임: </label>
			<input v-model="alias" type="text" name="alias">
		</div>
		<p class="red-text center" v-if="feedback">{{ feedback }}</p>

  <!-- button -->
  <div class="field center">
	  <button class="btn deep-purple">제출</button>
  </div>
    </form>
</div>


</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      // interact with firebase
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection("users").doc(this.slug)
        console.log(this.slug);
        ref.get().then(doc => {
    if (doc.exists) {
            this.feedback = "이미 사용중인 닉네입입니다."
	} else {
    firebase.auth()
			.createUserWithEmailAndPassword(this.email, this.password)
      .then(cred => {
        ref.set({
          alias: this.alias,
          geolocation: null,
          user_id: cred.user.uid
        })  
      })
      .then(() => {
        this.$router.push({ name: 'GMap'})
      })
			.catch(err => {
				console.log(err)
				  this.feedback = err.message
			  })
        this.feeback = "사용가능한 닉네입입니다."
      }
  });
      } else {
        this.feedback = "닉네임을 바르게 입력해주세요."
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.3em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>

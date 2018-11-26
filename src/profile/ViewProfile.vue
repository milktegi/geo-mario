<template>
	<div class="view-profile container">
		<div v-if="profile" class="card">
			<h2 class="deep-purple-text center">{{ profile.alias }}'s wall</h2>
		<ul class="comments collection">
			<li v-for="(comment, index) in comments" :key="index"> 
		<div class="deep-purple-text">
			{{ comment.from }}
	    <div class="grey-text text-darken-2"> 
			{{ comment.content }}
		</div>
		</div>
			</li>
		</ul>
		<form @submit.prevent="addComment">
			<div class="field">
				<label for="comment">Add a comment:</label>
				<input type="text" name="newComment" v-model="newComment">
				<p v-if="feedback" class="red-text center">{{feedback}}</p>
			</div>
		</form>
		</div>
	</div>
</template>

<script>

import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	name: 'ViewProfile',
	data() {
		return {
			user: null,
			profile: null,
			newComment: null,
			feedback: null,
			comments: []
		}	
	},
	
	methods: {
		addComment() {
			if(this.newComment) {
				this.feedback = null
				db.collection('comments').add({
					to: this.$route.params.id,
					from: this.user.id,
					content: this.newComment,
					time: Date.now(),
					comments: []

				}).then(() => {
					this.newComment = null;
				})
			} else {
				this.feedback = '댓글을 바르게 입력해주세요'
			}
		}
	},
	created() {
		let ref = db.collection('users') 
	
	// get current user 
		ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
		   .then(snapshot => {
           snapshot.forEach(doc => {
			   this.user = doc.data(),
			   this.user.id = doc.id
			   })
		})

	// profile data
		ref.doc(this.$route.params.id).get()
		   .then(user => {
			this.profile = user.data()
		})

// comments (real-time onsnapshot)
	db.collection('comments')
	  .where('to', '==', this.$route.params.id)
	  .onSnapshot((snapshot) => {
		  snapshot.docChanges().forEach(change => {
			  if(change.type === 'added') {
			  this.comments.unshift({
                from: change.doc.data().from,
				content: change.doc.data().content
			})
	 	  }
       })
    })	
  }
}
</script>


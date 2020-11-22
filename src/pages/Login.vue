<template>
  <q-page class="flex flex-center">
    <div>
      <q-card class="q-pa-lg q-ma-md modal-site" style="width: 300px">
        <q-toolbar class="text-white q-mb-lg q-mb-lg"></q-toolbar>
        <form action="#" @submit.prevent="submit">
          <q-input
            :rules="[val => !!val || 'Campo nome obbligatorio']"
            v-model="form.email"
            label="Email"
          >
            <template v-slot:prepend>
              <q-icon color="accent" name="email" />
            </template>
          </q-input>
          <q-input
            :rules="[val => !!val || 'Campo nome obbligatorio']"
            v-model="form.password"
            label="Password"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon color="accent" name="lock" />
            </template>
          </q-input>
          <q-btn class="q-mt-xl full-width" type="submit" color="info">Login</q-btn>
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";

export default {
	data() {
		return {
			form: {
				email: "",
				password: ""
			},
			error: null
		};
	},
	methods: {
		submit() {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.form.email, this.form.password)
				.then(data => {
					this.$store.dispatch("fetchUser", data);

					this.$router.push("/");
				})
				.catch(err => {
					this.error = err.message;
					console.log(this.error);
				});
		}
	}
};
</script>

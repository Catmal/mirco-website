<template>
  <q-page class="flex flex-center bg-primary q-pa-md">
    <div v-if="sending" class="text-center">
      <h2>Invio in corso</h2>
      <q-spinner-bars color="primary" size="2em" />
    </div>
    <div class="q-pb-xl">
      <transition name="title-fade">
        <h1 v-if="showTitle && !submitted && !sending" class="text-dark text-center">
          <q-icon size="82px" name="contacts" color="dark" />Contact
        </h1>
      </transition>
      <transition name="title-fade" v-if="!submitted && !sending">
        <q-form v-if="showTitle && !submitted && !sending">
          <q-input
            rounded
            filled
            class="text-h4 text-weight-thin text-white"
            borderless
            v-model="newMessage.email"
            hint="Email"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="dark" size="md" />
            </template>
          </q-input>
          <q-input
            rounded
            filled
            size="xl"
            class="text-p text-weight-thin text-white q-mt-lg"
            color="white"
            borderless
            v-model="newMessage.content"
            type="textarea"
            hint="Message"
            input-style="line-height: 42px;"
            name="message"
          >
            <template v-slot:prepend>
              <q-icon color="dark" name="message" size="md" />
            </template>
          </q-input>
          <q-btn @click="addMessage()" color="dark" class="full-width q-mt-md" icon="send" />
        </q-form>
      </transition>
      <div v-if="submitted">
        <q-card class="text-center bg-dark q-pa-lg q-my-lg text-white rounded-borders">
          <h3 class="text-white">Message Sent</h3>

          <q-icon color="white" class="q-my-lg" name="check_circle_outline" size="80px" />
        </q-card>
        <p class="text-center text-dark">Thanks for your message. I will reply you soon.</p>
      </div>
    </div>
    <Menu />
  </q-page>
</template>

<script>
import { db } from "boot/firebase";
import axios from "axios";
export default {
	name: "PageIndex",
	data() {
		return {
			showTitle: false,
			email: "",
			message: "",
			isShowing: false,
			newMessage: {},
			sending: false,
			submitted: false
		};
	},
	components: {
		Menu: () => import("../components/Menu")
	},
	mounted() {
		this.isShowing = true;
		this.showTitle = true;
	},
	methods: {
		sendEmail() {
			this.$axios.post(
				" https://us-central1-mirco-website.cloudfunctions.net/sendMail ",
				this.newMessage
			);
		},
		addMessage() {
			this.sending = true;
			let newMessageRef = db.collection("messages").doc();
			newMessageRef
				.set({
					id: newMessageRef.id,
					email: this.newMessage.email,
					content: this.newMessage.content
				})
				.then(ref => {
					this.sending = false;
					this.submitted = true;
					this.sendEmail();
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
  color: "#fff!important";
}

.title-fade-enter-active {
  transition: all 1.2s ease;
}

.title-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(150px);
  opacity: 0;
  transition: all 1s ease;
}
.websites-fade-enter-active {
  transition: all 1s ease;
}
.websites-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 2);
}
.websites-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
</style>

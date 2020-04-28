<template>
  <div>
    <div id="page-header">
      <h1>Edit Profile</h1>
    </div>
    <b-form @submit.prevent>
      <b-form-group
        label="Intro Line 1:"
        label-for="introline1"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="introline1"
          v-model="profile.introLine1"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Intro Line 2:"
        label-for="introline2"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="introline2"
          v-model="profile.introLine2"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Bio:"
        label-for="bio"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-textarea
          id="bio"
          v-model="profile.bio"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Github url:"
        label-for="githuburl"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="githuburl"
          v-model="profile.githubUrl"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="LinkedIn url:"
        label-for="linkedinurl"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="linkedinurl"
          v-model="profile.linkedInUrl"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        pill
        variant="primary"
        @click="saveData">Save
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";

export default {
  props: {
    id: {
      type: String
    }
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("profile/fetchProfile", process.env.VUE_APP_PROFILE_NAME);
    next();
  },
  methods: {
    async saveData() {
      await store.dispatch("profile/saveProfile", this.profile);
      this.$router.push({ name: "profile" });
    }
  },
  computed: mapState({
    profile: state => state.profile.profile
  })
};
</script>

<style scoped>
#page-header {
  overflow: hidden;
  margin: 20px 0;
}
#page-header h1 {
  float: left;
  margin: 0;
}
#page-header span {
  float: right;
}
</style>

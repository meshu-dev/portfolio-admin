<template>
  <div>
    <div id="page-header">
      <h1>Edit Profile</h1>
      <span class="button" @click="saveData">Save</span>
    </div>
    <form @submit.prevent>
      <FormTextField
        type="text"
        v-model="profile.jobTitle"
        label="Job title"
        placeholder="Job title"
        class="field"
      />
      <FormTextArea
        v-model="profile.bio"
        label="Bio"
        placeholder="Bio"
        class="field"
      />
      <FormTextField
        type="text"
        v-model="profile.githubUrl"
        label="Github url"
        placeholder="Github url"
        class="field"
      />
      <FormTextField
        type="text"
        v-model="profile.linkedInUrl"
        label="LinkedIn url"
        placeholder="LinkedIn url"
        class="field"
      />
      <FormTextField
        type="text"
        v-model="profile.email"
        label="E-mail"
        placeholder="E-mail"
        class="field"
      />
      <FormTextField
        type="text"
        v-model="profile.cvUrl"
        label="CV url"
        placeholder="CV url"
        class="field"
      />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";
import FormTextField from "@/components/FormTextField.vue";
import FormTextArea from "@/components/FormTextArea.vue";

export default {
  components: {
    FormTextField: FormTextField,
    FormTextArea: FormTextArea
  },
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

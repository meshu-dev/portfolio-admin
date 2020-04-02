<template>
  <div>
    <div id="page-header">
      <h1>Profile</h1>
      <router-link :to="{ name: 'profile-edit' }">
        <b-button
          pill
          variant="primary">Edit
        </b-button>
      </router-link>
    </div>
    <dl>
      <dt>Job Title</dt>
      <dd>{{ profile.jobTitle }}</dd>
      <dt>Bio</dt>
      <dd>{{ profile.bio }}</dd>
      <dt>E-mail</dt>
      <dd>
        <a :href="profile.email">{{ profile.email }}</a>
      </dd>
      <dt>Github Url</dt>
      <dd>
        <a :href="profile.githubUrl">{{ profile.githubUrl }}</a>
      </dd>
      <dt>LinkedIn Url</dt>
      <dd>
        <a :href="profile.linkedInUrl">{{ profile.linkedInUrl }}</a>
      </dd>
      <dt>CV Url</dt>
      <dd>
        <a :href="profile.cvUrl">{{ profile.cvUrl }}</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";
  
export default {
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("profile/fetchProfile", process.env.VUE_APP_PROFILE_NAME);
    next();
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
#page-header a {
  float: right;
}
dl {
  font-size: 120%;
}
dt {
  font-weight: bold;
}
dd {
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <div id="page-header">
      <h1>Project</h1>
      <router-link
        :to="{ name: 'project-form', params: { id: project.id } }">
        <b-button
          pill
          variant="primary">Edit
        </b-button>
      </router-link>
    </div>
    <dl>
      <dt>Title</dt>
      <dd>{{ project.title }}</dd>
      <dt>Description</dt>
      <dd>{{ project.description }}</dd>
      <dt>GitHub repository link</dt>
      <dd>
        <template v-if="project.githubUrl">
          <a :href="project.githubUrl" target="_blank">{{ project.githubUrl }}</a>
        </template>
        <template v-else>
          None
        </template>
      </dd>
      <dt>Image</dt>
      <dd>
        <img :src="project.images[0] ? project.images[0]['imageUrl'] : ''" />
      </dd>
    </dl>
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
    await store.dispatch("project/fetchProject", to.params.id);
    next();
  },
  computed: mapState({
    project: state => state.project.project
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

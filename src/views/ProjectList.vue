<template>
  <div>
    <div id="page-header">
      <h1>Projects</h1>
      <router-link
        class="button" :to="{ name: 'project-form' }">
        New
      </router-link>
    </div>
    <ProjectRow v-for="project in project.projects" :key="project.id" :project="project" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'project-list', params: { page: parseInt(page) - 1 } }" rel="prev">Prev Page</router-link>
      <template v-if="hasNextPage">
        &nbsp;|&nbsp;
      </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'project-list', params: { page: parseInt(page) + 1 } }"
      rel="next">
      Next Page
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";
import ProjectRow from "@/components/ProjectRow.vue";

let getProjects = async (to, next) => {
  let currentPage = to.params.page || 1;

  await store.dispatch("project/fetchProjects", {
    page: currentPage
  });
  next();
};

export default {
  props: {
    page: {
      default: 1
    }
  },
  components: {
    ProjectRow
  },
  async beforeRouteEnter(to, from, next) {
    getProjects(to, next);
  },
  async beforeRouteUpdate(to, from, next) {
    getProjects(to, next);
  },
  computed: {
    hasNextPage() {
      return this.project.totalProjects > this.page * this.project.pageLimit;
    },
    ...mapState(["project"])
  }
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
</style>

<template>
  <div>
    <div id="page-header">
      <h1 v-if="project._id">Edit Project</h1>
      <h1 v-else>New Project</h1>
      <span class="button" @click="showDeletePopUp = true" v-show="project.id">
        Delete
      </span>
      <span class="button" @click="saveData">Save</span>
    </div>
    <b-form @submit.prevent>
      <b-form-group
        label="Title:"
        label-for="title"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="title"
          v-model="project.email"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Description:"
        label-for="description"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-textarea
          id="description"
          v-model="project.description"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Image:"
        label-for="image"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-file
          id="image"
          v-model="project.file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
    </b-form>
    <PopUp v-show="showDeletePopUp">
      <template v-slot:message>
        Are you sure you want to delete project {{ project.id }}?
      </template>
      <template v-slot:buttons>
        <button class="button" @click="deleteData">Yes</button>
        <button class="button" @click="showDeletePopUp = false">No</button>
      </template>
    </PopUp>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";
import PopUp from "@/components/PopUp.vue";

export default {
  components: {
    PopUp: PopUp
  },
  data() {
    return {
      showDeletePopUp: false
    }
  },
  props: {
    id: {
      type: String
    }
  },
  async beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      await store.dispatch("project/fetchProject", to.params.id);
    } else {
      await store.dispatch("project/clearProject");
    }
    next();
  },
  methods: {
    async saveData() {
      if (this.project.id) {
        await store.dispatch("project/editProject", this.project);
      } else {
        await store.dispatch("project/addProject", this.project);
      }
      this.$router.push({ name: "project-list" });
    },
    async deleteData() {
      await store.dispatch("project/deleteProject", this.project.id);
      this.$router.push({ name: "project-list" });
    }
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
#page-header span {
  float: right;
}
</style>

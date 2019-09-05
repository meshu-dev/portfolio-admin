<template>
  <div>
    <div id="page-header">
      <h1 v-if="project._id">Edit Project</h1>
      <h1 v-else>New Project</h1>
      <span class="button" @click="showDeletePopUp = true" v-show="project._id">Delete</span>
      <span class="button" @click="saveData">Save</span>
    </div>
    <form @submit.prevent>
      <FormTextField
        type="text"
        v-model="project.title"
        label="Title"
        placeholder="Title"
        class="field"
      />
      <FormTextArea
        v-model="project.description"
        label="Description"
        placeholder="Description"
        class="field"
      />
      <FormTextField
        type="text"
        v-model="project.url"
        label="Url"
        placeholder="Url"
        class="field"
      />
      <FormTextField
        type="text"
        v-model="project.thumbUrl"
        label="Thumb Url"
        placeholder="Thumb Url"
        class="field"
      />
      <PopUp v-show="showDeletePopUp">
        <template v-slot:message>
          Are you sure you want to delete project {{ project._id }}?
        </template>
        <template v-slot:buttons>
          <button class="button" @click="deleteData">Yes</button>
          <button class="button" @click="showDeletePopUp = false">No</button>
        </template>
      </PopUp>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";
import FormTextField from "@/components/FormTextField.vue";
import FormTextArea from "@/components/FormTextArea.vue";
import PopUp from "@/components/PopUp.vue";
  
export default {
  components: {
    FormTextField: FormTextField,
    FormTextArea: FormTextArea,
    PopUp: PopUp
  },
  data() {
    return {
      showDeletePopUp: false
    };
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
      if (this.project._id) {
        await store.dispatch("project/editProject", this.project);
      } else {
        await store.dispatch("project/addProject", this.project);
      }
      this.$router.push({ name: "project-list" });
    },
    async deleteData() {
      await store.dispatch("project/deleteProject", this.project._id);
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

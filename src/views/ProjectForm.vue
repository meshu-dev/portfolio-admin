<template>
  <div>
    <div id="page-header">
      <h1 v-if="project.id">Edit Project</h1>
      <h1 v-else>New Project</h1>
      <b-button
        pill
        variant="primary"
        @click="showDeletePopUp = !showDeletePopUp"
        v-show="project.id">Delete
      </b-button>
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
          v-model="project.title"
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
        label="GitHub repository link:"
        label-for="github"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          v-model="project.githubUrl"
          type="url"
          pattern="https://.*"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Image:"
        label-for="image"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-file
          id="image"
          v-model="image.image"
          v-show="!project.id || changeImage"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <template v-if="project.id && !changeImage">
          <div id="project-thumb">
            <img :src="project.images[0] ? project.images[0]['thumbUrl'] : ''" />
            <b-button
              pill
              variant="primary"
              @click="changeImage = true">Change Image
            </b-button>
          </div>
        </template>
      </b-form-group>
      <b-form-group
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-button
          id="save-button"
          pill
          variant="primary"
          @click="project.id ? editData() : addData()"
          v-bind:disabled="isSaving === true">
          <template v-if="isSaving === true">
            <b-spinner large></b-spinner>
            <span id="loading-text">Loading...</span>
          </template>
          <template v-else>
            Save
          </template>
        </b-button>
      </b-form-group>
    </b-form>
    <b-modal v-model="showDeletePopUp">
      <template v-slot:modal-title>
        Confirm Delete
      </template>
      Are you sure you want to delete project {{ project.id }}?
      <template v-slot:modal-footer>
        <div class="container w-100 d-flex justify-content-center mb-3">
          <b-button
            variant="primary"
            @click="deleteData"
          >
            Delete
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";

export default {
  data() {
    return {
      isSaving: false,
      changeImage: false,
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
    createImageData() {
      return [{
        imageKey: this.image.imageKey,
        thumbKey: this.image.thumbKey,
        imageUrl: this.image.imageUrl,
        thumbUrl: this.image.thumbUrl
      }];
    },
    async uploadImage() {
      let formData = new FormData();
      formData.append('image', this.image.image);

      await store.dispatch("image/addImage", formData);
    },
    async addData() {
      this.isSaving = true;

      await this.uploadImage();

      this.project.images = this.createImageData();
      await store.dispatch("project/addProject", this.project);

      this.isSaving = false;

      this.$router.push({ name: "project-list" });
    },
    async editData() {
      this.isSaving = true;

      if (this.changeImage === true) {
        await this.uploadImage();
        this.project.images = this.createImageData();
      }

      await store.dispatch("project/editProject", this.project);

      this.isSaving = false;

      this.$router.push({ name: "project-list" });
    },
    async deleteData() {
      await store.dispatch(
        "image/deleteImage",
        {
          imageKey: this.project.images[0]['imageKey'],
          thumbKey: this.project.images[0]['thumbKey']
        }
      );
      await store.dispatch("project/deleteProject", this.project.id);
      
      this.$router.push({ name: "project-list" });
    }
  },
  computed: mapState({
    project: state => state.project.project,
    image: state => state.image.image
  })
};
</script>

<style scoped>
  #page-header {
    justify-content: space-between;
    display: flex;
    margin: 20px 0;
  }
  #page-header h1 {
    float: left;
    margin: 0;
  }
  #page-header span {
    float: right;
  }
  #project-thumb {
    display: flex;
    justify-content: flex-start;
  }
  #project-thumb img {
    margin-right: 1rem;
  }
  #save-button {
    display: flex;
  }
  #loading-text {
    margin: .3rem 0 0 .3rem;
  }
</style>

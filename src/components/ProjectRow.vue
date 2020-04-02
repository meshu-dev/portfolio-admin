<template>
  <router-link
    class="project-link"
    :to="{ name: 'project-view', params: { id: project.id } }">
      <b-card
        :img-src="project.images[0] ? project.images[0]['thumbUrl'] : blankImgUrl"
        img-alt="Card image"
        img-left
        class="mb-3"
      >
        <b-card-text>
          <h2>{{ project.title }}</h2>
        </b-card-text>
      </b-card>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      blankImgUrl: 'https://i0.wp.com/www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image.jpg?ssl=1'
    }
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
  .project-link img {
    width: 250px;
    height: 150px;
  }
.project-row {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 20px;
  margin-bottom: 40px;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>

<template>
  <router-link
    class="project-link"
    :to="{ name: 'project-view', params: { id: project.id } }">
    <div class="project-row">
      <h2>{{ project.title }}</h2>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
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

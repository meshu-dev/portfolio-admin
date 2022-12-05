<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import ItemProjectForm from '@/components/Item/ItemForm/ItemProjectForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();

  const onAdd = async (name) => {
    await projectStore.addProject(
      { name: name }
    );
    await onSuccess('Project has been added');
  }

  const onEdit = async (name) => {
    await projectStore.editProject(
      id,
      { name: name }
    );
    await onSuccess('Project has been edited');
  }

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  const onSuccess = async (msg) => {
    setStatusMsg('success', msg);
    await navigateTo('/projects');
  }

  const onDelete = async () => {
    await projectStore.deleteProject(id);
    await onSuccess('Project has been deleted');
  }

  fetchProjects(id);
</script>

<template>
  <ItemProjectForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit project' : 'Add project'"
    :item="projectStore.getProject"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>

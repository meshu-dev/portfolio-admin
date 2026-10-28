<script setup lang="ts">
import { onUnmounted, ref, type Ref } from 'vue'
import type { Errors } from '@inertiajs/core'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import Label from '@/components/ui/label/Label.vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const addDialogOpen = defineModel()
const name: Ref<string> = ref('')
const errors: Ref<Errors|null> = ref(null)

const create = () => {
  router.post(`/technologies`, { name: name.value })
}

onUnmounted(
  router.on('error', (event) => {
    errors.value = event.detail.errors
  })
)
</script>

<template>
  <Dialog v-model:open="addDialogOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add a technology</DialogTitle>
      </DialogHeader>
      <Form method="post" class="grid gap-4" @success="addDialogOpen = false">
        <div class="grid gap-1.5">
          <Label for="newTechnology" class="text-[0.8125rem] font-semibold">Name</Label>
          <Input id="newTechnology" name="name" :class="errors?.name ? `error-field` : ``" />
          <ErrorMessage v-if="errors?.name" :value="errors?.name" />
        </div>
        <div>
          <Button class="cursor-pointer" @click="create">Add technology</Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>
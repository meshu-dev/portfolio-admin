<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Button from '@/components/ui/button/Button.vue';

defineProps({ title: String, message: String });

const deleteDialogOpen = defineModel<boolean>();

const emit = defineEmits(['confirmDelete']);
</script>

<template>
    <Dialog v-model:open="deleteDialogOpen">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription>{{ message }}</DialogDescription>
            </DialogHeader>
            <DialogFooter class="gap-2">
                <Button variant="ghost" class="cursor-pointer" @click="deleteDialogOpen = false">Cancel</Button>
                <Button variant="destructive" class="cursor-pointer" @click="emit('confirmDelete')">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

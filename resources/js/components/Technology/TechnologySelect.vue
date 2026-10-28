<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps({ technologies: Object })
const selectedTechnologies = defineModel()
</script>

<template>
    <Select name="technologies" multiple v-model:modelValue="selectedTechnologies">
        <SelectTrigger class="w-full">
            <SelectValue placeholder="Choose technologies" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem  v-for="technology in technologies" :value="technology.id" selected>
                {{ technology.name }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>

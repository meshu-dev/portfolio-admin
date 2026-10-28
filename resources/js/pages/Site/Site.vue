<script setup lang="ts">
import type { FormDataConvertible } from '@inertiajs/core';
import { useForm } from '@inertiajs/vue3';
import { Form } from '@inertiajs/vue3';
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import FormField from '@/components/FormField.vue';
import FormPanel from '@/components/FormPanel.vue';
import { LinkButton } from '@/components/LinkButton';
import PageHeader from '@/components/PageHeader.vue';
import type { Site, Type } from '@/types/portfolio';
import { Checkbox } from '@/components/ui/checkbox';
import ErrorMessage from '@/components/ErrorMessage.vue';

const props = defineProps({ site: Object, types: Array<Type>, errors: Object });
const site: Site | null = props?.site?.data ? (props.site.data as Site) : null;

const formUrl: string = site ? `/sites/${site.id}` : '/sites';
const formMethod: string = site ? 'put' : 'post';

type FormType = { [key: number]: boolean };
type IconType = { [key: string]: string };

const formTypes: FormType = {};
const formIcons: IconType = {};

props?.types?.forEach((type: Type) => {
    const siteType: Type | undefined = site?.types.find((siteType: Type) => siteType.id == type.id);
    formTypes[type.id] = siteType ? true : false;
    formIcons[type.key] = site?.icons && site?.icons[type.key] ? site?.icons[type.key] : '';
});

const form = useForm({
    name: site?.name,
    url: site?.url,
    icons: formIcons,
    types: formTypes,
});

const transformData = (data: Record<string, FormDataConvertible>) => {
    // console.log('FORM!', toRaw(form.icons), data, { ...data, icons: toRaw(form.icons) })

    if (!props.types) {
        return { ...data };
    }

    const typeIds: number[] = [];

    for (const type of props.types) {
        if (form.types[type.id]) {
            typeIds.push(type.id);
        }
    }

    data.types = typeIds;

    return { ...data, icons: form.icons };
};
</script>

<template>
    <PageHeader :value="site?.name || 'Add a site'" description="Sites" />
    <FormPanel>
        <Form :action="formUrl" :method="formMethod" :transform="transformData" class="grid gap-5">
            <div class="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" for="name" :error="errors?.name" hint="For example, GitHub.">
                    <Input id="name" type="text" name="name" :class="errors?.name && 'error-field'" v-model="form.name" autoComplete="off" />
                </FormField>
                <FormField label="Profile URL" for="url" :error="errors?.url">
                    <Input
                        id="url"
                        type="url"
                        name="url"
                        :class="errors?.url && 'error-field'"
                        v-model="form.url"
                        autoComplete="off"
                        placeholder="https://"
                    />
                </FormField>
            </div>
            <fieldset class="grid gap-3">
                <legend class="mb-1 text-[0.8125rem] font-semibold">Show on</legend>
                <div v-for="type in $props.types" :key="type.id" class="grid gap-2 rounded-lg border p-3">
                    <div class="flex items-center gap-2.5">
                        <Checkbox :id="`type-${type.id}`" v-model:modelValue="form.types[type.id]" class="cursor-pointer" />
                        <Label :for="`type-${type.id}`" class="cursor-pointer">{{ type.name }}</Label>
                    </div>
                    <div v-if="form.types[type.id]" class="grid gap-1.5 pl-6.5">
                        <Label :for="`icon-${type.key}`" class="text-[0.8125rem] font-normal text-muted-foreground">Icon name</Label>
                        <Input
                            :id="`icon-${type.key}`"
                            type="text"
                            name="icons"
                            :class="errors?.icon && 'error-field'"
                            v-model="form.icons[type.key]"
                            autoComplete="off"
                        />
                    </div>
                </div>
                <ErrorMessage v-if="errors?.types" :value="errors?.types" />
            </fieldset>
            <div class="flex gap-2">
                <Button class="cursor-pointer" type="submit">Save changes</Button>
                <LinkButton href="/sites" variant="ghost">Cancel</LinkButton>
            </div>
        </Form>
    </FormPanel>
</template>

<style scoped>
  >>> img {
    max-width: 100px;
  }
</style>

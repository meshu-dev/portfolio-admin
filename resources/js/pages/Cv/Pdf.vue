<script setup lang="ts">
import { router, useHttp, usePoll } from '@inertiajs/vue3';
import FormPanel from '@/components/FormPanel.vue';
import PageHeader from '@/components/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import { getFormattedDate } from '@/lib/utils';
import { onBeforeUnmount, ref, Ref } from 'vue';
import { FlashMessage, PdfFile } from '@/types/portfolio';
import { FlashTypeEnum } from '@/enums/FlashTypeEnum';

let props = defineProps({ pdf: Object });
const pdf: Ref<PdfFile | null> = ref(props.pdf as PdfFile);

const http = useHttp();

const createPdf = () => {
    router.post(
        `/cv/pdf`,
        {},
        {
            onSuccess: () => {
                stop();
                start();
            },
        },
    );
};

const onPollStart = () => {
    http.get('/cv/pdf/file', {
        onSuccess: (response: unknown): void => {
            const responsePdf: PdfFile | null = response ? (response as PdfFile) : null;

            if ((pdf.value === null && responsePdf?.id) || (pdf.value && responsePdf && pdf.value.updated_at != responsePdf.updated_at)) {
                const flashMessage: FlashMessage = {
                    message: 'PDF created',
                    type: FlashTypeEnum.SUCCESS,
                };
                router.flash(() => flashMessage);

                pdf.value = responsePdf;
            }
        },
    });
};

const onPollFinish = () => {
    stop();
};

const { start, stop } = usePoll(2000, { onStart: onPollStart, onFinish: onPollFinish }, { autoStart: false });

onBeforeUnmount(() => stop());
</script>

<template>
    <PageHeader value="PDF" site="cv" description="A PDF copy of your CV, linked from the CV's Download PDF button." />
    <FormPanel>
        <template v-if="pdf">
            <dl class="grid gap-4 sm:grid-cols-[9rem_1fr]">
                <dt class="text-[0.8125rem] font-semibold text-muted-foreground">File</dt>
                <dd class="min-w-0">
                    <a
                        :href="pdf.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-medium break-all underline underline-offset-2 hover:text-cv"
                    >
                        {{ pdf.url }}
                    </a>
                </dd>
                <dt class="text-[0.8125rem] font-semibold text-muted-foreground">Last created</dt>
                <dd>{{ getFormattedDate(pdf.updated_at, 'D MMMM YYYY [at] HH:mm') }}</dd>
            </dl>
            <p class="mt-5 text-[0.9375rem] text-muted-foreground">Create it again after changing your CV, so the PDF matches.</p>
            <Button class="mt-4 cursor-pointer" @click="createPdf()">Create a new PDF</Button>
        </template>
        <template v-else>
            <p class="text-muted-foreground">There's no PDF of your CV yet.</p>
            <Button class="mt-4 cursor-pointer" @click="createPdf()">Create PDF</Button>
        </template>
    </FormPanel>
</template>

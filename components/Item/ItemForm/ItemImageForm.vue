<script setup>
  import { useImageStore } from '@/stores/ImageStore';
  import { uploadImage, removeImage } from '@/composables/image/utils';

  const imageStore = useImageStore();
  const fileInput = ref([]);

  const emit = defineEmits(['onUpload', 'onRemove']);

  const upload = async () => {
    const isUploaded = await uploadImage(fileInput);

    if (isUploaded === true) {
      emit('onUpload');
    }
  };

  const remove = () => {
    removeImage();
    emit('onRemove');
  };
</script>

<template>
  <div id="item-image-container">
    <div
      v-if="imageStore.getImageUrl == null"
      id="item-image-blank">
      No image
    </div>
    <v-img
      v-if="imageStore.getImageUrl"
      max-height="500"
      :aspect-ratio="16 / 9"
      :src="imageStore.getImageUrl"
      class="item-fullfield"
      cover />
    <div id="item-image-actions">
      <div v-if="imageStore.getImageUrl == null" id="item-image-upload">
        <v-file-input label="Add image" v-model="fileInput" />
        <v-btn
          variant="tonal"
          :disabled="fileInput.length === 0 ? true : false"
          @click="upload">Upload</v-btn>
      </div>
      <v-btn
        v-if="imageStore.getImageUrl"
        variant="tonal"
        @click="remove">Remove</v-btn>
    </div>
  </div>
</template>

<style lang="scss">
  #item-image-container {
    display: flex;

    #item-image-blank {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #EAEAEA;
      width: 500px;
      height: 300px;
      font-size: 30px;
    }

    #item-image-actions {
      margin-left: 20px;

      #item-image-upload {
        width: 400px;

        .v-btn {
          margin-left: 40px;
        }
      }
    }
  }
</style>

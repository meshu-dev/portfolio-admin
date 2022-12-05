<script setup>
  const props = defineProps({
    image: Object
  });
  const { image } = toRefs(props);

  const upload = () => {

  };

  const remove = () => {

  };
</script>

<template>
  <div id="item-image-container">
    <div
      v-if="image == null"
      id="item-image-blank">
      No image
    </div>
    <v-img
      v-if="image"
      max-height="500"
      :aspect-ratio="16 / 9"
      :src="image.url"
      class="item-fullfield"
      cover />
    <div id="item-image-btns">
      <v-btn
        v-if="image == null"
        variant="tonal"
        @click="upload">Upload</v-btn>
      <v-btn
        v-if="image"
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

    #item-image-btns {
      margin-left: 20px;
    }
  }
</style>

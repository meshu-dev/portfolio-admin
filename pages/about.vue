<script setup>
  const submit = () => {
    console.log('Submit!');
  };
</script>

<template>
  <div>
    <h1>About</h1>
    <v-textarea
      label="Enter text for about page"
      no-resize
      rows="10">
    </v-textarea>
    <v-btn
      variant="tonal"
      @click="submit">Submit</v-btn>
  </div>
</template>
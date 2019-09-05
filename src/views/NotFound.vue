<template>
  <div>
    <h1>{{ resource | capitalise }} not found</h1>
    <h2>The {{ resource }} you were looking for is not available.</h2>
    <router-link :to="{ name: 'profile' }">Go back to home page</router-link>
  </div>
</template>

<script>
  export default {
    props: {
      resource: {
        type: String,
        required: true
      }
    }
  }
</script>

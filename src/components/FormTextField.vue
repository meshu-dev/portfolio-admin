<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    value: [
      String,
      Number
    ]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
label {
  display: inline-block;
  font-size: 120%;
  margin-right: 10px;
  width: 150px;
}
input {
  height: 25px;
  min-width: 400px;
}
</style>

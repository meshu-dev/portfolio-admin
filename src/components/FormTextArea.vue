<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <textarea :value="value" @input="updateValue" v-bind="$attrs">{{ value }}</textarea>
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
  margin-bottom: 20px;
}
label {
  display: inline-block;
  vertical-align: top;
  font-size: 120%;
  margin-right: 10px;
  width: 150px;
}
textarea {
  min-height: 150px;
  min-width: 400px;
  resize: none;
}
</style>

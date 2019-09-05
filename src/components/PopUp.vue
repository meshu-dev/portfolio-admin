<template>
  <transition name="fade">
    <div id="overlay">
      <div id="popup">
        <slot name="message"></slot>
        <div id="buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default { };
</script>

<style scoped>
#overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}
#popup {
  max-width: 400px;
  height: auto;
  padding: 20px;
  background-color: #fff;
}
#buttons {
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

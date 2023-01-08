<script setup>
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
</script>

<template>
  <div id="login-layout" class="layout">
    <div id="login-content-wrapper" class="content-box-wrapper">
      <div id="login-content">
        <StatusMsg />
        <div class="content-box">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  html {
    overflow: hidden;
  }
</style>

<style lang="scss">
  #login-layout {
    height: 100%;

    #login-content-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: 0;

      #login-content {
        display: flex;
        flex-direction: column;
        width: 500px;
        min-height: 300px;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 600px) {
    #login-layout {
      #login-content-wrapper {
        #login-content {
          width: 100%;
          margin: 0 20px;
        }
      }
    }
  }
</style>

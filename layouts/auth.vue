<script setup>
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
</script>

<template>
  <div id="layout">
    <div id="content">
      <StatusMsg />
      <div id="content-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  html {
    overflow: hidden;
  
    #layout {
      height: 100%;

      #content {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 0;

        #content-box {
          width: 500px;
          min-height: 300px;
          margin: 0 auto;
        }
      }
    }
  }

  @media (max-width: 600px) {
    html {
      #layout {
        #content {
          #content-box {
            width: 100%;
            margin: 0 20px;
          }
        }
      }
    }
  }
</style>

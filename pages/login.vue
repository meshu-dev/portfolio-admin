<script setup>
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useAuthStore } from '../stores/AuthStore';

  definePageMeta({ layout: false });

  const form = ref(false);
  const email = ref(null);
  const password = ref(null);
  const loading = ref(false);

  const required = (value) => {
    return !!value || 'Field is required';
  }
  
  const onSubmit = async () => {
    if (!form) return;

    loading.value = true;

    const authStore = useAuthStore();
    let response = null;

    try {
      response = await authStore.login(email.value, password.value);
    } catch (error) {
      const layoutStore = useLayoutStore();
        
      layoutStore.setStatusMsg({
        type: 'error',
        text: [error.message]
      });
    }
    
    loading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <div id="logo">Portfolio Admin</div>
    <div id="login-wrapper">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email" />
        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          :type="'password'"
          clearable
          label="Password"
          placeholder="Enter your password" />
        <div id="login-btnwrapper">
          <v-btn
            color="primary"
            :disabled="!form"
            :loading="loading"
            size="large"
            type="submit"
            variant="elevated">
            Sign In
          </v-btn>
        </div>
      </v-form>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
  #logo {
    text-align: center;
    margin: 20px 0;
    font-style: italic;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 0 15px;
  }

  #login-btnwrapper {
    display: flex;
    justify-content: center;
  }
</style>
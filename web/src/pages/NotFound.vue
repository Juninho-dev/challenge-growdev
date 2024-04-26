<template>
  <v-container class="h-100">
    <div class="d-flex justify-center h-100 align-center">
      <v-card class="pa-10">
        <div class="d-flex justify-center">
          <v-img
            :src="logo"
            width="200"
          />
        </div>
        <h1 class="my-10 text-center text-h1">404</h1>
        <p>A página que você está procurando não existe.</p>
        <div class="mt-10 d-flex justify-center">
          <v-btn
            color="orange"
            @click="$router.push({ name: 'Login' })"
          >
            Voltar para a página inicial
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import logo from '@/assets/logo_growdev.svg'

export default {
  name: "NotFound",
  setup() {
    return {
      logo
    };
  },
};
</script>

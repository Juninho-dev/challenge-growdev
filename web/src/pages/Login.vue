<template>
  <vue-header />
  <loading :loading/>
  <v-container>
    <div class="text-center mt-8">
      <h1>Bem vindo ao teste da Growdev</h1>
    </div>
    <div class="mt-10 d-flex justify-center">
      <login-card-form @login="handleLogin"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import LoginCardForm from "@/components/LoginForm.vue";
import Loading from "@/components/Loading.vue";
import VueHeader from "@/components/Header.vue";
import { login } from "@/services/auth";
import { getError } from "@/helpers/error";

export default {
  name: "Login",
  components: {
    Loading,
    LoginCardForm,
    VueHeader,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleLogin(email: string, password: string) {
      this.loading = true;

      try {
        const response = await login({
          email,
          password
        });

        if (response.isSuccess) {
          this.$router.push({ name: "Dashboard" });
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao fazer login");
        this.$swal({
          title: tratativeError.title,
          text: tratativeError.message,
          icon: "error",
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

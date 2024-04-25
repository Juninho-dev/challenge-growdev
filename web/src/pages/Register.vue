<template>
  <vue-header />
  <loading :loading/>
  <v-container>
    <div class="text-center mt-8">
      <h1>Bem vindo ao teste da Growdev</h1>
    </div>
    <div class="mt-10 d-flex justify-center">
      <register-card-form @register="handleRegister"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import RegisterCardForm from "@/components/RegisterForm.vue";
import Loading from "@/components/Loading.vue";
import VueHeader from "@/components/Header.vue";
import { register } from "@/services/auth";
import { getError } from "@/helpers/error";

export default {
  name: "Register",
  components: {
    Loading,
    RegisterCardForm,
    VueHeader,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleRegister(name: string, email: string, password: string) {
      this.loading = true;
      console.log(name, email, password)
      try {
        const response = await register({
          email,
          password,
          name,
        });

        if (response.isSuccess) {
          this.$router.push({ name: "Dashboard" });
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao fazer cadastro");
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

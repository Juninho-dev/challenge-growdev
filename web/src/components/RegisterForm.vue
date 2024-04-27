<template>
  <v-card class="elevation-12 rounded-md pa-5">
    <v-card-title class="text-center">
      <h1 class="display-1 font-weight">Cadastre-se</h1>
      <v-divider class="mt-5 bg-secondary"/>
      <span class="font-weight-light">
        Preencha os campos abaixo para continuar
      </span>
    </v-card-title>
    <v-card-text class="mt-10">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nome Completo"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          type="email"
          autocomplete="off"
          variant="outlined"
        />
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          required
          variant="outlined"
          autocomplete="off"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
      <div class="text-end">
        <span>
          Possui uma conta?
          <router-link replace to="/" class="text-secondary">
            Faça o login
          </router-link>
        </span>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        class="w-100 bg-orange"
        size="large"
        :disabled="!valid"
        @click="register"
      >
        Cadastrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      showPassword: false,
      nameRules: [
        (v: string) => !!v || "O nome é obrigatório",
        (v: string) =>
          (v && v.length <= 100) || "O nome deve ter no máximo 100 caracteres",
      ],

      emailRules: [
        (v: string) => !!v || "E-mail é obrigatório",
        (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      passwordRules: [
        (v: string) => !!v || "Senha é obrigatória",
        (v: string) => v.length >= 8 || "Senha deve ter no mínimo 8 caracteres",
      ],
    };
  },
  computed: {
    valid() {
      return this.email !== "" && this.password !== "" && this.name !== "";
    },
  },
  created() {
    console.log("RegisterCardForm created");
  },
  emits: ["register"],
  methods: {
    register() {
      this.$emit("register", this.name, this.email, this.password);
    },
  },
};
</script>

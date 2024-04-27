<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="form.name"
        id="name"
        :error-messages="v$.form.name.$errors?.map(error => error.$message)"
        label="Nome"
        outlined
        @input="v$.form.name.$touch"
        @blur="v$.form.name.$touch"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        type="email"
        id="email"
        v-model="form.email"
        label="E-mail"
        outlined
        :error-messages="v$.form.email.$errors?.map(error => error.$message)"
        @input="v$.form.email.$touch"
        @blur="v$.form.email.$touch"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="form.ra"
        id="ra"
        label="Registro Acadêmico"
        type="number"
        :disabled="haveId"
        :error-messages="v$.form.ra.$errors?.map(error => error.$message)"
        outlined
        @input="v$.form.ra.$touch"
        @blur="v$.form.ra.$touch"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :model-value="mask.masked(form.cpf)"
        id="cpf"
        label="CPF"
        outlined
        :disabled="haveId"
        counter="14"
        :error-messages="v$.form.cpf.$errors.map(error => error.$message)"
        @update:model-value="form.cpf = mask.unmasked($event)"
        @input="v$.form.cpf.$touch"
        @blur="v$.form.cpf.$touch"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { Mask } from "maska"
import { IStudent } from "@/interfaces/student";

export default {
  name: "StudentForm",
  props: {
    initialData: {
      type: Object,
      default: () => ({} as IStudent),
    },
    haveId: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
      mask: new Mask({ mask: "###.###.###-##" }),
    };
  },
  data() {
    return {
      form: {
        name: this.initialData?.name || "",
        email: this.initialData?.email || "",
        ra: this.initialData?.ra || "",
        cpf: this.initialData?.cpf || "",
      },
    };
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage("Campo obrigatório", required),
        },
        email: {
          required: helpers.withMessage("Campo obrigatório", required),
          email: helpers.withMessage("E-mail inválido", email),
        },
        ra: {
          required: helpers.withMessage("Campo obrigatório", required),
        },
        cpf: {
          required: helpers.withMessage("Campo obrigatório", required),
          minLength: helpers.withMessage("CPF inválido", minLength(11)),
        },
      },
    };
  },
  watch: {
    "form": {
      handler() {
        this.emitFormChange()
      },
      deep: true,
    },
  },
  emits: ["form-changed"],
  methods: {
    emitFormChange() {
      const formData = { ...this.form }

      this.$emit("form-changed", formData)
    },
  },
};
</script>

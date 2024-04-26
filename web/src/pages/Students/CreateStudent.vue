<template>
  <v-container>
    <loading :loading/>
    <h2>Cadastro de Alunos</h2>
    <div class="mt-10">
      <student-form @form-changed="student = $event" />
      <div class="d-flex justify-space-between">
        <v-btn
          color="white"
          class="mt-2"
          @click="$router.push({ name: 'Students' })"
        >
          Voltar
        </v-btn>
        <v-btn
          color="orange"
          class="mt-2"
          @click="handleSave"
        >
          Salvar
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import StudentForm from "@/components/StudentForm.vue";
import { useVuelidate } from "@vuelidate/core";
import studentService from "@/services/studentService";
import { IStudent } from "@/interfaces/student";
import { getError } from "@/helpers/error";
import Loading from "@/components/Loading.vue";

export default {
  name: "CreateStudent",
  components: { Loading, StudentForm },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      student: {} as Omit<IStudent, 'id'>,
      loading: false,
    };
  },
  methods: {
    async handleSave() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      this.loading = true;
      try {
        await studentService.create(this.student);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "success",
          title: "Aluno cadastrado com sucesso",
        })
        this.$router.push({ name: "Students" });
      } catch (error) {
        const tratativeError = getError(error, "Erro ao cadastrar aluno");
        this.$swal({
          title: tratativeError.title,
          text: tratativeError.message,
          icon: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

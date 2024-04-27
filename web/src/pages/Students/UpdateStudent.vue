<template>
  <v-container>
    <loading :loading/>
    <h2>Atualizar Aluno</h2>
    <div class="mt-10">
      <student-form
        v-if="student && !loading"
        :initial-data="student"
        have-id
        @form-changed="student = $event"
      />
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
  name: "UpdateStudent",
  components: { Loading, StudentForm },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      student: {} as IStudent,
      loading: false,
    };
  },
  created() {
    this.fetchStudent();
  },
  methods: {
    async fetchStudent() {
      this.loading = true;
      try {
        this.student = await studentService.get(this.id);
      } catch (error) {
        const tratativeError = getError(error, "Erro ao buscar aluno");
        this.$swal({
          title: tratativeError.title,
          text: tratativeError.message,
          icon: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    async handleSave() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      this.loading = true;
      try {
        await studentService.update(this.id, this.student);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "success",
          title: "Aluno atualizado com sucesso",
        })
        this.$router.push({ name: "Students" });
      } catch (error) {
        const tratativeError = getError(error, "Erro ao atualizar o aluno");
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

<template>
  <v-container>
    <loading :loading />
    <h2>Consulta de Alunos</h2>
    <div class="mt-10">
      <v-row>
        <v-col>
          <v-text-field
            label="Pesquisar"
            variant="outlined"
            @input="handleSearch"
          />
        </v-col>
        <v-col class="text-end">
          <v-btn
            color="orange"
            class="mt-2"
            @click="$router.push({ name: 'CreateStudent' })"
          >
            Cadastrar
            <span class="d-none d-sm-block ml-1">Aluno</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">Registro Acadêmico</th>
          <th class="text-left">
            Nome
            <v-btn
              variant="plain"
              icon="mdi-arrow-up-bold"
              size="x-small"
              @click="sortByName"
            />
          </th>
          <th class="text-left">CPF</th>
          <th class="text-left">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.ra }}</td>
          <td>{{ student.name }}</td>
          <td>{{ setMaskCpf(student.cpf) }}</td>
          <td>
            <v-row>
              <v-btn
                color="green"
                variant="plain"
                class="mt-2"
                @click="$router.push({ name: 'UpdateStudent', params: { id: student.id } })"
              >
                Editar
              </v-btn
              >
              <v-btn
                color="red"
                variant="plain"
                class="mt-2"
                @click="handleOpenDialogDelete(student.id)"
              >
                Excluir
              </v-btn
              >
            </v-row>
          </td>
        </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script lang="ts">
import studentService from "@/services/studentService";
import { IStudent } from "@/interfaces/student";
import { setMaskCpf } from "@/helpers/helpers";
import { getError } from "@/helpers/error";
import Loading from "@/components/Loading.vue";

export default {
  name: "Students",
  components: { Loading },
  data() {
    return {
      search: "",
      students: [] as IStudent[],
      loading: false,
    }
  },
  created() {
    this.fetchStudents();
  },
  methods: {
    setMaskCpf,
    async handleSearch(e: Event) {
      const value = (e.target as HTMLInputElement).value;
      if (value) {
        this.students = this.students.filter((student) =>
          student.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        await this.fetchStudents();
      }
    },
    async fetchStudents() {
      this.loading = true;

      try {
        this.students = await studentService.list();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    sortByName() {
      this.students.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    async handleOpenDialogDelete(id: number) {
      const { value } = await this.$swal({
        title: "Deseja realmente excluir?",
        icon: "warning",
        confirmButtonColor: "#FF9800",
        cancelButtonColor: "#F44336",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (!value) {
        return
      }
      this.loading = true;
      try {
        await studentService.remove(id);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "success",
          title: "Aluno excluído com sucesso",
        });
        await this.fetchStudents();
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
  }
};
</script>

<template>
  <v-container>
    <loading :loading />
    <h2>Consulta de Alunos</h2>
    <div class="mt-10">
      <v-row>
        <v-col>
          <v-text-field
            label="Pesquisar pelo nome"
            variant="outlined"
            @update:model-value="handleSearch($event)"
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
          <th class="text-left">
            Registro Acadêmico
            <v-btn
              v-if="filters.sort === 'ra' && filters.order === 'asc'"
              variant="plain"
              icon="mdi-arrow-up-bold"
              size="x-small"
              @click="sortBy('ra', 'desc')"
            />
            <v-btn
              v-else
              variant="plain"
              icon="mdi-arrow-down-bold"
              size="x-small"
              @click="sortBy('ra', 'asc')"
            />
          </th>
          <th class="text-left">
            Nome
            <v-btn
              v-if="filters.sort === 'name' && filters.order === 'asc'"
              variant="plain"
              icon="mdi-arrow-up-bold"
              size="x-small"
              @click="sortBy('name', 'desc')"
            />
            <v-btn
              v-else
              variant="plain"
              icon="mdi-arrow-down-bold"
              size="x-small"
              @click="sortBy('name', 'asc')"
            />
          </th>
          <th class="text-left">
            CPF
            <v-btn
              v-if="filters.sort === 'cpf' && filters.order === 'asc'"
              variant="plain"
              icon="mdi-arrow-up-bold"
              size="x-small"
              @click="sortBy('cpf', 'desc')"
            />
            <v-btn
              v-else
              variant="plain"
              icon="mdi-arrow-down-bold"
              size="x-small"
              @click="sortBy('cpf', 'asc')"
            />
          </th>
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
import { debounce } from "lodash"

export default {
  name: "Students",
  components: { Loading },
  data() {
    return {
      search: "",
      students: [] as IStudent[],
      loading: false,
      filters: {
        name: "",
        order: "asc",
        sort: "name",
      },
    }
  },
  created() {
    this.fetchStudents();
    this.handleSearch = debounce(this.handleSearch, 500) as (text: string) => Promise<void>;
  },
  methods: {
    setMaskCpf,
    async handleSearch(text: string): Promise<void>  {
      this.filters.name = text;
      await this.fetchStudents();
    },
    async fetchStudents() {
      this.loading = true;

      try {
        this.students = await studentService.list(this.filters);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    sortBy(sort: "name" | "cpf" | "ra", order: "asc" | "desc") {
      this.filters.sort = sort;
      this.filters.order = order;
      this.fetchStudents();
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

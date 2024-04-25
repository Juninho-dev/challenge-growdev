<template>
  <v-container>
    <h2>Consulta de Alunos</h2>
    <div class="mt-10">
      <v-row>
        <v-col>
          <v-text-field
            label="Pesquisar"
            variant="outlined"
          />
        </v-col>
        <v-col class="text-end">
          <v-btn color="orange" class="mt-2">
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
                @click="handleOpenDialog(student)"
              >
                Editar
              </v-btn
              >
              <v-btn
                color="red"
                variant="plain"
                class="mt-2"
                @click="handleOpenDialogDelete(student)"
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
export default {
  name: "Students",
};
</script>

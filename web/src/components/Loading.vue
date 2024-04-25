<template>
  <v-dialog
    :model-value="loading"
    persistent
  >
    <div class="d-flex justify-center">
      <v-progress-circular
        indeterminate
        color="orange"
        size="64"
      />
    </div>
  </v-dialog>
</template>
<script lang="ts">
export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    teste() {
      console.log('teste');
    }
  }
};
</script>

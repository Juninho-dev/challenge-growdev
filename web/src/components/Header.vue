<template>
  <header class="bg-white pa-4 d-flex justify-center">
    <div>
      <v-img :src="logo" width="150"/>
    </div>
  </header>
</template>
<script lang="ts">
import logo from "@/assets/logo_growdev.svg";

export default {
  name: "VueHeader",
  setup() {
    return { logo };
  }
};
</script>

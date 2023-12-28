<script setup lang="ts">
import { api } from "../../src/trpc";
import { useQuery } from "@tanstack/vue-query";

const { isLoading, data } = useQuery({
  queryKey: ["message"],
  queryFn: async () => {
    return api.auth.getSecretMessage.query();
  },
  refetchOnWindowFocus: false,
});
</script>

<template>
  <div v-if="isLoading">loading ...</div>

  <div v-if="!isLoading && data">
    <p>{{ data }}</p>
  </div>

  <div v-if="!isLoading && !data">You need to login first</div>
</template>

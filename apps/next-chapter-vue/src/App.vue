<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { Toaster } from "vue-sonner";
import { useDarkMode } from "@/composables";

const { isDark } = useDarkMode();
</script>

<template>
  <VueQueryDevtools />
  <Toaster :theme="isDark ? 'dark' : 'light'" richColors />
  <router-view></router-view>
</template>

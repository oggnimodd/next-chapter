<script setup lang="ts">
import { BaseLayout } from "@/layouts";
</script>

<template>
  <BaseLayout :require-auth="false">
    <div class="flex mt-32 w-full flex-1 justify-center flex-col items-center gap-y-3">
      <h1 class="font-bold">Page not found</h1>
      <router-link to="/">
        <VBtn color="primary">
          <VIcon icon="mdi-home" class="mr-3" />
          Back To Home
        </VBtn>
      </router-link>
    </div>
  </BaseLayout>
</template>

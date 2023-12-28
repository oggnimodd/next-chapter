<script setup lang="ts">
import { CommonLayout } from "@/layouts";
</script>

<template>
  <CommonLayout :require-auth="false">
    <h1>Not found</h1>
    <router-link to="/">
      <a>Back to home</a>
    </router-link>
  </CommonLayout>
</template>

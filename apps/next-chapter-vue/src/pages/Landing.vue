<script setup lang="ts">
import { BaseLayout } from "@/layouts";
import { Hero } from "@/components";
</script>

<template>
  <BaseLayout :unauthenticated-only="true">
    <Hero />
  </BaseLayout>
</template>

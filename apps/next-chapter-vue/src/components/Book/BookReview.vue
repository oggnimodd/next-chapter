<script setup lang="ts">
import { useBooksDetails } from "@/composables";
import BookReviewCardAndForm from "./BookReviewCardAndForm.vue"

const { id, isLoading, isError } = useBooksDetails();
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error...</p>
  <div v-else-if="id" className="flex flex-col w-full lg:w-1/2">
    <BookReviewCardAndForm :bookId="id" />
  </div>
</template>

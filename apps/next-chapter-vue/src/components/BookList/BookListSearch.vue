<script setup lang="ts">
import { SearchResults } from "@acme/google-books";
import { CardSearch } from "../Card";

export interface BookListShelfProps {
  books?: SearchResults["items"];
}

const { books } = defineProps<BookListShelfProps>();
</script>

<template>
  <div
    class="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-3"
  >
    <CardSearch v-for="book in books" :key="book.id" :item="book" />
  </div>
</template>

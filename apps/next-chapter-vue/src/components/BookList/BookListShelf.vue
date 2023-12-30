<script setup lang="ts">
import { Book } from "@acme/db";
import { CardShelf } from "@/components";

interface BookListShelfProps {
  books: Book[];
  type: string;
}

const { books, type } = defineProps<BookListShelfProps>();
</script>

<template>
  <h2 class="font-bold text-2xl mb-3 text-primary">
    {{ type }}
    <span class="dark:text-white text-black/90 text-lg"
      >({{ books.length }} {{ books.length === 1 ? "book" : "books" }})
    </span>
  </h2>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
  >
    <CardShelf
      v-for="book in books"
      :key="book.id + books.length"
      :book="book"
    />
  </div>
</template>

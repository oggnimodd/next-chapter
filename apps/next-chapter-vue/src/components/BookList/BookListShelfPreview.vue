<script setup lang="ts">
import { Book } from "@acme/db";
import { CardShelf, CardEmptyShelf } from "../Card";

interface CardShelfProps {
  title: string;
  books: Book[];
  shelfId: string;
}

const { title, books, shelfId } = withDefaults(
  defineProps<CardShelfProps>(),
  {}
);
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-primary">{{ title }}</h2>
      <router-link :to="`/shelf/${shelfId}`" class="text-primary font-semibold h-full">View all</router-link>
    </div>
    <div class="flex overflow-x-auto gap-x-3 snap-x snap-mandatory">
      <CardEmptyShelf v-if="books.length === 0" />
      <CardShelf v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

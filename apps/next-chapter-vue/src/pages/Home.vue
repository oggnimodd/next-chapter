<script setup lang="ts">
import { api } from "@/trpc";
import { useQuery } from "@tanstack/vue-query";
import { BookListShelfPreview } from "@/components";
import { BaseLayout } from "@/layouts";

const {
  data: shelves,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["shelves"],
  queryFn: () => api.shelf.getAll.query(),
});
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4">
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="isError">Error...</p>
      <!-- The key needs to be like this, since vue reactivity systems would not detect the change in the shelf.book length when moving or removing a book -->
      <BookListShelfPreview
        v-for="shelf in shelves"
        :key="shelf.id + shelf.Book.length"
        :title="shelf.type"
        :books="shelf.Book"
        :shelfId="shelf.id"
      />
    </div>
  </BaseLayout>
</template>

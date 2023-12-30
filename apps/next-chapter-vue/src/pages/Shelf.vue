<script setup lang="ts">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { api } from "@/trpc";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BookListShelf, CardEmptyShelf } from "@/components";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const shelfId = typeof id === "string" ? id : "";

const {
  data: shelfInfo,
  isError: isShelfError,
  isLoading: isShelfLoading,
} = useQuery({
  queryKey: ["shelf", id],
  queryFn: () => api.shelf.get.query(shelfId),
});

const {
  isError: isBooksError,
  data: books,
  isLoading: isBooksLoading,
} = useQuery({
  queryKey: ["books", id],
  queryFn: () => api.book.getBooksInShelf.query(shelfId),
});

watch([isShelfError, isBooksError], ([shelfIsError, booksIsError]) => {
  if (shelfIsError || booksIsError) {
    toast.error("Failed to fetch books");
    router.push("/");
  }
});
</script>

<template>
  <BaseLayout>
    <p v-if="isShelfLoading || isBooksLoading">Loading...</p>
    <p v-if="isShelfError || isBooksError">Error...</p>
    <BookListShelf
      v-if="!isShelfLoading && !isBooksLoading && !isBooksError"
      :type="shelfInfo?.type || ''"
      :books="books || []"
    />
    <CardEmptyShelf
      v-if="
        !isShelfLoading && !isBooksLoading && !isBooksError && !books?.length
      "
    />
  </BaseLayout>
</template>

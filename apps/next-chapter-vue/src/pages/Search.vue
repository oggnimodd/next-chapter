<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { searchBooks } from "@acme/google-books";
import { BookListSearch } from "@/components";
import { BaseLayout } from "@/layouts";

const searchField = ref("");
const query = ref("");

const {
  data: books,
  isLoading,
  isError,
  refetch,
} = useQuery({
  queryKey: ["books", query],
  queryFn: () => searchBooks({ query: query.value }),
  enabled: Boolean(query.value),
  refetchOnWindowFocus: false,
});

const handleSearch = async () => {
  if (searchField.value) {
    query.value = searchField.value;
    await refetch();
  }
};

const clear = () => {
  searchField.value = "";
  query.value = "";
};
</script>

<template>
  <BaseLayout :require-auth="true">
    <form @submit.prevent="handleSearch" class="flex gap-x-2 max-w-lg w-full">
      <VTextField
        density="compact"
        variant="outlined"
        color="primary"
        autoFocus
        fullWidth
        label="Search Books"
        v-model="searchField"
        class="w-full"
      >
        <template #append-inner>
          <div class="flex items-center gap-x-2">
            <VIcon
              icon="mdi-close"
              class="cursor-pointer text-primary-main text-lg"
              @click="clear"
            />
            <VIcon
              icon="mdi-magnify"
              class="cursor-pointer text-primary-main text-lg"
              @click="handleSearch"
            />
          </div>
        </template>
      </VTextField>
      <div class="w-[10%] h-full">
        <VProgressCircular
          size="40"
          indeterminate
          v-if="isLoading"
          color="primary"
        />
      </div>
    </form>

    <BookListSearch
      v-if="!isLoading && !isError && books?.items"
      :books="books.items"
    />
  </BaseLayout>
</template>

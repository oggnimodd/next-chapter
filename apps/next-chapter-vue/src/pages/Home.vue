<script setup lang="ts">
import { api } from "@/trpc";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { BookListShelfPreview } from "@/components";
import { BaseLayout } from "@/layouts";
import { watch } from "vue";
import { computed } from "vue";

const { mutateAsync: initialize } = useMutation({
  mutationFn: api.shelf.generateInitialShelves.mutate,
  onSuccess: () => {
    refetch();
  },
});

const {
  data: shelves,
  refetch,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["shelves"],
  queryFn: () => api.shelf.getAll.query(),
});

// Watch for shelves, it there is no shelve than generate
watch(shelves, () => {
  if (shelves.value?.length === 0) {
    initialize();
  }
});

const typeOrder = {
  "Currently Reading": 0,
  "To Be Read": 1,
  Read: 2,
};

const sorted = computed(() => {
  return shelves.value
    ? [...shelves.value].sort((a, b) => {
        return (
          typeOrder[a.type as keyof typeof typeOrder] -
          typeOrder[b.type as keyof typeof typeOrder]
        );
      })
    : [];
});
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4">
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="isError">Error...</p>
      <!-- The key needs to be like this, since vue reactivity systems would not detect the change in the shelf.book length when moving or removing a book -->
      <BookListShelfPreview
        v-for="shelf in sorted"
        :key="shelf.id + shelf.Book.length"
        :title="shelf.type"
        :books="shelf.Book"
        :shelfId="shelf.id"
      />
    </div>
  </BaseLayout>
</template>

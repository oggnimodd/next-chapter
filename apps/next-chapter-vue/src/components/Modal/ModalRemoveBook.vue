<script setup lang="ts">
import { api } from "@/trpc";
import { toast } from "vue-sonner";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { emptyFunction } from "@/utils/functions";

export interface ModalRemoveBookProps {
  opened: boolean;
  handlers: {
    open: () => void;
    close: () => void;
  };
  bookId: string;
  title: string;
}

const { opened, bookId, title, handlers } = defineProps<ModalRemoveBookProps>();
const queryClient = useQueryClient();

const open = handlers?.open || emptyFunction;
const close = handlers?.close || emptyFunction;

const handlerFunctions = {
  open,
  close,
};

const { mutateAsync: removeBook, isPending } = useMutation({
  mutationFn: api.book.delete.mutate,
  onSuccess: async () => {
    toast.success("Book removed successfully");
    queryClient.invalidateQueries({ queryKey: ["shelves"] });
    queryClient.invalidateQueries({ queryKey: ["books"] });
  },
});

const handleRemove = async () => {
  try {
    await removeBook(bookId);
  } catch (err) {
    toast.error("Failed to remove book");
  } finally {
    handlers.close();
  }
};
</script>

<template>
  <VDialog
    :modelValue="opened"
    class="max-w-2xl"
    @update:modelValue="handlers.close"
  >
    <VCard>
      <div>
        <h2 class="text-primary">{{ title }}</h2>
        <p class="mt-2">Are you sure to delete this book from your shelf?</p>
        <div class="flex justify-end mt-4 gap-x-2">
          <VBtn
            color="primary"
            :disabled="isPending"
            @click="handlerFunctions.close"
            >No</VBtn
          >
          <VBtn color="error" :disabled="isPending" @click="handleRemove"
            >Yes</VBtn
          >
        </div>
      </div>
    </VCard>
  </VDialog>
</template>

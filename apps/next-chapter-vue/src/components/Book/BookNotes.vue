<script setup lang="ts">
import { TextAreaForm } from "@/components";
import { emptyFunction } from "@/utils/functions";
import { useBooksDetails } from "@/composables";
import { api } from "@/trpc";
import { toast } from "vue-sonner";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import BookNotesList from "./BookNotesList.vue";

const queryClient = useQueryClient();
const { id, data, isLoading, isError } = useBooksDetails();
const { mutateAsync: createNote, isPending: isCreatingNote } = useMutation({
  mutationFn: api.note.create.mutate,
});

const handleAddNote = async (description: string) => {
  try {
    await createNote({
      bookId: id.value,
      description,
    });

    toast.success("Note created successfully");
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  } catch (err) {
    toast.error("Failed to create note");
  }
};
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="isError">Error...</p>
  <div v-if="data" className="flex flex-col w-full lg:w-1/2">
    <TextAreaForm
      :isLoading="isCreatingNote"
      type="CREATE"
      name="notes"
      initialValue=""
      @submit="handleAddNote"
      @cancel="emptyFunction"
    />
    <BookNotesList :bookId="id" />
  </div>
</template>

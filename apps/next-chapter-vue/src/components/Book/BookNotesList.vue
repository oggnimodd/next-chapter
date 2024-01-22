<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/trpc";
import { toast } from "vue-sonner";
import { Note } from "@acme/db";
import { computed, ref } from "vue";
import { TextAreaForm } from "@/components";

export interface BookNotesListProps {
  bookId: string;
}

const { bookId } = defineProps<BookNotesListProps>();

const queryClient = useQueryClient();
const selectedNotes = ref<Note | null>(null);
const {
  isLoading,
  data: notes,
  isError,
} = useQuery({
  queryKey: ["notes", bookId],
  queryFn: () => api.note.getAll.query(bookId),
});
const { mutateAsync: updateNote } = useMutation({
  mutationFn: api.note.update.mutate,
  onSuccess: () => {
    toast.success("Note updated successfully");
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
});
const { mutateAsync: deleteNote, isPending: isDeletingNote } = useMutation({
  mutationFn: api.note.delete.mutate,
  onSuccess: () => {
    toast.success("Note deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
});

const handleUpdate = async (description: string) => {
  const targetId = selectedNotes?.value?.id;
  if (targetId) {
    try {
      await updateNote({ id: targetId, description });
      toast.success("Note updated successfully");
      handleCancelEdit();
    } catch {
      toast.error("Failed to update note");
    }
  }
};

const handleDelete = async (id: string) => {
  try {
    await deleteNote(id);
    toast.success("Note deleted successfully");
  } catch {
    toast.error("Failed to delete note");
  }
};

const handleCancelEdit = () => {
  selectedNotes.value = null;
};

const sortedNotes = computed(() => {
  if (!notes.value) {
    return [];
  }

  const sortedCopy = [...notes.value];
  return sortedCopy.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
});
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="isError">Error...</p>

  <div v-if="notes" class="my-2">
    <h6 class="mt-5 mb-2 text-lg">
      You have {{ notes.length }} notes for this book
    </h6>
    <div class="flex flex-col gap-y-3">
      <div class="mt-2" v-for="note in sortedNotes" :key="note.id">
        <TextAreaForm
          v-if="selectedNotes?.id === note.id"
          type="EDIT"
          name="notes"
          :initialValue="note.description"
          :onSubmit="handleUpdate"
          :onCancel="handleCancelEdit"
        />
        <VCard v-else class="p-4 rounded-md flex flex-col gap-2">
          <p>{{ note.description }}</p>
          <p className="text-sm italic dark:text-white/70 text-black/70">
            {{
              note.updatedAt.toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }}
          </p>

          <div class="flex gap-x-3">
            <VBtn
              size="small"
              class="shadow-none"
              icon="mdi-pencil"
              @click="selectedNotes = note"
            />
            <VBtn
              size="small"
              class="shadow-none"
              icon="mdi-delete"
              :disabled="isDeletingNote"
              @click="handleDelete(note.id)"
            />
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>

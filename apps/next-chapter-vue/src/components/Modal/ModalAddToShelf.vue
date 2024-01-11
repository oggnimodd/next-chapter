<script setup lang="ts">
import { Item } from "@acme/google-books";
import { toast } from "vue-sonner";
import { api } from "@/trpc";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { emptyFunction } from "@/utils/functions";
import { watch } from "vue";

type ActionTypes = "ADD" | "MOVE";

interface BaseProps {
  opened: boolean;
  action: ActionTypes;
  item?: Item;
  handlers: {
    open: () => void;
    close: () => void;
  };
}

interface AddActionProps extends BaseProps {
  action: "ADD";
  bookId?: string;
  title?: string;
}

interface MoveActionProps extends BaseProps {
  action: "MOVE";
  bookId: string;
  title: string;
}

export type ModalAddToShelfProps = AddActionProps | MoveActionProps;

// Initiation
const {
  opened,
  handlers: passedHandlers,
  action,
  item: passedItem,
  bookId,
} = defineProps<ModalAddToShelfProps>();

// Vue default props doesnt support complex types 'yet'
const open = passedHandlers?.open || emptyFunction;
const close = passedHandlers?.close || emptyFunction;

const handlers = {
  open,
  close,
};

const defaultItem = {
  volumeInfo: {
    title: "",
    imageLinks: {
      thumbnail: "",
    },
    description: "",
    infoLink: "",
  },
};

const item = passedItem || defaultItem;

// Form
const shelfSchema = z.object({
  shelf: z.string(),
});

const {
  value: shelfValue,
  errorMessage: shelfError,
  setErrors,
} = useField("shelf", toTypedSchema(shelfSchema), {
  initialValue: { shelf: "" },
});

const onSubmit = async () => {
  await save();
};

// Vue query
const queryClient = useQueryClient();
const {
  data: shelves,
  isLoading: isShelvesLoading,
  isError,
} = useQuery({
  queryKey: ["shelves"],
  queryFn: () => api.shelf.getAll.query(),
});

const addNewBookMutation = useMutation({
  mutationFn: api.book.create.mutate,
});
const moveBookMutation = useMutation({
  mutationFn: api.book.moveToShelf.mutate,
});

const save = async () => {
  try {
    if (shelfValue.value.shelf) {
      if (action === "ADD") {
        await addNewBookMutation.mutateAsync({
          shelfId: shelfValue.value.shelf,
          title: item.volumeInfo?.title,
          cover: item.volumeInfo?.imageLinks?.thumbnail || "",
          description: item.volumeInfo?.description || "",
          googleBooksUrl: item.volumeInfo?.infoLink || "",
        });
        toast.success("Book created successfully");
      } else if (action === "MOVE") {
        await moveBookMutation.mutateAsync({
          bookId: bookId || "",
          shelfId: shelfValue.value.shelf,
        });
        toast.success("Book moved successfully");
      }

      handlers.close();
      queryClient.invalidateQueries({ queryKey: ["shelves"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["bookDetails"] });
    }
  } catch (error) {
    const errorMessage =
      action === "ADD" ? "Failed to add book" : "Failed to move book";

    if (error instanceof Error && error.message.includes("constraint")) {
      setErrors("This book is already exist in your shelves");
    }

    toast.error(errorMessage);
  }
};

watch(shelfValue.value, () => {
  setErrors("");
});
</script>

<template>
  <VDialog :modelValue="opened" @update:modelValue="handlers.close" class="max-w-lg">
    <VCard>
      <div>
        <h2 class="text-primary">{{ item.volumeInfo?.title || title }}</h2>
        <p class="line-clamp-4 mt-2">{{ item.volumeInfo?.description }}</p>
        <VForm class="flex flex-col" v-if="!isShelvesLoading && !isError" @submit.prevent="onSubmit">
          <VSelect class="mt-4" v-model="shelfValue.shelf" label="Choose Shelf" :items="shelves" item-value="id"
            item-title="type">
          </VSelect>
          <p v-if="shelfError" class="mt-2 text-sm text-error">
            {{ shelfError }}
          </p>
          <VBtn type="submit" class="ml-auto mt-4" color="primary" :disabled="Boolean(shelfError) ||
            addNewBookMutation.isPending.value ||
            moveBookMutation.isPending.value
            ">
            {{ action === "ADD" ? "Save" : "Move" }}</VBtn>
        </VForm>
      </div>
    </VCard>
  </VDialog>
</template>

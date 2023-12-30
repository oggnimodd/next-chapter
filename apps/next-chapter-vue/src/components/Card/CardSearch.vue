<script setup lang="ts">
import { Item } from "@acme/google-books";
import { ModalAddToShelf } from "../Modal";
import { useDisclosure } from "../../composables";

export interface CardSearchProps {
  item: Item;
}

const { item } = defineProps<CardSearchProps>();
const addBookModalHandlers = useDisclosure(false);
</script>

<template>
  <VCard class="w-full flex flex-col">
    <img
      class="w-full object-cover aspect-[1/1.25]"
      :src="
        item.volumeInfo.imageLinks?.large ||
        item.volumeInfo.imageLinks?.thumbnail ||
        '/no_cover.png'
      "
      :alt="item.volumeInfo.title"
    />
    <VCardItem class="px-4">
      <h2 class="font-semibold line-clamp-2 text-primary-main text-xl">
        {{ item.volumeInfo.title }}
      </h2>
      <p class="mt-2 line-clamp-3">
        {{ item.volumeInfo.description }}
      </p>
    </VCardItem>
    <div
      class="flex flex-col flex-1 h-full justify-end items-end mt-auto pb-4 px-4"
    >
      <VBtn variant="tonal" @click="addBookModalHandlers.open" color="primary">
        Add
      </VBtn>
    </div>
  </VCard>
  <ModalAddToShelf
    action="ADD"
    :opened="addBookModalHandlers.state.value"
    :handlers="addBookModalHandlers"
    :item="item"
  />
</template>

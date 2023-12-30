<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { isMobile } from "is-mobile";
import { ModalRemoveBook, ModalAddToShelf } from "../Modal";
import { useDisclosure } from "../../composables";
import { Book } from "@acme/db";
import clsx from "clsx";

const route = useRoute();
const isHomePage = route.path === "/";
const menuOpened = ref(false);

const removeModalHandlers = useDisclosure(false);
const moveModalHandlers = useDisclosure(false);

export interface CardShelfProps {
  book: Book;
}

const { book } = defineProps<CardShelfProps>();
</script>

<template>
  <div
    :class="
      clsx(
        'group snap-center flex flex-col',
        isHomePage ? 'min-w-[200px] max-w-[200px]' : 'w-full'
      )
    "
  >
    <router-link :to="`/book/${book.id}`" class="w-full">
      <img
        :src="book.cover || './no_cover.png'"
        :alt="book.title"
        :class="
          clsx('w-full mb-3 object-cover w-full', {
            'h-[285px]': isHomePage,
            'aspect-[1/1.4]': !isHomePage,
          })
        "
      />
    </router-link>
    <div class="flex justify-between items-center">
      <router-link
        :to="`/book/${book.id}`"
        class="w-2/3 line-clamp-2 font-semibold flex-0 text-primary"
      >
        {{ book.title }}
      </router-link>
      <div
        :class="
          clsx(
            ' w-1/3 justify-end h-auto flex md:invisible group-hover:visible relative',
            {
              '!visible': menuOpened || isMobile(),
            }
          )
        "
      >
        <!-- Menu trigger -->
        <VBtn
          variant="plain"
          class="rounded-full !min-w-0 !w-10 !h-10"
          color="primary"
          :id="`menu-card-shelf-${book.id}`"
        >
          <VIcon icon="mdi-dots-horizontal" />
        </VBtn>
        <VBottomSheet
          v-if="isMobile()"
          :activator="`#menu-card-shelf-${book.id}`"
        >
          <VCard>
            <VList dense>
              <VListItem @click="moveModalHandlers.open">
                <VIcon icon="mdi-swap-vertical" color="primary" />
                Move to shelf
              </VListItem>
              <VListItem @click="removeModalHandlers.open">
                <VIcon icon="mdi-delete" color="error" />
                Delete
              </VListItem>
            </VList>
          </VCard>
        </VBottomSheet>

        <VMenu
          v-else
          :activator="`#menu-card-shelf-${book.id}`"
          v-model="menuOpened"
        >
          <VList dense>
            <VListItem @click="moveModalHandlers.open">
              <VIcon icon="mdi-swap-vertical" color="primary" class="mr-2" />
              Move to shelf
            </VListItem>
            <VListItem @click="removeModalHandlers.open">
              <VIcon icon="mdi-delete" color="error" class="mr-2" />
              Delete
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </div>

    <!-- Modals -->
    <ModalRemoveBook
      :opened="removeModalHandlers.state.value"
      :handlers="removeModalHandlers"
      :bookId="book.id"
      :title="book.title"
    />
    <ModalAddToShelf
      :opened="moveModalHandlers.state.value"
      :handlers="moveModalHandlers"
      action="MOVE"
      :bookId="book.id"
      :title="book.title"
    />
  </div>
</template>

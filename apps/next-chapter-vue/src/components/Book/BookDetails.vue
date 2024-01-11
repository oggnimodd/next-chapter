<script setup lang="ts">
import { ModalAddToShelf, ModalRemoveBook } from '../Modal';
import { useDisclosure, useBooksDetails } from '@/composables';
import DOMPurify from 'dompurify';
import { useRouter } from 'vue-router';


const router = useRouter();
const params = router.currentRoute.value.params;
const id = params.id as string;

const { data, isLoading, isError, shelf } = useBooksDetails();


const removeModalHandlers = useDisclosure(false);
const moveModalHandlers = useDisclosure(false);

</script>

<template>
  <div v-if="!isLoading && !isError && data" class="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-4">
    <div class="sm:col-span-1">
      <img class="object-cover w-full" :src="data.volumeInfo.imageLinks?.thumbnail || '/no_cover.png'"
        :alt="data.volumeInfo.title" />
    </div>

    <div class="flex flex-col sm:col-span-3 gap-y-2">
      <div class="self-end flex gap-x-3">
        <VBtn @click="moveModalHandlers.open" color="primary" size="small">
          <VIcon icon="mdi-swap-vertical" />
          Move To Shelf
        </VBtn>

        <VBtn @click="removeModalHandlers.open" color="error" size="small">
          <VIcon icon="mdi-delete" />
          Delete
        </VBtn>
      </div>

      <div>
        <h2 class="text-primary-main font-bold text-xl mb-1">
          Shelf
        </h2>

        <router-link :to="`/shelf/${shelf?.id}`">
          {{ shelf?.type || "No shelf" }}
        </router-link>
      </div>

      <div>
        <h2 class="text-primary-main font-bold text-xl mb-1">
          Author
        </h2>

        <p>
          {{ data?.volumeInfo.authors?.join(", ") }}
        </p>
      </div>

      <div>
        <h2 class="text-primary-main font-bold text-xl mb-1">
          Page
        </h2>

        <p>
          {{ data?.volumeInfo.pageCount }}
        </p>
      </div>

      <div>
        <h2 class="text-primary-main font-bold text-xl mb-1">
          Description
        </h2>

        <p>
          {{ DOMPurify.sanitize(data?.volumeInfo.description || "") }}
        </p>
      </div>
    </div>
    <ModalRemoveBook :opened="removeModalHandlers.state.value" :handlers="removeModalHandlers" :bookId="id"
      :title="data.volumeInfo.title" />
    <ModalAddToShelf :opened="moveModalHandlers.state.value" :handlers="moveModalHandlers" action="MOVE" :bookId="id"
      :title="data.volumeInfo.title" />
  </div>
</template>
<script setup lang="ts">
import { BaseLayout } from '@/layouts';
import { useRouteMatch, useBooksDetails } from '@/composables';
import { BookReview, BookDetails, BookNotes } from "@/components"
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const params = router.currentRoute.value.params;
const id = params.id as string;

const tabs = [
  { label: 'Details', to: { path: `/book/${id}/details` }, value: '/book/:id/details', component: BookDetails },
  { label: 'Notes', to: { path: `/book/${id}/notes` }, value: '/book/:id/notes', component: BookNotes },
  { label: 'Review', to: { path: `/book/${id}/review` }, value: '/book/:id/review', component: BookReview },
];

const currentTab = useRouteMatch(tabs.map(({ value }) => value));
const currentTabIndex = ref(tabs.findIndex(({ value }) => currentTab.value === value));
const { isError, isLoading, data: googleBooksDetails } = useBooksDetails();
</script>


<template>
  <BaseLayout>
    <p v-if="isLoading">Loading...</p>
    <p v-if="isError">Error</p>

    <div v-if="!isLoading && !isError">
      <div className="flex flex-col relative">
        <h1 className="text-2xl text-primary py-5">
          {{ googleBooksDetails?.volumeInfo?.title || "" }}
        </h1>
        <div className="sticky top-0 bg-background-default z-50">
          <VTabs v-model="currentTabIndex">
            <VTab v-for="tab in tabs" :key="tab.value" :to="tab.to">{{ tab.label }}</VTab>
          </VTabs>
        </div>

        <div className="mt-4">
          <div v-for="tab in tabs" :key="tab.value">
            <component v-if="currentTabIndex === tabs.indexOf(tab)" :is="tab.component" />
          </div>
        </div>

      </div>

    </div>
  </BaseLayout>
</template>  

<template>
  <VCard class="w-full flex flex-col min-w-[200px] max-w-[200px]">
    <div class="flex flex-col items-center justify-center h-[285px]">
      <h2 class="font-semibold text-primary-main text-lg text-center">
        This shelf is empty
      </h2>

      <VBtn
        size="small"
        variant="outlined"
        color="primary"
        class="mt-4 mx-auto items-center"
        :to="'/search'"
        small
      >
        <VIcon icon="mdi-plus" fontSize="small" />
        Add new book
      </VBtn>
    </div>
  </VCard>
</template>

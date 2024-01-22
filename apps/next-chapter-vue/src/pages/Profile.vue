<script setup lang="ts">
import { BaseLayout } from "@/layouts";
import { useUser } from "vue-clerk";

const { isLoaded, user } = useUser();
</script>

<template>
  <BaseLayout>
    <div v-if="!isLoaded">
      <p>Loading...</p>
    </div>
    <div
      v-if="isLoaded && user"
      class="flex items-center flex-col py-4 gap-y-4"
    >
      <VAvatar
        v-if="user.imageUrl"
        class="w-32 h-32"
        :image="user.imageUrl"
        alt="Avatar"
      />
      <p>{{ user?.emailAddresses[0]?.emailAddress }}</p>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useAuth } from "vue-clerk";
import { SignInButton, SignOutButton } from "vue-clerk";
import { useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient();

const { isLoaded, userId } = useAuth();

watch(userId, () => {
  queryClient.invalidateQueries({
    queryKey: ["message"],
  });
});
</script>

<template>
  <div v-if="isLoaded && !userId">
    <p>You need to sign in my dude</p>
    <SignInButton />
  </div>

  <div v-if="isLoaded && userId">
    <div>
      <p>You can click this button if you want to logout</p>
      <SignOutButton>Logout</SignOutButton>
    </div>
  </div>
</template>

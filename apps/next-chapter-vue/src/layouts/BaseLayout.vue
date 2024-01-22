<script setup lang="ts">
import { Header } from "@/components";
import { onMounted } from "vue";
import { watch } from "vue";
import { useAuth, useClerk } from "vue-clerk";
import { useRouter } from "vue-router";
import { appearance } from "@/clerk";
import { useScrollToTop } from "@/composables";

const { scrollToTop } = useScrollToTop();

interface Props {
  requireAuth?: boolean;
  unauthenticatedOnly?: boolean;
}
const { openSignIn } = useClerk();
const { isLoaded, isSignedIn } = useAuth();

const router = useRouter();

const { requireAuth, unauthenticatedOnly } = withDefaults(
  defineProps<Props>(),
  {
    requireAuth: true,
    unauthenticatedOnly: false,
  }
);

const checkAuth = async () => {
  // If the user is signed in and the page is only for unauthenticated users redirect to dashboard
  if (isLoaded.value && unauthenticatedOnly && isSignedIn.value) {
    await router.push("/dashboard");
  }

  // If the user is not signed in and the page requires authentication
  else if (
    isLoaded.value &&
    requireAuth &&
    !isSignedIn.value &&
    !unauthenticatedOnly
  ) {
    await router.push("/");
    await openSignIn({
      redirectUrl: "dashboard",
      appearance,
    });
  }
};

watch(isLoaded, async () => {
  await checkAuth();
});

watch(isSignedIn, async (newValue, oldValue) => {
  // If the user logged out
  if (oldValue && !newValue) {
    await router.push("/");
  }
});

onMounted(async () => {
  await checkAuth();
});
</script>

<template>
  <VApp>
    <Header />

    <VBtn
      color="primary"
      class="fixed bottom-4 right-4 !min-w-0 w-12 h-12 rounded-full shadow-md z-50"
      @click="scrollToTop"
    >
      <VIcon size="x-large" color="white" icon="mdi-chevron-up" />
    </VBtn>

    <VMain>
      <VContainer class="w-full py-4 px-6 container mx-auto">
        <div
          v-if="!isLoaded"
          class="flex flex-col items-center justify-center items-center py-10"
        >
          <p>Loading...</p>
        </div>

        <!-- If authentication is not needed or if user is signed in render the children -->
        <slot v-else-if="!requireAuth || isSignedIn || unauthenticatedOnly">
          Fallback layout
        </slot>
      </VContainer>
    </VMain>
  </VApp>
</template>

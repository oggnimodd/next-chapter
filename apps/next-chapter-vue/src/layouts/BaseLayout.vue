<script setup lang="ts">
import { Header } from "@/components";
import { onMounted } from "vue";
import { watch } from "vue";
import { useAuth, useClerk } from "vue-clerk";
import { useRoute, useRouter } from "vue-router";
import { appearance } from "@/clerk";
import { useScrollToTop } from "@/composables";

const { scrollToTop } = useScrollToTop();

interface Props {
  requireAuth?: boolean;
}
const { openSignIn } = useClerk();
const { isLoaded, isSignedIn } = useAuth();

const { path } = useRoute();
const router = useRouter();

const { requireAuth } = withDefaults(defineProps<Props>(), {
  requireAuth: true,
});

const checkAuth = async () => {
  if (isLoaded.value && requireAuth && !isSignedIn.value) {
    await router.push("/");
    await openSignIn({
      redirectUrl: path,
      appearance,
    });
  }
};

watch(isLoaded, async () => {
  await checkAuth();
});

watch(isSignedIn, async (newValue, oldValue) => {
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
          v-if="requireAuth && !isLoaded"
          class="flex flex-col items-center justify-center items-center py-10"
        >
          <p>Loading...</p>
        </div>

        <!-- If authentication is not needed or if user is signed in render the children -->
        <slot v-else-if="!requireAuth || (isLoaded && isSignedIn)">
          Fallback layout
        </slot>
      </VContainer>
    </VMain>
  </VApp>
</template>

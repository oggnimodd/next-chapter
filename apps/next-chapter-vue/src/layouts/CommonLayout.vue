<script setup lang="ts">
import { onMounted } from "vue";
import { watch } from "vue";
import { useAuth, useClerk } from "vue-clerk";
import { useRoute, useRouter } from "vue-router";
import { appearance } from "@/clerk";

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
  <div>
    <div class="container max-w-4xl mx-auto">
      <div
        v-if="requireAuth && !isLoaded"
        class="flex flex-col items-center justify-center items-center py-10"
      >
        <p>Loading...</p>
      </div>
      <slot v-else-if="!requireAuth || (isLoaded && isSignedIn)">
        Fallback layout
      </slot>
    </div>
  </div>
</template>

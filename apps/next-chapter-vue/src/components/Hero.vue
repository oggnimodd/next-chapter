<script setup lang="ts">
import { useClerk } from "vue-clerk";
import { appearance } from "@/clerk";

const { openSignIn } = useClerk();
</script>

<template>
  <div className="grid md:grid-cols-2 gap-5 md:gap-20 py-8">
    <div className="w-full flex items-center md:min-h-[500px]">
      <img className="w-full md:w-11/12" src="/hero.png" alt="hero" />
    </div>

    <div className="flex flex-col justify-center gap-4 md:pl-4">
      <h1 className="text-3xl md:text-5xl font-bold text-primary">
        Next Chapter
      </h1>
      <p className="text-xl">
        The Minimalist Book Tracking App for Bookworms
      </p>
      <div className="flex gap-3 md:gap-2 flex-wrap">

        <VBtn class="items-center w-full md:w-auto" variant="outlined" color="primary" target="_blank"
          href="https://github.com/oggnimodd/next-chapter">
          <VIcon class="mr-2" icon="mdi-github" />
          Source Code
        </VBtn>
        <VBtn class="items-center w-full md:w-auto" :onClick="() => openSignIn({ appearance, redirectUrl: ' /dashboard' })"
          variant="elevated" color="primary">
          <VIcon class="mr-2" icon="mdi-arrow-right" />
          Get Started
        </VBtn>
      </div>
    </div>
  </div>
</template>
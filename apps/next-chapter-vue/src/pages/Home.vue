<script setup lang="ts">
import { CommonLayout } from "@/layouts";
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>

<template>
  <CommonLayout :require-auth="false">
    <div>
      <p class="text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolor.
      </p>
      <v-btn size="small" @click="toggleTheme" color="primary"> Button </v-btn>
    </div>
  </CommonLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUser, useAuth, useClerk } from "vue-clerk";
import { VBtn, VList } from "vuetify/components";
import { useDarkMode } from "@/composables";
import { appearance } from "@/clerk"

// Auth
const { signOut } = useAuth();
const { openSignIn } = useClerk();
const { isLoaded, isSignedIn, user } = useUser();

// Menu
const menu = ref(false);

// Theme
const { isDark, toggleTheme } = useDarkMode();
</script>

<template>
  <VAppBar color="primary">
    <VToolbar color="primary" class="container mx-auto py-4 px-6">
      <router-link :to="isSignedIn ? '/dashboard' : '/'">
        <h1 class="text-pui font-bold text-2xl text-white dark:text-primary">
          Logo
        </h1>
      </router-link>
      <div class="ml-auto flex gap-x-2 items-center">
        <router-link to="/search">
          <VBtn icon="mdi-magnify" />
        </router-link>

        <VBtn @click="toggleTheme" :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />

        <VBtn variant="text" class="text-white" v-if="isLoaded && !isSignedIn"
          @click="() => openSignIn({ appearance, redirectUrl: '/dashboard' })">
          Login
        </VBtn>

        <VMenu v-if="isSignedIn && isLoaded" v-model="menu">
          <template v-slot:activator="{ props }">
            <VAvatar @click="menu = !menu" v-bind="props" role="button" class="w-10 h-10"
              aria-label="account of current user" :image="user?.imageUrl" />
          </template>

          <VList>
            <router-link to="/">
              <VListItem>
                <VListItemTitle>
                  <VIcon icon="mdi-home" class="mr-3" />
                  Dashboard
                </VListItemTitle>
              </VListItem>
            </router-link>

            <router-link to="/profile">
              <VListItem>
                <VListItemTitle>
                  <VIcon icon="mdi-account" class="mr-3" />
                  Profile
                </VListItemTitle>
              </VListItem>
            </router-link>

            <router-link to="/search">
              <VListItem>
                <VListItemTitle>
                  <VIcon icon="mdi-magnify" class="mr-3" />
                  Search Books
                </VListItemTitle>
              </VListItem>
            </router-link>

            <VListItem @click="signOut">
              <VListItemTitle class="text-red">
                <VIcon color="red" icon="mdi-logout" class="mr-3" />
                Sign Out
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </VToolbar>
  </VAppBar>
</template>

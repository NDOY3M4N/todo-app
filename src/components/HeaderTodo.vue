<template>
  <header class="relative h-72">
    <picture v-if="isLightTheme">
      <source media="(min-width: 640px)" srcset="../assets/images/bg-desktop-light.jpg" />
      <img class="absolute inset-0 object-cover w-full h-full" src="../assets/images/bg-mobile-light.jpg" alt="Hero background">
    </picture>
    <picture v-else>
      <source media="(min-width: 640px)" srcset="../assets/images/bg-desktop-dark.jpg" />
      <img class="absolute inset-0 object-cover w-full h-full" src="../assets/images/bg-mobile-dark.jpg" alt="Hero background">
    </picture>
    <div class="relative flex items-center justify-between max-w-2xl px-6 mx-auto mt-20">
      <div class="text-4xl font-bold tracking-widest text-white">TODO</div>
      <button
        aria-label="Change theme"
        class="p-2 border border-transparent rounded-md focus:outline-none focus:border-blue-500"
        @click="changeTheme(!isLightTheme)">
        <IconSun v-if="!isLightTheme" />
        <IconMoon v-else />
      </button>
    </div>
  </header>
</template>

<script>
import IconSun from "../assets/icons/icon-sun.svg"
import IconMoon from "../assets/icons/icon-moon.svg"

import { computed } from "vue"
import { useStore } from "vuex"

export default {
  name: 'headerTodo',
  props: ['isLightTheme'],
  components: { IconSun, IconMoon },
  setup() {
    const store = useStore()
    const changeTheme = (theme) => {
      store.dispatch('changeTheme', theme)
    }

    return {
      isLightTheme: computed(() => store.state.isLightTheme),
      changeTheme
    }
  }
}
</script>

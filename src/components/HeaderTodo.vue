<template>
  <header class="relative h-72">
    <picture>
      <source
        v-if="isLightTheme"
        media="(min-width: 640px)"
        srcset="../assets/images/bg-desktop-light.jpg">
      <source
        v-else
        media="(min-width: 640px)"
        srcset="../assets/images/bg-desktop-dark.jpg">
      <img
        v-if="isLightTheme"
        class="absolute inset-0 object-cover w-full h-full"
        alt="Hero background"
        src="../assets/images/bg-mobile-light.jpg">
      <img
        v-else
        class="absolute inset-0 object-cover w-full h-full"
        alt="Hero background"
        src="../assets/images/bg-mobile-dark.jpg">
    </picture>
    <div class="relative flex items-center justify-between max-w-2xl px-6 mx-auto mt-20">
      <div class="text-4xl font-bold tracking-widest text-white">TODO</div>
      <button
        aria-label="Change theme"
        class="p-2 border border-transparent rounded-md focus:outline-none focus:border-blue-500"
        @click="changeTheme(!isLightTheme)">
        <transition mode="out-in"
          enter-active-class="transform transition duration-200 ease-in"
          enter-from-class="opacity-0 scale-50"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transform transition duration-200 ease-out"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-50"
        >
          <component :is="isLightTheme ? 'IconSun' : 'IconMoon'"></component>
        </transition>
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
  name: 'HeaderTodo',
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

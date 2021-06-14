<template>
  <div class="flex flex-col min-h-screen bg-skin-primary pb-10" :class="{ 'light-theme': isLightTheme }">
    <HeaderTodo />
    <main class="flex-1">
      <div class="relative z-10 max-w-2xl px-6 mx-auto -mt-32">
        <div class="pl-8 bg-skin-secondary text-skin-base rounded-md overflow-hidden flex items-center">
          <TodoAdd />
        </div>
        <div class="mt-5 overflow-hidden rounded-md bg-skin-secondary">
          <TodoList />

          <div class="flex items-center justify-between px-8 py-5 border-t border-muted">
            <TodoRemain />
            <TodoFilter class="hidden sm:flex" />
            <TodoClear />
          </div>
        </div>

        <TodoFilter class="flex py-5 mt-5 bg-skin-secondary rounded-md space-x-8 sm:hidden" />

        <div class="flex flex-col items-center justify-center mt-10">
          <span class="text-skin-muted-100">Drag and drop to reorder list</span>
          <div class="text-skin-muted-100 text-center mt-4">
            Challenge by <a class="text-skin-base underline" href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
            Coded by <a class="text-skin-base underline" href="https://github.com/NDOY3M4N/">NDOY3M4N</a>.
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderTodo from "./components/HeaderTodo.vue"
import TodoAdd from "./components/TodoAdd.vue"
import TodoList from "./components/TodoList.vue"
import TodoFilter from "./components/TodoFilter.vue"
import TodoRemain from './components/TodoRemain.vue'
import TodoClear from './components/TodoClear.vue'

import { computed } from "vue"
import { useStore } from "vuex"

export default {
  components: { HeaderTodo, TodoAdd, TodoList, TodoFilter, TodoClear, TodoRemain },
  setup() {
    return {
      isLightTheme: computed(() => useStore().state.isLightTheme)
    }
  }
}
</script>

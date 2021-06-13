<template>
  <ul
    v-if="todos.length > 0"
    class="divide-y divide-skin-base"
    :class="{ 'overflow-y-scroll scrollbar h-64': todos.length > 4 }">
    <transition-group
      enter-active-class="transition transform duration-300 ease-in"
      enter-from-class="opacity-0 -translate-x-3"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition transform duration-300 ease-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-3">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="px-8 py-5 flex items-center justify-between group">
          <div class="flex items-center">
            <input
              type="checkbox"
              :id="todo.name"
              v-model="todo.completed"
              :class="{ 'custom-check': todo.completed }"
              class="w-6 h-6 bg-transparent rounded-full border-muted hover:border-blue-600" />
            <label
              :for="todo.name"
              :class="{ 'line-through text-skin-muted-100': todo.completed }"
              class="ml-4 text-md text-skin-base">{{todo.name}}</label>
          </div>
        <button
            class="hidden ring-blue-500 ring-offset-8 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 group-hover:block"
            @click="removeTodo(todo.id)">
            <IconCross />
        </button>
      </li>
    </transition-group>
  </ul>
  <div v-else class="flex items-center justify-center py-5">
    <span class="font-bold text-skin-muted-100">No todos</span>
  </div>
</template>

<script>
import IconCross from "../assets/icons/icon-cross.svg"

import { useStore } from "vuex"
import { computed } from "vue"

export default {
  name: 'TodoList',
  components: { IconCross },
  setup() {
    const store = useStore()

    const removeTodo = (id) => {
      store.dispatch("removeTodo", id)
    }

    return {
      todos: computed(() => store.state.todos),
      filteredTodos: computed(() => store.getters.filteredTodos),
      remainingTodos: computed(() => store.getters.remainingTodos),
      removeTodo
    }
  }
}
</script>


<style scoped>
.custom-check {
  background-image:
    url("../assets/icons/icon-check.svg"),
    linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}
</style>

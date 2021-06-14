<template>
  <draggable
    tag="ul"
    v-model="filteredTodos"
    :sort="true"
    handle=".handle"
    v-if="filteredTodos.length > 0"
    class="divide-y divide-skin-base"
    :class="{ 'overflow-y-scroll scrollbar h-64': filteredTodos.length > 4 }">
    <transition-group name="flip-list"
      enter-active-class="transition transform duration-300 ease-in"
      enter-from-class="opacity-0 -translate-x-3"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition transform duration-300 ease-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-3">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="px-8 py-5 bg-skin-secondary rounded-md flex items-center justify-between group">
        <div class="flex-1 flex items-center space-x-4">
          <div class="handle cursor-move">
           <IconHandle class="w-6 h-6 text-skin-muted-100" />
          </div>
          <input
            type="checkbox"
            :id="todo.name"
            v-model="todo.completed"
            :class="{ 'custom-check': todo.completed }"
            class="w-6 h-6 bg-transparent rounded-full border-muted hover:border-blue-600" />
            <label
              :for="todo.name"
              :class="{ 'line-through text-skin-muted-100': todo.completed }"
              class="text-md text-skin-base cursor-pointer">{{todo.name}}</label>
        </div>
        <button
          aria-label="Remove Todo"
          class="hidden ring-blue-500 ring-offset-8 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 group-hover:block"
          @click="removeTodo(todo.id)">
          <IconCross />
        </button>
      </li>
    </transition-group>
  </draggable>

  <div v-else class="flex items-center justify-center py-5">
    <span class="font-bold text-skin-muted-100">No todos</span>
  </div>
</template>

<script>
import IconCross from "../assets/icons/icon-cross.svg"
import IconHandle from "../assets/icons/icon-handle.svg"
import { VueDraggableNext } from 'vue-draggable-next'

import { useStore } from "vuex"
import { computed, defineComponent } from "vue"

export default defineComponent({
  name: 'TodoList',
  components: { IconCross, IconHandle, draggable: VueDraggableNext },
  setup() {
    const store = useStore()

    const removeTodo = (id) => {
      store.dispatch("removeTodo", id)
    }

    const filteredTodos = computed({
      get: () => store.getters.filteredTodos,
      set: val => store.dispatch('updateTodos', val)
    })

    return {
      filteredTodos,
      remainingTodos: computed(() => store.getters.remainingTodos),
      removeTodo,
    }
  },
})
</script>

<style scoped>
.custom-check {
  background-image:
    url("../assets/icons/icon-check.svg"),
    linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>

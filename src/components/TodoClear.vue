<template>
  <button
    @click="removeCompletedTodos"
    class="text-skin-muted-100 ring-blue-500 ring-offset-8 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 hover:text-skin-hover">
    Clear completed
  </button>
</template>

<script>
import { useStore } from "vuex"

export default {
  name: 'TodoClear',
  setup() {
    const store = useStore()

    return { removeCompletedTodos: () => store.dispatch('removeCompletedTodos') }
  }
}
</script>

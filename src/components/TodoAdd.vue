<template>
  <input
    type="checkbox"
    name="checkAll"
    @change="checkAll"
    :checked="allChecked"
    :class="{ 'custom-check': allChecked }"
    class="w-6 h-6 bg-transparent rounded-full border-muted hover:border-blue-600" >
  <input
    @keydown.enter="addTodo"
    v-model="newTodo"
    type="text" id="newTodo" placeholder="Create a new todo..."
    class="py-5 ml-4 w-full border-none bg-skin-secondary focus:ring-0">
</template>

<script>
import { useStore } from "vuex"
import { ref, computed } from "vue"

export default {
  name: 'TodoAdd',
  setup() {
    const store = useStore()
    const newTodo = ref("")

    const addTodo = () => {
      if (newTodo.value.trim().length === 0) return

      const todo = {
        id: store.state.todos.length + 1,
        name: newTodo.value,
        completed: false,
      }

      store.dispatch("addTodo", todo)
      newTodo.value = ""
    }

    const checkAll = (evt) => {
      store.dispatch('checkAllTodos', evt.target.checked)
    }

    return {
      newTodo,
      addTodo,
      allChecked: computed(() => store.getters.allChecked),
      checkAll
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

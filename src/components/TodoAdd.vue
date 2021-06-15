<template>
  <input
    type="checkbox" id="checkAll"
    @change="checkAll"
    :checked="allChecked"
    :class="{ 'custom-check': allChecked }"
    class="w-6 h-6 bg-transparent rounded-full border-muted hover:border-blue-600" >
  <label for="checkAll" class="sr-only">Check all Todos</label>
  <input
    @keydown.enter="addTodo"
    v-model="newTodo"
    type="text" id="newTodo" placeholder="Create a new todo..."
    :disabled="isInvalid"
    class="py-5 ml-4 w-full border-none bg-skin-secondary focus:ring-0 disabled:cursor-not-allowed">

  <!-- Error Notification -->
  <teleport to="body">
    <transition
      enter-active-class="transform transition duration-300 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transform transition duration-300 ease-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
      >
      <div v-show="isInvalid" class="absolute top-0 inset-x-0 mt-5 mx-auto px-6 max-w-2xl">
        <div class="px-4 py-2 flex items-center bg-red-300 rounded-md shadow-md">
          <IconExclamation class="w-5 h-5 text-red-800" />
          <p class="ml-2 text-sm text-red-800">{{ errorMsgToDisplay }}</p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { useStore } from "vuex"
import { ref, computed } from "vue"

import IconExclamation from "../assets/icons/icon-exclamation.svg"

export default {
  name: 'TodoAdd',
  components: { IconExclamation },
  setup() {
    const store = useStore()
    const newTodo = ref("")
    const isInvalid = ref(false)
    const errors = ref([
      { type: 'empty', msg: 'No empty todos allowed' },
      { type: 'maxChar', msg: 'A todo should be less than 26 characters' },
      { type: 'duplicate', msg: 'This todo already exists' }
    ])
    const errorMsgToDisplay = ref("")

    const displayError = (errorType) => {
      isInvalid.value = true
      errorMsgToDisplay.value = (errors.value.find(error => error.type === errorType)).msg
      setTimeout(() => {
        errorMsgToDisplay.value = ""
        isInvalid.value = false
      } , 4000)
    }

    const addTodo = () => {
      if (newTodo.value.trim().length === 0) {
        displayError('empty')
        return
      }


      if (newTodo.value.trim().length > 26) {
        displayError('maxChar')
        return
      }

      const todoExist = store.state.todos.find((todo) => todo.name === newTodo.value)
      if(todoExist) {
        displayError('duplicate')
        newTodo.value = ""
        return
      }

      const todo = {
        id: store.state.todos.length + 1,
        name: newTodo.value,
        completed: false,
      }

      store.dispatch("addTodo", todo)
      newTodo.value = ""
    }

    return {
      newTodo,
      isInvalid,
      errorMsgToDisplay,
      addTodo,
      allChecked: computed(() => store.getters.allChecked),
      checkAll: evt => store.dispatch('checkAllTodos', evt.target.checked)
    }
  }

}
</script>

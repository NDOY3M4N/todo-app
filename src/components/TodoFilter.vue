<template>
  <div class="items-center justify-center space-x-8">
    <button
      @click="filterTodos('all')"
      :class="[filter === 'all' ? 'text-accent' : 'text-skin-muted-100']"
      class="font-bold ring-blue-500 ring-offset-4 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 hover:text-skin-hover">
        All
    </button>
    <button
      @click="filterTodos('active')"
      :class="[filter === 'active' ? 'text-accent' : 'text-skin-muted-100']"
      class="font-bold ring-blue-500 ring-offset-4 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 hover:text-skin-hover">
        Active
    </button>
    <button
      @click="filterTodos('completed')"
      :class="[filter === 'completed' ? 'text-accent' : 'text-skin-muted-100']"
      class="font-bold ring-blue-500 ring-offset-4 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 hover:text-skin-hover">
        Completed
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed } from "vue"

export default {
  name: 'TodoFilter',
  setup() {
    const store = useStore()

    const filterTodos = (newFilter) => {
      store.dispatch('filterTodos', newFilter)
    }

    return {
      filterTodos,
      filter: computed(() => store.state.filter)
    }
  }
}
</script>

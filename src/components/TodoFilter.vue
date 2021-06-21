<template>
  <div class="items-center justify-center space-x-8">
    <button
      v-for="item in filters" :key="item"
      @click="filterTodos(item.toLowerCase())"
      :class="[filter === item.toLowerCase() ? 'text-accent' : 'text-skin-muted-100']"
      class="font-bold ring-blue-500 ring-offset-4 ring-offset-secondary rounded-sm focus:outline-none focus:ring-2 hover:text-skin-hover">
        {{ item }}
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed, ref } from "vue"

export default {
  name: 'TodoFilter',
  setup() {
    const store = useStore()
    const filters = ref(['All', 'Active', 'Completed'])

    return {
      filterTodos: (newFilter) => store.dispatch('filterTodos', newFilter),
      filter: computed(() => store.state.filter),
      filters
    }
  }
}
</script>

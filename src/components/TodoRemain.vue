<template>
  <div class="text-skin-muted-100">{{remainingTodos}} items left</div>
</template>

<script>
import { useStore } from "vuex"
import { computed } from "vue"

export default {
    setup() {
        const store = useStore()

        return {
            remainingTodos: computed(() => store.getters.remainingTodos),
        }
    }
}
</script>
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      filter: 'all',
      isLightTheme: false,
      todos: [
        {
          id: '1',
          name: 'Learn React JS',
          completed: false,
        },
        {
          id: '2',
          name: 'Learn Vue JS',
          completed: true,
        },
      ],
    }
  },
  getters: {
    remainingTodos(state) {
      return state.todos.filter((todo) => !todo.completed).length
    },
    filteredTodos({todos, filter}) {
      if (filter === 'all') {
        return todos
      } else if (filter === 'active') {
        return todos.filter(todo => !todo.completed)
      } else if (filter === 'completed') {
        return todos.filter(todo => todo.completed)
      }
    },
    allChecked(state) {
      if (state.todos.length === 0) return false
      return state.todos.every((todo) => todo.completed === true)
    }
  },
  mutations: {
    changeTheme(state, payload) {
      state.isLightTheme = payload
    },
    addTodo(state, payload) {
      state.todos.unshift(payload)
    },
    removeTodo(state, payload) {
      state.todos.splice(payload, 1)
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    checkAllTodos(state, payload) {
      state.todos.forEach(todo => todo.completed = payload)
    },
    updateFilter(state, payload) {
      state.filter = payload
    }
  },
  actions: {
    changeTheme(ctx, theme) {
      ctx.commit('changeTheme', theme)
    },
    addTodo({ commit, state }, todoToAdd) {
      const todoExist = state.todos.find((todo) => todo.name === todoToAdd.name)

      if (!todoExist) commit('addTodo', todoToAdd)
    },
    removeTodo({ commit, state }, idTodoToRemove) {
      const indexToRemove = state.todos.findIndex((todo) => todo.id === idTodoToRemove)
      commit('removeTodo', indexToRemove)
    },
    removeCompletedTodos(ctx) {
      ctx.commit('clearCompleted')
    },
    checkAllTodos(ctx, checked) {
      ctx.commit('checkAllTodos', checked)
    },
    filterTodos(ctx, newFilter) {
      ctx.commit('updateFilter', newFilter)
    }
  },
})

export default store

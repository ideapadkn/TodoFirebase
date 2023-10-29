<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '@/firebase'

const todosCollectionRef = collection(db, 'todos')
const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc'))

const todos = ref([])
const newContent = ref('')

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})
// ADD TODo
const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newContent.value,
    done: false,
    date: Date.now()
  })
  newContent.value = ''
}
// REMOVE TASK
const removeTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}
// MARK TASK
const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  });
}
</script>

<template>
  <div class="badass-todo">
    <div class="title has-text-centered">
      Idepad Todo
    </div>
    <form @submit.prevent>
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newContent" class="input" type="text" placeholder="Add a todo">
        </p>
        <p class="control">
          <button :disabled="!newContent" @click="addTodo" class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>
    <div v-if="todos.length" class="card mb-5" v-for="todo in todos" :key="todo.id"
      :class="{ 'has-background-success-light': todo.done }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div contenteditable="on" class="column" :class="{ 'has-text-success line-through': todo.done }">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button @click="toggleDone(todo.id)" :class="todo.done ? 'is-success' : 'is-light'" class="button">
                &check;
              </button>
              <button @click="removeTodo(todo.id)" class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-else>
      Loading
    </div>
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';

.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
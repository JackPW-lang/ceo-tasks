<template>
  <div id="app">
    <!-- Show auth screen until correct answer is given -->
    <div v-if="!authenticated" class="auth">
      <h2>{{ question }}</h2>
      <!-- Enter key submits the answer, no need for separate button. -->
      <input
        v-model="answer"
        @keyup.enter="login"
        placeholder="Type your answer..."
        autofocus
      />
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- Once authenticated, show the task manager -->
    <div v-else class="tasks">
      <!-- Enter key adds the task instantly -->
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Enter a task and hit Enter..."
        autofocus
      />
      <ul>
        <!-- _id comes from mongodb, and is used as the unique key for vue's rendering. -->
        <li v-for="task in tasks" :key="task._id">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task._id)"
          />
          <!-- Task remains visible even after completed (uses strikethrough to appear crossed out). -->
          <span :class="{ done: task.completed }">{{ task.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API = 'http://localhost:3000'; // Base URL for all API calls

export default {
  data() {
    return {
      // Auth state held client side only, no session or token needed for a single user app
      authenticated: false,
      question: 'When do you want it?',
      answer: '',
      error: '',
      tasks: [],
      newTask: '',
    };
  },
  methods: {
    async login() {
      try {
        await axios.post(`${API}/auth`, { answer: this.answer });
        this.authenticated = true;
        this.loadTasks(); // Load tasks immediately after auth so the list is ready
      } catch {
        this.error = 'Wrong answer. Try Again...';
      }
    },
    async loadTasks() { // Fetch all tasks, both complete and incomplete
      const res = await axios.get(`${API}/tasks`);
      this.tasks = res.data;
    },
    async addTask() {
      // Ignore empty or whitespaces-only submissions
      if (!this.newTask.trim()) return;
      await axios.post(`${API}/tasks`, { title: this.newTask });
      // Clear input and reload; input autofocuses to allow for rapid successive entry
      this.newTask = '';
      this.loadTasks();
    },
    async toggleTask(id) { // PATCH with just the ID; server handles the toggle logic.
      await axios.patch(`${API}/tasks/${id}/toggle`);
      this.loadTasks();
    },
  },
};
</script>

<style>
body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
input[type="text"], input:not([type="checkbox"]) { width: 100%; padding: 10px; font-size: 16px; margin-bottom: 10px; box-sizing: border-box; }
ul { list-style: none; padding: 0; }
li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #eee; }
.done { text-decoration: line-through; color: #aaa; }
.error { color: red; }
</style>

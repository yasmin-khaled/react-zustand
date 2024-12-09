import { create } from 'zustand';
import useMessageStore from './useMessageStore'; //splitted stores

// Create a Zustand store for tasks, with actions to add, remove, toggle, and fetch tasks
const useTaskStore = create((set) => ({
  tasks: [],

  //Actions
  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] })); // Use set to update the state
  },
  removeTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter(task => task.id !== id) }));
  },
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task // Toggle completion status
      )
    }));
  },
  
  // Async action to fetch tasks from an API
  fetchTasks: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      
      set({ tasks: data.slice(0, 5) }); // Update the task list state
      useMessageStore.getState().setMessage('Tasks fetched successfully', 'success'); //use message store to log messages
    } catch (error) {
      console.error('Error fetching tasks:', error);
      useMessageStore.getState().setMessage('Error fetching tasks', 'error');
    }
  },
}));

export default useTaskStore;

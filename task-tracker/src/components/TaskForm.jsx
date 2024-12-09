import { useState } from 'react'; //import 'useState' hook from react
import useTaskStore from '../store/useTaskStore';

const TaskForm = () => {
  const [text, setText] = useState(''); //manage local text change
  const addTask = useTaskStore(state => state.addTask); //selector to get only the addTask action

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Date.now(), title: text, completed: false }); //Action call
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter task..." 
        className="p-2 mr-2 w-60 border rounded-md border-gray-300"
      />
      <button type="submit" className="p-2 rounded-md bg-green-500 text-white">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
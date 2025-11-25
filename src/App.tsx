import { useState, useEffect } from 'react';
import axios from 'axios';

type Todo = {
  id: number;
  task: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const API_URL = 'https://mycrudbackend22-production.up.railway.app';

  const fetchTodos = () => {
    axios.get(`${API_URL}/todos`).then((res) => setTodos(res.data));
  };

  const addTodo = () => {
    if (!task.trim()) return;
    axios.post(`${API_URL}/todos`, { task }).then(() => {
      setTask('');
      fetchTodos();
    });
  };

  const deleteTodo = (id: number) => {
    axios.delete(`${API_URL}/todos/${id}`).then(fetchTodos);
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.task);
  };

  const saveEdit = () => {
    if (!editText.trim() || editingId === null) return;
    axios.put(`${API_URL}/todos/${editingId}`, { task: editText }).then(() => {
      setEditingId(null);
      setEditText('');
      fetchTodos();
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #8298beff, #a257b1ff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '60px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        background: '#2ec2bdff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>📝 To-Do List</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '10px 16px',
              backgroundColor: '#4f9dfc',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              style={{
                background: '#f7f9fc',
                marginBottom: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              {editingId === todo.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{
                      flex: 1,
                      marginRight: '10px',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <button onClick={saveEdit} style={{ padding: '6px 12px' }}>Save</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{todo.task}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => startEdit(todo)} style={{ cursor: 'pointer' }}>✏️</button>
                    <button onClick={() => deleteTodo(todo.id)} style={{ cursor: 'pointer' }}>🗑️</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

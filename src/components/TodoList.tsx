import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Done';
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState<Todo['priority']>('Medium');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTodo,
          priority: newPriority,
          status: 'To Do'
        }
      ]);
      setNewTodo('');
      setNewPriority('Medium');
    }
  };

  const updateStatus = (id: number, newStatus: Todo['status']) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setNewTodo(todo.title);
    setNewPriority(todo.priority);
  };

  const saveEdit = () => {
    if (editingId && newTodo.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId
          ? { ...todo, title: newTodo, priority: newPriority }
          : todo
      ));
      setEditingId(null);
      setNewTodo('');
      setNewPriority('Medium');
    }
  };

  const getPriorityClass = (priority: Todo['priority']) => {
    switch (priority) {
      case 'High': return 'text-danger';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return '';
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title mb-0">Daftar Tugas</h2>
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={() => setEditingId(0)}
                >
                  <PlusCircle size={18} />
                  Tambah Tugas
                </button>
              </div>

              {(editingId !== null) && (
                <div className="mb-4 p-3 bg-light rounded">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Masukkan judul tugas"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as Todo['priority'])}
                    >
                      <option value="High">Prioritas Tinggi</option>
                      <option value="Medium">Prioritas Sedang</option>
                      <option value="Low">Prioritas Rendah</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={editingId === 0 ? addTodo : saveEdit}
                  >
                    {editingId === 0 ? 'Tambah Tugas' : 'Simpan Perubahan'}
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setEditingId(null);
                      setNewTodo('');
                      setNewPriority('Medium');
                    }}
                  >
                    Batal
                  </button>
                </div>
              )}

              <div className="list-group">
                {todos.map(todo => (
                  <div key={todo.id} className="list-group-item list-group-item-action">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">{todo.title}</h5>
                        <small className={`${getPriorityClass(todo.priority)}`}>
                          Prioritas {todo.priority === 'High' ? 'Tinggi' : todo.priority === 'Medium' ? 'Sedang' : 'Rendah'}
                        </small>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <select
                          className="form-select form-select-sm"
                          style={{ width: 'auto' }}
                          value={todo.status}
                          onChange={(e) => updateStatus(todo.id, e.target.value as Todo['status'])}
                        >
                          <option value="To Do">Belum Dikerjakan</option>
                          <option value="In Progress">Sedang Dikerjakan</option>
                          <option value="Done">Selesai</option>
                        </select>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => startEditing(todo)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
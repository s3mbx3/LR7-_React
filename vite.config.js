import { useState } from 'react'
import './App.css'

const STATUS_OPTIONS = [
  { value: 'completed', label: 'Задача выполнена', color: 'completed' },
  { value: 'active', label: 'Активная задача', color: 'active' },
  { value: 'cancelled', label: 'Задача отменена', color: 'cancelled' }
]

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Выполнить ЛР7',
      status: 'active',
      deadline: '2025-02-18'
    },
    {
      id: 2,
      description: 'Сдать курсач по БД',
      status: 'completed',
      deadline: '2026-02-27'
    },
    {
      id: 3,
      description: 'Найти работу',
      status: 'completed',
      deadline: '2026-02-27'
    }
  ])
  
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    status: 'active',
    deadline: ''
  })
  const [errors, setErrors] = useState({})
  const [editingCell, setEditingCell] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [statusDropdown, setStatusDropdown] = useState(null)

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return task.status === 'active'
    if (activeTab === 'completed') return task.status === 'completed' || task.status === 'cancelled'
    return true
  })

  const handleAddTask = () => {
    const newErrors = {}
    
    if (!formData.description.trim()) {
      newErrors.description = 'Необходимо указать описание'
    }
    if (!formData.status) {
      newErrors.status = 'Необходимо указать статус'
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Необходимо указать дедлайн'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newTask = {
      id: Date.now(),
      description: formData.description,
      status: formData.status,
      deadline: formData.deadline
    }

    setTasks([...tasks, newTask])
    setFormData({ description: '', status: 'active', deadline: '' })
    setErrors({})
    setIsModalOpen(false)
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleCellClick = (taskId, field, currentValue) => {
    if (field === 'status') {
      setStatusDropdown(taskId)
    } else {
      setEditingCell({ taskId, field })
      setEditValue(currentValue)
    }
  }

  const handleCellBlur = (taskId, field) => {
    if (editValue.trim() === '') {
      setEditingCell(null)
      return
    }

    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, [field]: editValue }
        : task
    ))
    setEditingCell(null)
  }

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    ))
    setStatusDropdown(null)
  }

  const isOverdue = (deadline) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    return deadlineDate < today
  }

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    return `${day}.${month}.${year}`
  }

  return (
    <div className="app">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Все задачи
        </button>
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Активные задачи
        </button>
        <button 
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Выполненные задачи
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Описание</th>
              <th>Статус</th>
              <th>Дедлайн</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>
                  {editingCell?.taskId === task.id && editingCell?.field === 'description' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleCellBlur(task.id, 'description')}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleCellBlur(task.id, 'description')
                      }}
                      autoFocus
                    />
                  ) : (
                    <div 
                      className="editable"
                      onClick={() => handleCellClick(task.id, 'description', task.description)}
                    >
                      {task.description}
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ position: 'relative' }}>
                    <span 
                      className={`status ${task.status}`}
                      onClick={() => handleCellClick(task.id, 'status', task.status)}
                    >
                      {STATUS_OPTIONS.find(s => s.value === task.status)?.label}
                    </span>
                    {statusDropdown === task.id && (
                      <div className="status-dropdown">
                        {STATUS_OPTIONS.map(option => (
                          <div
                            key={option.value}
                            className="status-option"
                            onClick={() => handleStatusChange(task.id, option.value)}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {editingCell?.taskId === task.id && editingCell?.field === 'deadline' ? (
                    <input
                      type="date"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleCellBlur(task.id, 'deadline')}
                      autoFocus
                    />
                  ) : (
                    <div 
                      className={`editable deadline ${isOverdue(task.deadline) ? 'overdue' : ''}`}
                      onClick={() => handleCellClick(task.id, 'deadline', task.deadline)}
                    >
                      {formatDate(task.deadline)}
                    </div>
                  )}
                </td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button 
          className="add-task-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Добавить задачу
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Добавить новую задачу</h2>
            
            <div className="form-group">
              <label>Описание</label>
              <input
                type="text"
                placeholder="Введите описание"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value })
                  setErrors({ ...errors, description: '' })
                }}
              />
              {errors.description && <div className="error">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label>Статус</label>
              <select
                value={formData.status}
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value })
                  setErrors({ ...errors, status: '' })
                }}
              >
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.status && <div className="error">{errors.status}</div>}
            </div>

            <div className="form-group">
              <label>Дедлайн</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => {
                  setFormData({ ...formData, deadline: e.target.value })
                  setErrors({ ...errors, deadline: '' })
                }}
              />
              {errors.deadline && <div className="error">{errors.deadline}</div>}
            </div>

            <button className="submit-btn" onClick={handleAddTask}>
              Добавить задачу
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

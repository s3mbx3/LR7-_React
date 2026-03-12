* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 20px;
  background-color: #f8d7da;
  padding: 15px 30px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
}

.tab {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  padding: 5px 10px;
  font-weight: normal;
}

.tab.active {
  font-weight: bold;
  text-decoration: underline;
}

/* Table */
.table-container {
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 15px;
  border-bottom: 2px solid #e0e0e0;
  font-weight: bold;
  color: #333;
}

td {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

tr:hover {
  background-color: #fafafa;
}

/* Status badges */
.status {
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
}

.status.completed {
  background-color: #d4edda;
  color: #155724;
}

.status.active {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

/* Delete button */
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #dc3545;
  padding: 5px;
}

.delete-btn:hover {
  opacity: 0.7;
}

/* Add button */
.add-task-btn {
  background-color: #f8d7da;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  color: #333;
}

.add-task-btn:hover {
  background-color: #f5c6cb;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  position: relative;
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 20px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
}

.error {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  background-color: #f8d7da;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  color: #333;
}

.submit-btn:hover {
  background-color: #f5c6cb;
}

/* Dropdown for status editing */
.status-dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 150px;
}

.status-option {
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
}

.status-option:hover {
  background-color: #f5f5f5;
}

/* Editable cell */
.editable {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
}

.editable:hover {
  background-color: #f5f5f5;
}

.editable input {
  width: 100%;
  padding: 5px;
  border: 1px solid #007bff;
  border-radius: 4px;
  font-size: 14px;
}

/* Deadline styles */
.deadline {
  color: #333;
}

.deadline.overdue {
  color: #dc3545;
  font-weight: bold;
}

import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:3004/users")
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  const addItem = obj => {
    setUsers([...users, obj])
    toast.success("New User has been added successfully")
  }

  const onDelete = id => {
    const userToDelete = users.find(user => user.id === id);
    axios.
      delete(`http://localhost:3004/users/${id}`)
    setUsers(users.filter(user => user.id !== id))
    toast.success(`${userToDelete.name} ${userToDelete.surname} has been deleted from the list`);
  }


  const salaryUp = (id, currentSalary) => {
    const increasedSalary = currentSalary + 50000;
    axios
      .put(`http://localhost:3004/users/${id}`, { salary: increasedSalary })
      .then(res => {
        setUsers(users.map(user => user.id === id ? { ...user, salary: increasedSalary } : user));
        toast.success(`Salary for user ${res.data.name} ${res.data.surname} has been increased to ${increasedSalary} AMD`);
      })
  }

  return (
    <div className='row'>
      <ToastContainer />
      <AddUser
        onAdd={addItem}
      />
      <UserList
        users={users}
        onDelete={onDelete}
        onSalaryUp={salaryUp}
      />
    </div>
  )
}
export default App
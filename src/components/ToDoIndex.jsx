import {Routes,Route} from 'react-router-dom'
import ToDoRegister from './ToDoRegister'
import ToDoLogin from './ToDoLogin'
import ToDoHome from './ToDoHome'
import UserDashboard from './UserDashboard'
import AddAppointment from './AddAppointment'
import DeleteAppointment from './DeleteAppointment'
import EditAppointment from './EditAppointment'

const ToDoIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<ToDoHome/>}/>
      <Route path='/login' element={<ToDoLogin/>}/>
      <Route path='/register' element={<ToDoRegister/>}/>
      <Route path='/dashboard' element={<UserDashboard/>}/>
      <Route path='/add-appointment' element={<AddAppointment/>}/>
      <Route path='/delete-appointment/:id' element={<DeleteAppointment/>}/>
      <Route path='/edit-appointment/:id' element={<EditAppointment/>}/>
    </Routes>
  )
}

export default ToDoIndex

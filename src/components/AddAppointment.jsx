import { useCookies } from 'react-cookie'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddAppointment = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userid'])
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      userid: cookies['userid']
    },
    onSubmit: (appointment) => {
      axios.post(`https://todoapp-backend-xgbn.onrender.com/appointments`, appointment)
        .then(() => {
          alert("appointment added");
          navigate('/dashboard');
        })
        .catch(err => {
          console.error(err);
          alert("Failed to add appointment");
        });
    }
  })

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container bg-light p-4' style={{ maxWidth: "450px" }}>
        <h3>Add New Appointment - {cookies['userid']}</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Title</dt>
            <dd><input type="text" name='title' onChange={formik.handleChange} className='form-control' /></dd>
            <dt>Date</dt>
            <dd><input type="date" name='date' onChange={formik.handleChange} className='form-control' /></dd>
          </dl>
          <button type='submit' className='btn btn-success'>Add</button>
          <Link to='/dashboard' className='btn btn-warning mx-2'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  )
}

export default AddAppointment

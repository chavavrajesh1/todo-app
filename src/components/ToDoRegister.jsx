import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ToDoRegister = () => {

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      userid: '',
      password: '',
      email: ''
    },
    onSubmit:(values)=>{
      axios.post("https://todoapp-api.onrender.com/users", values)
        .then(()=>{
          alert("User Registered Successfully");
          navigate("/login");
        })
        .catch(()=>{
          alert("Registration failed. Try again!");
        });
    }
  })

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container p-4 w-100 bg-light' style={{maxWidth:"450px"}}>
        <h3>Register User</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>User Id</dt>
            <dd><input type="text" onChange={formik.handleChange} className='form-control' name='userid' /></dd>
            <dt>Password</dt>
            <dd><input type="password" onChange={formik.handleChange} className='form-control' name='password' /></dd>
            <dt>Email</dt>
            <dd><input type="email" onChange={formik.handleChange} className='form-control' name='email' /></dd>
          </dl>
          <button className='btn btn-warning'>Register</button>
          <p className='mt-4'>
            Existing User <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ToDoRegister

import { useFormik } from 'formik'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ToDoLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userid']);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userid: "",
      password: ""
    },
    onSubmit: (user) => {
      axios.get("https://todoapp-api.onrender.com/users")
        .then(response => {
          let userdetails = response.data.find(item => item.userid === user.userid);
          if (userdetails) {
            if (user.password === userdetails.password) {
              setCookie('userid', userdetails.userid, { path: "/" });
              navigate('/dashboard');
            } else {
              alert('Invalid Password');
            }
          } else {
            alert("User Doesn't exist");
          }
        })
        .catch(err => {
          alert("Server error");
        });
    }
  })

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container p-4 bg-light' style={{ maxWidth:"400px", width:"100%" }}>
        <h3>User Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>User Id</dt>
            <dd><input type="text" onChange={formik.handleChange} className='form-control' name='userid' /></dd>
            <dt>Password</dt>
            <dd><input type="password" onChange={formik.handleChange} className='form-control' name='password' /></dd>
          </dl>
          <button className='btn btn-warning'>Login</button>
          <p className='mt-4'>
            New User? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ToDoLogin

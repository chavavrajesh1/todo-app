import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

const UserDashboard = () => {

  let navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies(['userid']);
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (!cookies['userid']) {
      navigate('/login');
      return;
    }

    axios.get("https://todoapp-api.onrender.com/appointments")
      .then(response => {
        let user_appointments = response.data.filter(
          appointment => appointment.userid === cookies['userid']
        );
        setAppointments(user_appointments);
      })
  }, [cookies])

  function handleSignOut() {
    removeCookie('userid');
    navigate('/');
  }

  return (
    <div className='min-vh-100 mt-5'>
      <div className='container bg-light p-3 col-12 col-md-10 col-lg-8'>
        <h3 className='d-flex justify-content-between'>
          <span>{cookies['userid']}</span>
          <span>DASHBOARD</span>
          <span>
            <button className='btn btn-link' onClick={handleSignOut}>Sign Out</button>
          </span>
        </h3>

        <Link to='/add-appointment' className="btn btn-success bi bi-calendar-event">
          Add Appointment
        </Link>

        <div className='row mt-2'>
          {appointments.map((appointment) => (
            <div key={appointment.id} className='col-md-4 col-sm-6'>
              <div className='card m-2 shadow-sm border-success'>
                <div className='card-body'>
                  <h5 className='card-title text-success'>{appointment.title}</h5>
                  <p className='card-text'>{appointment.date}</p>
                  <Link to={`/edit-appointment/${appointment.id}`}
                    className="btn btn-warning btn-sm mx-1">
                    <i className='bi bi-pen-fill'></i>
                  </Link>
                  <Link to={`/delete-appointment/${appointment.id}`}
                    className="btn btn-danger btn-sm mx-1">
                    <i className='bi bi-trash-fill'></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

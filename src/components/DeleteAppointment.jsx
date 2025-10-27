import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'

const DeleteAppointment = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    axios.get(`https://todoapp-api.onrender.com/appointments/${params.id}`)
      .then(response => {
        setAppointment(response.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load appointment");
      });
  }, [])

  function handleDeleteClick() {
    axios.delete(`https://todoapp-api.onrender.com/appointments/${params.id}`)
      .then(() => {
        alert("Appointment Deleted Successfully");
        navigate("/dashboard");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete appointment");
      });
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
      <div className='container bg-light p-2 w-100' style={{ maxWidth: "450px" }}>
        <h3>Delete Appointment</h3>
        <h5 className='my-3'>
          Are you sure want to delete? <br />
          <span className='text-danger my-3'>{appointment.title}</span>
        </h5>
        <button onClick={handleDeleteClick} className='btn btn-danger m-2'>Yes</button>
        <Link to='/dashboard' className="btn btn-warning">Cancel</Link>
      </div>
    </div>
  )
}

export default DeleteAppointment;

import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const EditAppointment = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [appointment, setAppointment] = useState({ title:"", date:"", userid:"" });

  const formik = useFormik({
    initialValues:{
      title: appointment.title,
      date: appointment.date,
      userid: appointment.userid
    },
    onSubmit: (appointment) => {
      axios.put(`https://todoapp-backend-xgbn.onrender.com/appointments/${params.id}`, appointment)
        .then(()=>{
          alert("Date Saved Successfully");
          navigate('/dashboard')
        })
        .catch(err => {
          console.error(err);
          alert("Failed to update appointment");
        });
    },
    enableReinitialize: true
  })

  useEffect(()=>{
    axios.get(`https://todoapp-backend-xgbn.onrender.com/appointments/${params.id}`)
      .then(response => {
        setAppointment(response.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load appointment")
      })
  },[params.id])

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container bg-light w-100 p-4' style={{maxWidth:"450px"}}>
        <h3>Edit Appointment</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Title</dt>
            <dd><input type="text" onChange={formik.handleChange} value={formik.values.title} className='form-control' name='title' /></dd>
            <dt>Date</dt>
            <dd><input type="date" onChange={formik.handleChange} value={formik.values.date} className='form-control' name='date' /></dd>
          </dl>
          <button className='btn btn-success mx-2'>Save</button>
          <Link to='/dashboard' className='btn btn-warning'>Cancel</Link>
        </form>
      </div>
    </div>
  )
}

export default EditAppointment;

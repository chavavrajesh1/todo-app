import { Link } from 'react-router-dom'

const ToDoHome = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-2">
      {/* Header */}
      <header className="d-flex justify-content-center align-items-center bg-primary w-100" style={{ height: "100px", maxWidth: "500px" }}>
        <h1 className="m-0 text-center">
          <Link to='/' className='btn btn-primary'>
            TO-DO APP
          </Link>
        </h1>
      </header>

      {/* Buttons */}
      <div className='d-flex flex-wrap gap-2 w-100 mt-4' style={{ maxWidth: "500px" }}>
        <Link to='/register' className='btn btn-dark flex-fill'>Register</Link>
        <Link to='/login' className='btn btn-warning flex-fill'>Login</Link>
      </div>
    </div>
  )
}

export default ToDoHome

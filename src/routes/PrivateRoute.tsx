import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'


const PrivateRoutes = () => {

    const {auth} = useAuth()

  
return (
    auth?.access_token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes
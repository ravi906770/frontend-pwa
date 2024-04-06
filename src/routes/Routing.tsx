import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundry/ErrorBoundry';
import Error from '../ErrorBoundry/Error';
import { useAuth } from '../context/authContext';
import FallBackUI from '../ErrorBoundry/FallbackUI';
import Buggy from '../ErrorBoundry/Buggy';
import BouncingLoader from '../components/loader/BouncingLoader';
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Profile = React.lazy(() => import('../pages/Profile'));
// const SplitBill = React.lazy(() => import('../pages/SplitBill'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Notification = React.lazy(() => import('../pages/Notification'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Homepage = React.lazy(() => import('../pages/Homepage'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Category = React.lazy(() => import('../pages/Category'));
const Transaction = React.lazy(() => import('../pages/Transaction'));
const Blog = React.lazy(() => import('../pages/Blog'));
const About = React.lazy(() => import('../pages/About'));
const Feedback = React.lazy(() => import('../pages/Feedback'));
const ErrorPage = React.lazy(() => import("../components/ErrorPage"))
const Account = React.lazy(() => import('../pages/Account'));
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'));
const UseForm = React.lazy(() => import('../pages/UseForm'));
const YupForm = React.lazy(() => import('../pages/YupForm'));
const ContactUs = React.lazy(() => import('../pages/ContactUs'));
const Chat = React.lazy(() => import('../pages/Chat'))
const PrivateRoutes = React.lazy(() => import("../routes/PrivateRoute"))
const Main = React.lazy(()=>import("../pages/account/Main"))


type Props = {}

const Routing = (props: Props) => {

  const { auth } = useAuth();

  return (
    <>
      {/* <React.Suspense fallback={<BouncingLoader />}> */}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/category' element={<Category />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/account' element={<Main />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/split' element={<Profile />} />
            <Route path='/setting' element={<Settings />} />
          </Route>
          <Route path='/' element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/contact' element={<ContactUs />} />
          {/* <Route path='/chat' element={<Chat />} /> */}
          <Route path='/useForm' element={<UseForm />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/form' element={<YupForm />} />
          <Route path='/error' element={<Error />} />
          <Route path='/test' element={<ErrorBoundary FallBackUI={<FallBackUI />} children={<Buggy />} />} />
          <Route path='/error404' element={<ErrorPage />} />

        </Routes>


      {/* </React.Suspense> */}

    </>
  )
}

export default Routing
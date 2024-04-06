import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import registerImg from "../../assets/signup.gif"
import bg from "../../assets/hero-bg.png"
import { useAuth } from '../../context/authContext'
import axios from 'axios'
import { FaGoogle } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import  toast  from 'react-hot-toast'

type Props = {}
  
type formValue = {
  email : string,
  password : string
}


const Login = (props: Props) => {

 
  const form = useForm<formValue>();
  const {register , handleSubmit ,formState , getValues} = form;

  useEffect(() => {
    register('email', {
      required: 'Email is required',
      validate: async (value) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/check-email/${value}`);
          if (!response.data.exists) {
            return 'No email found!!';
          }
        } catch (error) {
          console.error(error);
          return 'Error occurred while checking email';
        }
      }
    });
  }, [register]);

  const { auth , setAuth } = useAuth();

  const {errors} = formState


  const navigate = useNavigate();
  const location = useLocation();


  const onSubmit = async (data : formValue) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/login', 
      data
, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
      )

      // console.log(res)
      if (res && res.data.success) {
        // toast.success("Login Successfully!!")
        const access_token = res.data.access_token;
       
        localStorage.setItem("user", access_token);
        setAuth({
          user: {
          email : getValues("email"),
          },
          access_token
        })
       toast.success("login Successfully!!")
       navigate("/dashboard")
        // console.log(auth);
        
        // setTimeout(()=>{
        //   console.log(auth)
        // },5000)
       

      
    }else {
      toast.error("Email or Password is Invalid!!")
    }
    } catch (error) {
        toast.error("Something went wrong!!")
    }
  };

  const google = ()=>{
    window.open("http://localhost:5000/auth/google/callback")
  }

  return (
    <>
      <section className=" flex items-center  bg-no-repeat bg-center bg-cover py-[60px] 2xl:h-[800px]" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-full w-[1440px] px-5 mx-auto">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

            {/* ================== Hero Content ================== */}
            <div className="justify-between items-end">
              <img src={registerImg} alt="" className="w-full rounded-full" />
            </div>
            {/* ================== Hero Content ================== */}
            <div className="flex gap-[30px] justify-between items-start w-full">
              <form className="w-full max-w-lg" noValidate onSubmit= {handleSubmit(onSubmit)}>
                <button type="button" onClick={()=>google()} className="text-black  bg-gray-200 focus:ring-4 gap-3 justify-center focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-10">
                  <FaGoogle />
                  Sign in with Google
                </button>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email" >
                      email
                    </label>
                    <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="text" placeholder="Enter Your Email" {...register("email",{
                    required :{
                        value:true,
                        message : "email is required",
                    } ,
                    pattern :{
                      value : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message : "Invalid email format"
                    },

                },
                )} />
                  </div>

                </div>
                <p className='text-red-700'>{errors.email?.message}</p>
                <div className="w-full md:w-1/2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password" >
                    password
                  </label>
                  <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="Enter Your Password" {...register("password",{
                    required :{
                        value:true,
                        message : "password is required",
                    } 
                  
                },
                )}/>
                </div>
                <p className='text-red-700'>{errors.password?.message}</p>
                <Link to="/forgot-password">
                  <div className="w-full md:w-1/2 mt-10">
                    <label className="block uppercase tracking-wide text-primaryColor underline text-xs font-bold mb-2">
                      Forgot Password
                    </label>
                  </div>
                </Link>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                    <button type='submit' className="mt-10 bg-primaryColor text-white w-full h-[50px] font-bold hover:bg-green-400 rounded-full">Login</button>
                    {/* <Toaster/> */}
                  </div>
                </div>

                <Link to="/register">
                  <div className="flex flex-wrap -mx-3 mt-[75px]">
                    <div className="w-full px-3">
                      <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Don't have an Account ? Go to <span className='text-primaryColor text-[15px] font-bold underline'>Register</span>
                      </label>
                    </div>
                  </div>
                </Link>
              </form>

            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default Login;
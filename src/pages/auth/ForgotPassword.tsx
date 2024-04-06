import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fp from "../../assets/fp2.avif"
import bg from "../../assets/hero-bg.png"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import useAxiosPrivate from '../../axios/axiosPrivate'
import toast from 'react-hot-toast'

type Props = {}



const ForgotPassword = (props: Props) => {

  type formValue = {
    email: string,
    password: string,
    cPassword: string
  }

  const form = useForm<formValue>({
    defaultValues: {
      email: "",
      password: "",
      cPassword: ""
    }
  });


  const { register, handleSubmit, formState, control, getValues } = form;

  const { errors } = formState

  const navigate = useNavigate()

  const axiosPrivate = useAxiosPrivate()


  const onSubmit = async (data: formValue) => {
    try {
      
      const res = await axiosPrivate.post("/forgot-password", 
        data
      )
     console.log(res)

      if (res && res.data.success) {
        toast.success("Password Updated Successfully!!")
        navigate("/login")
      }else{
        toast.error("Something went wrong while updating the password!!")
      }
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <>
      <section className=" flex items-center  bg-no-repeat bg-center bg-cover py-[60px] 2xl:h-[800px]" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-full w-[1440px] px-5 mx-auto">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

            {/* ================== Hero Content ================== */}
            <div className="justify-between items-end">
              <img src={fp} alt="" className="w-full md:w-[80%] sm:w-[80%] rounded-full" />
            </div>
            {/* ================== Hero Content ================== */}
            <div className="flex gap-[30px] justify-between items-start w-full">
              <form className="w-full max-w-lg " onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                      email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="text" placeholder="Enter Your Email" {...register("email", {
                      required: {
                        value: true,
                        message: "email is required"
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format"
                      },
                      validate: async (value) => {
                        try {
                          const response = await axios.get(`http://localhost:5000/api/v1/check-email/${value}`);
                          if (!response.data.exists) {
                            return 'email is not exist';
                          }
                        } catch (error) {
                          console.error(error);
                          return 'Error occurred while checking email';
                        }
                      }
                    })} />
                  </div>

                </div>
                <p className='text-red-700'>{errors.email?.message}</p>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                      New Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Enter Your Password" {...register("password", {
                      required: {
                        value: true,
                        message: "password is required"
                      }
                    })} />
                  </div>

                </div>
                <p className='text-red-700'>{errors.password?.message}</p>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                      Confirm New Password
                    </label>
                    <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="cPassword" type="password" placeholder="Enter Your Confirm Password" {...register("cPassword", {
                      required: {
                        value: true,
                        message: "confirm password is required"
                      },
                      validate : (password)=>{
                        return  password === getValues("password") || "Password must be match"
                  }
                    })} />
                  </div>

                </div>
                <p className='text-red-700'>{errors.cPassword?.message}</p>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                    <button type='submit' className="mt-10 bg-primaryColor text-white w-full h-[50px] font-bold hover:bg-green-400 rounded-full">Update</button>
                  </div>
                </div>
              </form>

            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default ForgotPassword
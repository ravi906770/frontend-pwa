import React, { useEffect, useState } from 'react'
import registerImg from "../../assets/register.avif"
import bg from "../../assets/hero-bg.png"
import { toast } from 'react-hot-toast';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6";
import { useForm , useFieldArray } from 'react-hook-form';

type Props = {}

const Register = (props: Props) => {


  type formValue = {
    firstname : string,
    lastname : string,
    email : string,
    password:string,
    mobile_no : string
}


  const form = useForm<formValue>({
    defaultValues :{
      firstname :"xyz",
      lastname : "abc",
      email : "example@gmail.com",
      mobile_no : "1234567890"  
    }
  });
  const {register , handleSubmit ,formState } = form;

  const {errors} = formState

  const Navigate = useNavigate();

  useEffect(() => {
    register('email', {
      required: 'Email is required',
      validate: async (value) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/check-email/${value}`);
          if (response.data.exists) {
            return 'Email is already in use !! Please Use the different email address';
          }
        } catch (error) {
          console.error(error);
          return 'Error occurred while checking email';
        }
      }
    });
  }, [register]);


  const onSubmit = async (data : formValue)=>{
      try {
        const res = await axios.post(`http://localhost:5000/api/v1/register` , data)
        // console.log(res)
        if (res && res.data.success){
          Navigate("/login")
          toast.success("Registered Successfully!!")
        }
      } catch (error) {
        toast.error("Something Went Wrong!!")
        console.log(error);
      }
  }

 

 

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`http://localhost:5000/api/v1/register`, { firstname, lastname, email, password, mobile_no })
  //     if (res && res.data.success) {
  //       toast.success("User Registered Sucessfully!!")
  //       Navigate("/login")
  //       // console.log(res)
  //     }
  //     else {
  //       toast.error(res && res.data.message)
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong!!!")
  //     console.log(error);
  //   }
  // }

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
              <form noValidate className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>

                {/* ================== google register button ================== */}
                <button type="button" className="text-black  bg-gray-200 focus:ring-4 gap-3 justify-center focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-10">
                  <FaGoogle />
                  Sign in with Google
                </button>
                <div className="flex flex-wrap -mx-3 mb-6">

                  {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                      First Name
                    </label>
                    <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" {...register("firstname") } />
                  </div>
 */}

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                      First Name
                    </label>
                    <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" {...register("firstname",{
                    required :{
                        value:true,
                        message : "Firstname is required"
                    } 
                })}/>
                <p className='text-red-700'>{errors.firstname?.message}</p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastname" type="text" placeholder="Doe" {...register("lastname",{
                    required :{
                        value:true,
                        message : "lastname is required"
                    } 
                })} />
                  </div>
                  <p className='text-red-700'>{errors.lastname?.message}</p>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="xyz@gmail.com" {...register("email",{
                    required :{
                        value:true,
                        message : "email is required",
                    } ,
                    pattern :{
                      value : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message : "Invalid email format"
                    }
                },
                )} />
                  </div>
                </div>
                <p className='text-red-700'>{errors.email?.message}</p>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"  {...register("password",{
                    required :{
                        value:true,
                        message : "password is required",
                    },
                    pattern :{
                      value : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message : "Password should contain Uppercase , Lowercase, One Special Char and Number value"
                    },
                    minLength:{
                      value : 6,
                      message : "Password should be minimum of 6"
                    },
                    maxLength:{
                      value : 14,
                      message : "Password should be maximum of 14"
                    }
                  
                },
                )}/>
                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                  </div>
                </div>
                <p className='text-red-700'>{errors.password?.message}</p>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                      Mobile No.
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="mobile_no" type="text" placeholder="1234567890" {...register("mobile_no",{
                    required :{
                        value:true,
                        message : "Mobile_No is required",
                    },
                    pattern : {
                      value :/^[6-9][0-9]{9}$/,
                      message : "Invalid format"
                  },
                    maxLength :{
                      value : 10,
                      message : "Maximum length is 10"
                    }
                },
                )}/>
                  </div>
                </div>
                {/* <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    Profile Pic
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="file" />
                </div>
              </div> */}
              <p className='text-red-700'>{errors.mobile_no?.message}</p>
              {/* <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Profile Pic
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="file"  {...register("avatar"
                )} />
                  </div>
                </div> */}
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <button type='submit' className="mt-10 bg-primaryColor text-white w-full h-[50px] font-bold hover:bg-green-400 rounded-full">Sign Up</button>
                  </div>
                </div>

                <Link to="/login">
                  <div className="flex flex-wrap -mx-3 mt-[75px]">
                    <div className="w-full px-3">
                      <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Already Sign Up ? Go to <span className='text-primaryColor text-[15px] font-bold underline'>Login</span>
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

export default Register
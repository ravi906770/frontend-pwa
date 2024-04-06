import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IoClose, IoCloseCircle } from 'react-icons/io5';
import useAxiosPrivate from '../../axios/axiosPrivate';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  getUser : ()=>void
}

interface User {
    firstname: string,
    email : string,
    mobile_no : string
}

type formValue = {
  firstname: string,
  email : string,
  mobile_no : string
 
}

const UpdateForm = ({getUser}: Props) => {

  const axiosPrivate = useAxiosPrivate()

  const [showForm, setShowForm] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
    setShowForm(!showForm)
  };

  const form = useForm<formValue>({})

  const { register, handleSubmit, setValue, formState } = form;

  const { errors } = formState
  const navigate = useNavigate()


  const onSubmit = async(data : formValue )=>{
    try {
        const res = await axiosPrivate.put("http://localhost:5000/api/v1/update" , data)
        if(res && res.data.success){
            toast.success("Profile Updated Successfully!!")
            getUser()
            setIsOpen(!isOpen)
            navigate("/setting")
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong while updating the profile!!")
    }
  }





  //   const fetch = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/v1/transaction-payment');
  //       const data = response.data.newTransactionObject;
  //       setTransactionData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch transaction data:', error);
  //     }
  //   }



  return (
    <>
    {isOpen && 
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
<div className="relative md:w-96 w-full  max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="relative">
        <button className='absolute right-0 top-0 text-[20px]' onClick={handleClose}><IoClose /></button>
      </div>
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
    <div>
      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
    Name
      </label>
      <input
        type="text"
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        {...register("firstname")}
      />
    </div>
    <div>
      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
        email
      </label>
      <input
        type="email"
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        {...register("email")}
      />
    </div>
    <div>
      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
        Mobile_No
      </label>
      <input
        type="text"
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        {...register("mobile_no")}
      />
    </div>
    <div className="col-span-2 flex justify-center">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        Update
      </button>
    </div>
  </form>
</div>
    </div>
      
    }
   

    </>
  )
}

export default UpdateForm
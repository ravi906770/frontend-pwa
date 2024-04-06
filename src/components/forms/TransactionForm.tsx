import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IoClose, IoCloseCircle } from 'react-icons/io5';
import useAxiosPrivate from '../../axios/axiosPrivate';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  handleClose: () => void
}

interface Category {
  _id: string,
  category: string;
  // other properties
}

interface Transaction {
  _id: string;
  name: string;
  description: string;
  date: string;
  category: string;
  payment: string;
  end_date: string;
  status: string;
  mode: string
}

type formValue = {
  name: string,
  description: string,
  date: Date,
  category: string,
  payment: number,
  end_date: string,
  status: string,
  mode: string
}

const TransactionForm = ({ handleClose }: Props) => {

  const axiosPrivate = useAxiosPrivate()

  // const [showForm, setShowForm] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([])



  const navigate = useNavigate()

  const form = useForm<formValue>({})

  const { register, handleSubmit, setValue, formState } = form;

  const { errors } = formState



  useEffect(() => {
    try {
      axiosPrivate.get("/getCategory").then((response : any) => {
        // console.log(response.data.getCategory);
        setCategories(response.data.getCategory)

        // console.log(categories[0].category);

      }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onSubmit = async (data: formValue) => {
    try {
      const res = await axiosPrivate.post(`/transaction`, data)
      if (res && res.data.success) {
        toast.success("Transaction Added Successfully!!")
        getallTransaction()
        navigate("/dashboard")

        setTransaction([res.data.newTransaction, ...transaction]);
        // fetch()
        // fetchCategory()
        setValue('name', "")
        setValue('category', "")
        setValue('date', new Date())
        setValue('description', "")
        setValue('end_date', '')
        setValue('mode', "")
        setValue('payment', 0)
        setValue('status', "")
        handleClose()
      } else {
        toast.error("Something went wrong while adding the Transaction!!")
      }
    } catch (error) {
      console.log(error);
    }

  }



  const getallTransaction = () => {
    try {
      axiosPrivate.get("/getAllTransaction").then((response : any) => {
        setTransaction(response.data.getTransaction)

      }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getallTransaction();
  }, [])



  return (
    <>
      <div className="fixed sm:top-0 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="relative md:w-96 w-full max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
          <div className="relative">
            <button className='absolute right-0 top-0  text-[20px]' onClick={handleClose}><IoCloseCircle /></button>
          </div>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                    Transaction Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required!!",
                      },
                    })}
                  />
                  <p className="text-red-700">{errors.name?.message}</p>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    className="mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is required!!",
                      },
                    })}
                  />
                  <p className="text-red-700">{errors.description?.message}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                className="sm:mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("date", {
                  required: {
                    value: true,
                    message: "Date is required!!",
                  },
                })}
              />
              <p className="text-red-700">{errors.date?.message}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="sm:mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("category", {
                  required: {
                    value: true,
                    message: "At least one category is required!!",
                  },
                })}
              >
                <option value="">Select Category</option>
                {categories.map((ele, id) => (
                  <option key={id} value={ele.category}>
                    {ele.category}
                  </option>
                ))}
              </select>
              <p className="text-red-700">{errors.category?.message}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
                Payment
              </label>
              <input
                type="number"
                className="sm:mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("payment", {
                  required: {
                    value: true,
                    message: "Payment is required",
                  },
                  min: {
                    value: 1,
                    message: "Value must be greater than 0",
                  },
                })}
              />
              <p className="text-red-700">{errors.payment?.message}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                className="sm:mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("end_date", {
                  required: {
                    value: true,
                    message: "End-date is required",
                  },
                })}
              />
              <p className="text-red-700">{errors.end_date?.message}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="sm:mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("status", {
                  required: {
                    value: true,
                    message: "Status is required",
                  },
                })}
              >
                <option value="">Transaction Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <p className="text-red-700">{errors.status?.message}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
                Transaction Mode
              </label>
              <select
                className="sm:mt-1 sm:p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                {...register("mode", {
                  required: {
                    value: true,
                    message: "Mode is required",
                  },
                })}
              >
                <option value="">Transaction Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              <p className="text-red-700">{errors.mode?.message}</p>
            </div>
            <div className="col-span-2 flex justify-center mt-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>




    </>
  )
}

export default TransactionForm
import React, { useEffect, useState } from 'react'
import Menu from '../components/common/Menu'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import SplitBillTable from '../components/SplitBillTable'
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import useAxiosPrivate from '../axios/axiosPrivate'
import toast from 'react-hot-toast'
import BouncingLoader from '../components/loader/BouncingLoader'

type Props = {}

type splitValue = {
    name : string,
    description : string,
    date : string,
    category:string,
    payment : number,
    status : string,
    mode : string,
    emails : [string]
}




type formValue = {
    name: string,
    date: Date,
    payment: string
}

type FormData = {
    name: string
    payment: string;
    date: string;
    category: string;
    description: string;
    mode: string,
    status: string,
    emails: string[];
};

type Category = {
    category: string
    budget_boundry: number
}

const Profile = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()

    const [category, setCategory] = useState<Category[]>([]);
    const [splitData, setSplitData] = useState<FormData[]>([]);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [data , setData] = useState<splitValue[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, control , setValue , formState } = useForm<FormData>();
    const {errors} = formState


    const onSubmit = async (data: FormData) => {
        try {

            setIsLoading(true);
            const res = await axiosPrivate.post("/splitbill", data)
            if (res && res.data.success) {
                toast.success("Email Notification Send Successfully!!")
                setSplitData(res.data.data)
                getAllSplitBill()
                setValue("name" , "");
                setValue("category" , "");
                setValue("date" , "");
                setValue("description" , "");
                setValue("emails" , []);
                setValue("payment" , "");
                setValue("status" , "");
                setValue("mode" , "");// console.log(splitData)
            }
        } catch (error : any) {
            toast.error(error.res.message)
        } finally {
            setIsLoading(false); // Set loading to false when request completes (either success or failure)
        }
    };


    const getAllSplitBill = async()=>{
        try {
            const res = await axiosPrivate.get("/getsplitbill")
            if(res && res.data.success){
                console.log(res.data.data)
                setData(res.data.data)
            }
        } catch (error) {
            toast.error("Somthing went wrong while getting the split bill report!!")
        }
    }

    useEffect(()=>{
        getAllSplitBill()
    },[])


    useEffect(() => {
        try {
            axiosPrivate.get("/getCategory").then((response) => {
                console.log(response.data.getCategory);
                setCategory(response.data.getCategory)

                // console.log(categories[0].category);

            }
            )
        } catch (error) {
            console.log(error)
        }
    }, [])

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
         {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center bg-gray-500 bg-opacity-50 items-center z-50">
                 <BouncingLoader/>
            </div>
           
        )}
            <section className='flex flex-col lg:flex-row items-center w-full min-h-screen bg-no-repeat bg-center bg-cover'>
                <div className='w-full lg:w-1/5 bg-slack-50 lg:rounded-r-lg p-4 lg:p-10'>
                    <div className='mt-4 relative cursor-pointer'>
                        <button className='lg:hidden absolute top-0 left-0 text-xl focus:outline-none' onClick={toggleMenu}>
                            {showMenu ? <CiMenuBurger /> : <IoIosCloseCircle />}
                        </button>
                        <div className=''>
                            {!showMenu && <Menu />}
                        </div>

                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full lg:w-full p-4 lg:p-10 border border-solid rounded-lg shadow-panelShadow'>
                    <div className='w-full lg:w-full p-4 lg:p-10'>
                        <div className='border border-solid p-4 rounded-lg shadow-panelShadow'>
                            <h2 className='text-lg font-semibold mb-4 text-center'>Bill Details</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>

                                <div className='space-y-4 l'>
                                    <div>
                                        <label className='block mb-2 text-sm'>Name</label>
                                        <input
                                            type='text'
                                            className='border border-gray-300 text-black rounded-md p-2 w-full text-sm'
                                            placeholder='Enter the amount'
                                            {...register('name', {
                                                required : {
                                                    value : true,
                                                    message : "Name is Required!!"
                                                }
                                            })}
                                        />
                                    </div>
                                    <p className='text-red-700'>{errors.name?.message}</p>
                                    <div>
                                        <label className='block mb-2 text-sm'>Payment</label>
                                        <input
                                            type='number'
                                            className='border border-gray-300 text-black rounded-md p-2 w-full text-sm'
                                            placeholder='Enter the amount'
                                            {...register('payment' , {
                                                required : {
                                                    value : true,
                                                    message : "Payment is required!!"
                                                },
                                                
                                                min : {
                                                    value : 1,
                                                    message : "Value must be greater then 0!!"
                                                }
                                            })}
                                        />
                                    </div>
                                    <p className='text-red-700'>{errors.payment?.message}</p>
                                    <div>
                                        <label className='block mb-2 text-sm'>Date</label>
                                        <input type='date' className='border border-gray-300 rounded-md p-2 w-full text-sm' {...register('date' , {
                                                required : {
                                                    value : true,
                                                    message : "Date is Required!!"
                                                }
                                            })} />
                                    </div>
                                    <p className='text-red-700'>{errors.date?.message}</p>
                                    <div>
                                        <label className='block mb-2 text-sm'>Category</label>
                                        <select className='border text-black border-gray-300 rounded-md p-2 w-full text-sm' {...register('category' , {
                                                required : {
                                                    value : true,
                                                    message : "Category is Required!!"
                                                }
                                            })}>
                                            <option> Select Your Category</option>
                                            {category?.map((e) => (
                                                <option key={e.category} value={e.category} className='text-black'>
                                                    {e.category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className='text-red-700'>{errors.category?.message}</p>
                                </div>
                                {/* Second Column */}
                                <div className='space-y-4 '>
                                    <div>
                                        <label className='block mb-1 text-sm'>Description</label>
                                        <textarea
                                            className='border border-gray-300 rounded-md p-1 w-full text-sm block'
                                            rows={2}
                                            placeholder='Enter description...'
                                            {...register('description' ,{
                                                required : {
                                                    value : true,
                                                    message : "Description is Required!!"
                                                }
                                            })}
                                        ></textarea>
                                    </div>
                                    <p className='text-red-700'>{errors.description?.message}</p>
                                    <div>
                                        <label className='block mb-1 text-sm'>Mode of Payment</label>
                                        <select className='border text-black border-gray-300 rounded-md p-2 w-full text-sm' {...register('mode' , {
                                                required : {
                                                    value : true,
                                                    message : "Mode is Required!!"
                                                }
                                            })}>
                                            <option> Select Mode of Payment</option>
                                            <option value='online' className='text-black'>
                                                Online
                                            </option>
                                            <option value='offline' className='text-black'>
                                                Offline
                                            </option>
                                        </select>
                                    </div>
                                    <p className='text-red-700'>{errors.mode?.message}</p>
                                    <div>
                                        <label className='block mb-1 text-sm'>Transaction Status</label>
                                        <select className='border text-black border-gray-300 rounded-md p-2 w-full text-sm' {...register('status' , {
                                                required : {
                                                    value : true,
                                                    message : "Status is Required!!"
                                                }
                                            })}>
                                            <option> Status</option>
                                            <option value='completed' className='text-black'>
                                                Completed
                                            </option>
                                            <option value='pending' className='text-black'>
                                                pending
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <p className='text-red-700'>{errors.status?.message}</p>
                                {/* Enter Emails Section */}
                                <div className='col-span-2 text-center'>
                                    <label className='block text-gray-700 font-bold mb-2'>Enter Emails to Send Request</label>
                                    <Controller
                                        name='emails'
                                        control={control}
                                        defaultValue={['']} 
                                        rules={{
                                            required: 'Email is required',
                                            validate: async (value) => {
                                                try {
                                                    const response = await axios.get(`http://localhost:5000/api/v1/check-email/${value}`);
                                                    if (!response.data.exists) {
                                                        toast.error("This email not exits in this website!!")
                                                        return 'This email not exits in this website!!';
                                                    }
                                                } catch (error) {
                                                    console.error(error);
                                                    return 'Error occurred while checking email';
                                                }
                                            }
                                        }}
                                        render={({ field }) => (
                                            <>
                                                {field.value.map((instruction: string, index: number) => (
                                                    <div key={index} className='flex justify-center items-center'>
                                                        <input
                                                            type='email'
                                                            {...field}
                                                            value={instruction}
                                                            onChange={(e) => {
                                                                const newInstructions = [...field.value];
                                                                newInstructions[index] = e.target.value;
                                                                field.onChange(newInstructions);
                                                            }}
                                                            className='border border-gray-300 rounded-md p-1 w-full text-sm mb-2 mr-2'
                                                            placeholder='example@gmail.com'
                                                        />
                                                        {index !== 0 && (
                                                            <button
                                                                type='button'
                                                                className='bg-red-500 text-white rounded p-2 text-sm'
                                                                onClick={() => {
                                                                    const newInstructions = [...field.value];
                                                                    newInstructions.splice(index, 1);
                                                                    field.onChange(newInstructions);
                                                                }}
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type='button'
                                                    onClick={() => field.onChange([...field.value, ''])} // Append a new empty string
                                                    className='bg-green-500 text-white rounded p-2 text-sm mt-2'
                                                >
                                                    Add Email
                                                </button>
                                            </>
                                        )}
                                    />
                                </div>
                                <p className='text-red-700'>{errors.emails?.message}</p>
                                {/* Submit Button */}
                                <div className='flex flex-col text-center mt-4'>
                                    <button
                                        type='submit'
                                        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm'
                                    >
                                        Send Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* Split Bill Table */}
            <div className='mt-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32'>
                <div className='text-xl font-semibold mb-4'>Split Bill Report</div>
                <SplitBillTable data = {data}/>
            </div>


        </>
    )
}

export default Profile
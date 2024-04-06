import React, { useEffect, useState } from 'react'
import Menu from '../components/common/Menu'
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import useAxiosPrivate from '../axios/axiosPrivate';
import user from "../assets/user.avif"
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaRegUserCircle } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { MdDelete, MdMobileScreenShare } from 'react-icons/md';
import BarChart1 from '../components/charts/BarChart1';
import { useForm } from 'react-hook-form';


type Props = {

}

type User = {
    firstname: string,
    email: string,
    mobile_no: string
}

type Limit = {
    income: number,
    daily_limit: number
}

type Category = {
    category: string,
    budget_boundry: number
}


type categoryPayment = {
    category: string,
    totalAmount: number
}




const Settings = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<User>()
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [limitData, setLimitData] = useState<Limit[]>([])
    const [showForm, setShowForm] = useState(false);
    const [showBudgetForm, setShowBudgetForm] = useState(false)
    const [showLimitForm, setLimitForm] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0);
    const [categoryPayment, setCategoryPayment] = useState<categoryPayment[]>([]);


    const fetchCategory = async () => {
        try {
            const response = await axiosPrivate.get('/categoryPayment');
            if (response && response.data.success) {
                const data = response.data.formatData;
                setCategoryPayment(data);
            } else {
                toast.error("Something went wrong while getting the Category Payment!!")
            }

        } catch (error) {
            console.error('Failed to fetch transaction data:', error);
        }
    }

    const getAllTransaction = async () => {
        try {
            const data = await axiosPrivate.get(`/getAllTransaction`)
            setTotalAmount(data.data.totalPayment)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllTransaction()
        fetchCategory()
    }, [])

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const budgetForm = () => {
        setShowBudgetForm(!showBudgetForm)
    }

    const limitForm = () => {
        setLimitForm(!showLimitForm)
    }

    const navigate = useNavigate()

    const getCategory = async () => {
        try {
            const response = await axiosPrivate.get('http://localhost:5000/api/v1/getCategory');
            const data = response.data.getCategory;
            setCategoryData(data);
        } catch (error) {
            console.error('Failed to fetch transaction data:', error);
        }
    }

    const getUser = async () => {
        try {
            const res = await axiosPrivate.get("http://localhost:5000/api/v1/profile")
            if (res && res.data.success) {
                setUserProfile(res.data.data)
            }
        } catch (error) {
            toast.error("Something went wrong while getting user details!!")
            console.log(error)
        }
    }



    const getLimit = async () => {
        try {
            const res = await axiosPrivate.get("http://localhost:5000/api/v1/getLimit")
            if (res && res.data.success) {
                setLimitData(res.data.data)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while getting the Limit !!!")

        }
    }

    useEffect(() => {
        getLimit()
    }, [])

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getCategory()
    }, [])


    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axiosPrivate.delete("http://localhost:5000/api/v1/delete")
            if (res && res.data.success) {
                toast.success("Profile Delete Successfully!!")
                localStorage.removeItem("user")
                navigate("/")
            }
        } catch (error) {
            toast.error("something went wrong while deleting the profile!!")
        }
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm<User>({});
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm<Limit>();
    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm<Category>();


    const handleUser = async (data: User) => {
        try {
            const res = await axiosPrivate.put("http://localhost:5000/api/v1/update", data)
            if (res && res.data.success) {
                toast.success("Profile Updated Successfully!!")
                getUser()
                setShowForm(!showForm)
            }
        } catch (error) {
            toast.error("Something went wrong while updating your profile!!")
        }
    }

    const handleLimit = async (data: Limit) => {
        // console.log(data)
        try {
            const res = await axiosPrivate.put("http://localhost:5000/api/v1/updateLimit", data)
            if (res && res.data.success) {
                toast.success("Limit Updated Successfully!!")
                setLimitForm(!limitForm)
                getLimit()
            }
        } catch (error) {
            toast.error("Something went wrong in updating limit!!")
        }
    }

    const handleCategory = async (data: Category) => {
        try {
            const res = await axiosPrivate.put("http://localhost:5000/api/v1/updatecategory", data)
            if (res && res.data.success) {
                toast.success("Category Updated Successfully!!")
                setShowBudgetForm(!showBudgetForm)
                getCategory()
            }
        } catch (error) {
            toast.error("Something went wrong while updating the category!!")
        }
    }






    return (
        <>
            <section className='flex items-center w-full min-h-screen bg-no-repeat bg-center bg-cover'>
                <div className='flex flex-col lg:flex-row h-full'>
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

                    <div className='w-full lg:w-4/5 p-4 lg:p-10'>
                        <div className='mb-12 relative'>
                            <button onClick={toggleForm} className='absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '>Update Profile</button>
                            {showForm &&
                                <form onSubmit={handleSubmit1(handleUser)} className='absolute top-5 right-10 bg-slate-100  p-6 rounded-lg shadow-lg z-50'>
                                    <div className="mb-4 flex gap-2 justify-between items-center">
                                        <label htmlFor="billName" className="block text-sm font-semibold mb-2"> <FaRegUserCircle className='text-[25px] text-primaryColor' /></label>
                                        <input type="text" id="billName" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder={userProfile?.firstname} {...register1("firstname")} />
                                    </div>
                                    <div className="mb-4 flex gap-2 justify-between items-center">
                                        <label htmlFor="billAmount" className="block text-sm font-semibold mb-2"><SiMinutemailer className='text-[25px] text-primaryColor' /></label>
                                        <input type="email" id="billAmount" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder={userProfile?.email} {...register1("email")} />
                                    </div>
                                    <div className="mb-4 flex gap-2 justify-between items-center">
                                        <label htmlFor="billAmount" className="block text-sm font-semibold mb-2"><MdMobileScreenShare className='text-[25px] text-primaryColor' /></label>
                                        <input type="tel" id="billAmount" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder={userProfile?.mobile_no} {...register1("mobile_no")} />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Update</button>
                                    </div>
                                </form>


                            }
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {/* First component */}
                            <div className="profile flex flex-col border border-blue-300 rounded-lg p-4 bg-white shadow-md">
                                <div className="img mb-4">
                                    <img src={user} alt="" className="rounded-full w-20 h-20 sm:w-full sm:h-full  mx-auto" />
                                </div>
                                <div className="details text-center sm:text-left">
                                    <div className='flex items-center mb-2 border border-solid rounded-md'>
                                        <FaRegUserCircle className='text-[25px] text-primaryColor mr-2 m-2' />
                                        <h1 className="sm:text-xl sm:font-medium">{userProfile?.firstname}</h1>
                                    </div>
                                    <div className='flex items-center mb-2 border border-solid rounded-md'>
                                        <SiMinutemailer className='text-[25px] text-primaryColor mr-2 m-2' />
                                        <h1 className="sm:text-xl sm:font-medium">{userProfile?.email}</h1>
                                    </div>
                                    <div className='flex items-center border border-solid rounded-md'>
                                        <MdMobileScreenShare className='text-[25px] text-primaryColor mr-2 m-2' />
                                        <h1 className="sm:text-xl sm:font-medium">+91 {userProfile?.mobile_no}</h1>
                                    </div>
                                </div>
                                <button type='button' className='bg-red-500 mt-4 hover:bg-green-500 text-white sm:font-medium text-[15px] sm:py-2 sm:px-4 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'>Delete Profile</button>
                            </div>


                            {/* 2nd component Line */}
                            <div className='gap-4 border border-blue-300 relative rounded-lg '>
                                <div className='absolute right-0 top-0'>
                                    <button onClick={limitForm} className='ml-auto bg-blue-500 mt-2 mr-2 hover:bg-green-300 text-white font-bold py-2 px-4 rounded h-[20px]]'>
                                        Update Income Limit
                                    </button>

                                    {showLimitForm &&
                                        <form onSubmit={handleSubmit2(handleLimit)} className='absolute top-5 right-10 bg-slate-100  p-6 rounded-lg shadow-lg z-50'>
                                            <div className="mb-4  gap-2 justify-between items-center">
                                                <label htmlFor="billName" className="block text-sm font-semibold mb-2">Your Income</label>
                                                <input type="number" id="billName" className="block text-sm font-semibold mb-2" {...register2("income")} />
                                            </div>
                                            <div className="mb-4  gap-2 justify-between items-center">
                                                <label htmlFor="billAmount" className="block text-sm font-semibold mb-2">Your Daily Limit</label>
                                                <input type="number" id="billAmount" className="block text-sm font-semibold mb-2" {...register2("daily_limit")} />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Update</button>
                                            </div>
                                        </form>
                                    }
                                </div>
                                <div className='sm:flex mt-[64px] '>
                                    <div className='w-full   sm:w-72 h-36 border border-solid flex items-center justify-center shadow-md'>
                                        <div className='text-center'>
                                            <h1 className='text-2xl text-[#70ee70] font-bold'>₹ {limitData[0]?.income}</h1>
                                            <h3>Your Monthly Income</h3>
                                        </div>
                                    </div>
                                    <div className='w-full  sm:w-72 h-36 border border-solid flex items-center justify-center shadow-md'>
                                        <div className='text-center'>
                                            <h1 className='text-2xl text-[#FF0000] font-bold'>₹ {limitData[0]?.daily_limit}</h1>
                                            <h3>Your Daily Limit</h3>
                                        </div>
                                    </div>
                                </div>
                                {/* bar chart Limit */}
                                <div className='mt-3'>
                                    <BarChart1 getLimit={getLimit} limitData={limitData} />

                                    <div className='w-full sm:ml-10 sm:mt-2  sm:w-72 h-36 border border-solid flex items-center justify-center shadow-md'>
                                        <div className='text-center'>
                                            <h1 className='text-2xl text-blue-400 font-bold'>₹ {limitData[0]?.income - totalAmount}</h1>
                                            <h3>Remaining Balance</h3>
                                        </div>
                                    </div>
                                    {/* <BarChart2/> */}
                                </div>

                            </div>


                            {/* 3rd component Line */}

                            <div className='gap-4 border border-blue-300 relative rounded-lg'>
                                <div className='absolute right-0 top-0'>
                                    <button onClick={budgetForm} className='ml-auto bg-blue-500 mt-2 mr-2 hover:bg-green-300 text-white font-bold py-2 px-4 rounded h-[20px]]'>
                                        Update Budget Limit
                                    </button>

                                    {showBudgetForm &&
                                        <form onSubmit={handleSubmit3(handleCategory)} className='absolute top-5 right-10 bg-slate-100  p-6 rounded-lg shadow-lg'>
                                            <div className="">
                                                <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                                                    Category
                                                </label>
                                                <select
                                                    {...register3('category')}
                                                    id="category"
                                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                >
                                                    <option value="">Select Category</option>
                                                    {categoryData.map((ele, id) => (
                                                        <option key={id} value={ele.category}>
                                                            {ele.category}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div className="">
                                                <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                                                    Enter Budget Boundry
                                                </label>
                                                <input {...register3("budget_boundry")} type="number" id="billAmount" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder='2000' />

                                            </div>
                                            <div className="text-center mt-2">
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Update</button>
                                            </div>
                                        </form>
                                    }
                                </div>
                                {/* category  Limit */}
                                <div className='mt-[64px]'>
                                    <table className="min-w-min divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                    Budget Limit
                                                </th>
                                                <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                    Remaining Balance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {categoryData?.map((item, index) => {

                                                const correspondingPayment = categoryPayment.find(payment => payment?.category === item?.category);
                                                const remainingBalance = correspondingPayment ? item?.budget_boundry - correspondingPayment?.totalAmount : item?.budget_boundry;
                                                return (
                                                    <tr key={index}>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{item.category}</div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">₹ {item.budget_boundry}</div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap ">
                                                            <div className="text-sm text-gray-900 ">₹ {remainingBalance}</div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>


                                    {/* <BarChart2/> */}
                                </div>


                            </div>






                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Settings




{/* <section className='flex items-center w-full min-h-screen bg-no-repeat bg-center bg-cover'>
                <div className="flex flex-col lg:flex-row h-full">

                    <div className='w-full lg:w-1/5 bg-slack-50 lg:rounded-r-lg p-4 lg:p-10'>
                        <div className='mt-4 relative cursor-pointer'>
                            <button className='lg:hidden absolute top-0 right-4 text-xl focus:outline-none' onClick={toggleMenu}>
                                {showMenu ? <CiMenuBurger /> : <IoIosCloseCircle />}
                            </button>
                            <div className=''>
                                {!showMenu && <Menu />}
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full lg:w-full p-4 lg:p-10 border border-solid rounded-lg shadow-panelShadow">
                        <div className="w-full lg:w-full p-4 lg:p-10">
                            <div className="border border-solid p-4 rounded-lg  shadow-panelShadow">
                                <h2 className="text-lg font-semibold mb-4">My Details</h2>
                                <div className='flex rounded-lg'>
                                    <div className='w-full mr-4 flex gap-5'>
                                        <img src={user} className='rounded-full w-1/3' alt='User Avatar' />
                                        <div className='flex flex-col justify-center items-center gap-5'>
                                            <button className='bg-blue-500 hover:bg-green-500 text-white sm:font-medium text-[15px] sm:py-2 sm:px-4 p-1  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>Update Image</button>
                                            <button className='bg-red-500 hover:bg-green-500 text-white sm:font-medium text-[15px] sm:py-2 sm:px-4 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'>Delete Image</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <form className='mt-5'>
                                        <div className='flex flex-col md:flex-row items-start'>
                                            <div className='flex flex-col gap-5 mt-5 w-full md:w-[70%]'>
                                                <div className='w-full'>
                                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Your Name:</label>
                                                    <input type="text" className='border border-gray-300 rounded-md p-2 w-full text-[15px]' placeholder={userProfile?.firstname} />
                                                </div>
                                                <div className='w-full'>
                                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Your Email:</label>
                                                    <input type="text" className='border border-gray-300 rounded-md p-2 w-full text-[15px] ' placeholder={userProfile?.email} />
                                                </div>
                                                <div className='w-full'>
                                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Your Contact:</label>
                                                    <input type="text" className='border border-gray-300 rounded-md p-2 w-full text-[15px] ' placeholder={userProfile?.mobile_no} />
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-5 mt-5 md:mt-[20px] ml-0 md:ml-10'>
                                                <button type='button' className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto'>Update Profile</button>
                                                <button type='button' className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 w-full md:w-auto'>Delete Profile</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div>
                                    {showForm &&
                                        <div>
                                            <UpdateForm getUser={getUser} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

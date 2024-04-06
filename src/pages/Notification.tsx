import React, { useEffect, useState } from 'react'
import Menu from '../components/common/Menu'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import SplitBillTable from '../components/SplitBillTable'
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import useAxiosPrivate from '../axios/axiosPrivate'
import toast from 'react-hot-toast'
import { notification } from '../components/Filter'
import { FaMoneyBill1 } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { wait } from '@testing-library/user-event/dist/utils'

type Props = {}

type splitValue = {
    name: string,
    description: string,
    date: string,
    category: string,
    payment: number,
    status: string,
    mode: string,
    emails: [string]
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

type NotificationData = {
    name: string,
    description: string,
    payment: number,
    date: string
}

const Notification = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()

    const [category, setCategory] = useState<Category[]>([]);
    const [notificationData, setNotificationData] = useState<NotificationData[]>([])
    const [showMenu, setShowMenu] = useState<boolean>(true);
    const [data, setData] = useState<splitValue[]>([]);

    const getNotification = async () => {
        try {
            const res = await axiosPrivate.get("http://localhost:5000/api/v1/splitnotification")
            if (res && res.data.success) {
                setNotificationData(res.data.data)

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getNotification()
    }, [])

    // console.log(notificationData)









    const getAllSplitBill = async () => {
        try {
            const res = await axiosPrivate.get("/getsplitbill")
            if (res && res.data.success) {
                // console.log(res.data.data)
                setData(res.data.data)
            }else{
                toast.error("Something went wrong while getting the split bill!!")
            }
        } catch (error) {
            toast.error("Somthing went wrong while getting the split bill report!!")
        }
    }

    useEffect(() => {
        getAllSplitBill()

    }, [])


    useEffect(() => {
        try {
            axiosPrivate.get("/getCategory").then((response) => {
                // console.log(response.data.getCategory);
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
            <section className='relative flex flex-col lg:flex-row items-center w-full min-h-screen '>
                <div className='w-full lg:w-1/5 bg-slack-50 lg:rounded-r-lg p-4 lg:p-10'>
                    <div className='mt-4 relative cursor-pointer'>
                        <button className='lg:hidden absolute top-0 left-0 text-xl focus:outline-none' onClick={toggleMenu}>
                            {showMenu ? <IoIosCloseCircle /> : <CiMenuBurger />}
                        </button>
                        <div className=''>
                            {showMenu && <Menu notificationData={notificationData?.length} />}
                        </div>
                    </div>
                </div>
                <div className='sm:absolute flex top-0 right-10  flex-col items-center justify-center w-full lg:w-2/3 p-4 lg:p-5 rounded-lg'>
                    <div className='w-full lg:w-full p-4 lg:p-10'>
                        <div className='p-4 rounded-lg relative'>
                            <h2 className='text-lg font-semibold mb-4 text-start'>Notifications</h2>
                            <div>
                                {notificationData?.length === 0 ? (
                                    <h1>You have <span className='text-blue-500 font-semibold'>0</span> Notification!!</h1>
                                ) : (
                                    <h1>You have <span className='text-blue-500 font-semibold'>{notificationData?.length}</span> unread Notification!!</h1>
                                )}
                            </div>
                            <div className='md:absolute md:right-4 md:top-4'> {/* Adjusted for small screens */}
                                <button className='text-green-600 bg-green-100 rounded-md p-2 font-bold'>Mark all as read</button> {/* Changed "Mark as all read" to "Mark all as read" */}
                            </div>
                        </div>
                        {/* menu  */}
                        <div>
                            <div className='flex flex-col md:flex-row gap-5'> {/* Adjusted for small screens */}
                                <button className='bg-green-200 p-2'>All</button>
                                <button className='hover:bg-green-200 p-2'>New</button>
                            </div>
                        </div>
                        <hr className='bg-gray-900' />
                        {/* data  */}
                        <div>
                            {notificationData?.length === 0 ? (
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-gray-800">There is no Notification for you!!!</h1>
                                </div>
                            ) : (
                                notificationData.map((item, index) => (
                                    <div className='flex flex-col md:flex-row p-2 hover:bg-slate-100 justify-between' key={index}> {/* Added key prop and adjusted layout for small screens */}
                                        <div className='flex gap-4 justify-start items-center '>
                                            <div>
                                                <FaMoneyBill1 className='text-[25px] text-blue-500' />
                                            </div>
                                            <div>
                                                <h1 className='text-lg font-medium'>{item.name}</h1>
                                                <p className='text-sm text-textColor'>{item.description}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-evenly md:justify-between gap-4 md:gap-6 mt-2 md:mt-0'>
                                            <p className='text-textColor'>{item.date}</p>
                                            <p className='text-textColor'>{item.payment}</p>
                                            <button className='mb-4'><MdDelete className='text-[25px] text-red-500 hover:bg-red-200' /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </section>



        </>
    )
}

export default Notification
import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import useAxiosPrivate from '../../axios/axiosPrivate';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Datatable from '../../components/Datatable';
import DataTable from 'react-data-table-component';
import { FaAmazonPay } from 'react-icons/fa';

type Props = {}

type formValue = {
    name: string,
    date: Date,
    payment: string
}


const Dues = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [dues, setDues] = useState<formValue[]>([]);

    const form = useForm<formValue>();

    const { register, handleSubmit, formState, control, getValues } = form;
    const { errors } = formState

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen); // Toggle the state to open/close the form
    };

    const handleClose = () => {
        setIsFormOpen(!isFormOpen)
    }

    const getDues = async () => {
        try {
            const res = await axiosPrivate.get("/getDues")
            if (res && res.data.success) {
                setDues(res.data.data)
            } else {
                toast.error("Something went wrong while getting the Dues!!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data: formValue) => {
        try {
            const res = await axiosPrivate.post("/addDues", data)
            if (res && res.data.success) {
                toast.success("Dues added Successfully!!")
                getDues()
                setIsFormOpen(!isFormOpen)

                handleClose();
                console.log(res)
            } else {
                toast.error("Something went wrong while adding the dues!!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            name: 'Title',
            selector: (row: any) => row.name,
        },
        {
            name: 'End-Date',
            selector: (row: any) => row.date,
        },
        {
            name: 'Payment',
            selector: (row: any) => row.payment,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div className=" flex">
                    {/* <button className="px-2 py-2  text-white rounded whitespace-nowrap" >
                        <MdOutlinePreview className='text-green-500 text-[25px]' onClick={() => handleExpandRow(row)}/>
                    </button> */}
                    <button className=""><FaAmazonPay className='text-green-500 text-[30px]' /></button>
                </div>
            ),
            button: true
        }
    ];

    useEffect(() => {
        getDues()
    }, [])



    return (
        <div className='flex gap-10 flex-1 shadow-panelShadow '>
            <div className='sm:w-full w-3/4 sm:h-[500px] h-[550px] p-2 ' >
                <div className='flex h-[60px] p-2'>
                    <h1 className='text-start text-[25px] relative'>My Dues</h1>
                    <button onClick={toggleForm} className='ml-auto bg-blue-500 absolute right-0 hover:bg-green-300 text-white font-bold py-2 px-4 rounded h-[20px]]'>
                        Add Dues
                    </button>
                </div>
                {isFormOpen && (
                    <div className="bg-gray-100 p-4 absolute rounded mt-4 right-0 top-0 z-50 w-full md:w-1/2 max-w-md">
                        <IoCloseCircleOutline className='absolute top-0 right-0 text-[25px] cursor-pointer' onClick={handleClose} />
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                            <div className="mb-4">
                                <label className='block text-sm font-semibold'>Add Bill Name</label>
                                <input type="text" placeholder="Enter Bill Name" className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }
                                })} />
                                <p className='text-red-500 text-sm mt-1'>{errors.name?.message}</p>
                            </div>
                            <div className="mb-4">
                                <label className='block text-sm font-semibold'>Add Due Date</label>
                                <input type="date" placeholder="Enter Due Date" className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" {...register("date", {
                                    required: {
                                        value: true,
                                        message: "Date is required"
                                    }
                                })} />
                                <p className='text-red-500 text-sm mt-1'>{errors.date?.message}</p>
                            </div>
                            <div className="mb-4">
                                <label className='block text-sm font-semibold'>Add Payment</label>
                                <input type="number" placeholder="Enter Due Payment" className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" {...register("payment", {
                                    required: {
                                        value: true,
                                        message: "Payment is required"
                                    }
                                })} />
                                <p className='text-red-500 text-sm mt-1'>{errors.payment?.message}</p>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-300 font-bold">Submit</button>
                        </form>
                    </div>
                )}
                <div className='mt-2'>
                    <DataTable
                        pagination
                        columns={columns}
                        data={dues}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dues
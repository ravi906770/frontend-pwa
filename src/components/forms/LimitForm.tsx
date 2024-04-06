import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../axios/axiosPrivate';

type Props = {}

type Limit = {
    income: number,
    daily_limit: number,
    month: string
}

const LimitForm = (props: Props) => {

    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showLimitForm, setShowLimitForm] = useState(false);
    const [limitData, setLimitData] = useState<Limit[]>([])

    const currentDate = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = currentDate.getMonth(); // Zero-based index of the current month
    const currentMonthName = monthNames[currentMonthIndex];


    const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors2 }, getValues: getValues1 } = useForm<Limit>({
        defaultValues: {
            income: 0,
            daily_limit: 0,
            month: currentMonthName
        }
    });

    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const onSubmit = async (data: Limit) => {
        try {
            setIsLoading(true);
            const res = await axiosPrivate.post("http://localhost:5000/api/v1/addLimit", data)
            if (res && res.data.success) {
                toast.success("Limit Added Successfully!!!")
                getLimit()
                setShowLimitForm(!showLimitForm)
            } else {
                toast.error("Something went wrong while adding the limit!!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while adding the Limit!!")

        } finally {
            setIsLoading(false); // Set loading to false when request completes (either success or failure)
        }
    }


    const getLimit = async () => {
        try {
            const res = await axiosPrivate.get("http://localhost:5000/api/v1/getLimit")
            if (res && res.data.success) {
                setLimitData(res.data.data)
            } else {
                toast.error("Something went wrong while getting the limit!!")
            }
        } catch (error) {
            console.log(error);

        }
    }





    return (
        <div className="fixed sm:top-0 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="relative md:w-96 w-full max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
               
                <form onSubmit={handleSubmit1(onSubmit)} className='z-50 absolute top-3 right-10 bg-gray-200 p-6 rounded-lg shadow-lg'>
                    <div className="mb-4">
                        <label htmlFor="billName" className="block text-sm font-semibold mb-2">Your Income</label>
                        <input
                            type="number"
                            id="billName"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            {...register1("income", {
                                required: {
                                    value: true,
                                    message: "Income is required"
                                },
                                min: {
                                    value: 1,
                                    message: "Income must be greater than 0!!"
                                }
                            })}
                        />
                        <p className='text-red-700'>{errors2.income?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="billAmount" className="block text-sm font-semibold mb-2">Your Daily Limit</label>
                        <input
                            type="number"
                            id="billAmount"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            {...register1("daily_limit", {
                                required: {
                                    value: true,
                                    message: "Daily Limit is required"
                                },
                                min: {
                                    value: 1,
                                    message: "Daily Limit must be greater than 0!!"
                                },
                                validate: (daily_limit) => {
                                    if (daily_limit < getValues1("income")) {
                                        return true; // Validation passes
                                    } else {
                                        return "Daily Limit must be less than Income!!"; // Validation fails
                                    }
                                }
                            })}
                        />
                        <p className='text-red-700'>{errors2.daily_limit && errors2.daily_limit?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="month" className="block text-sm font-semibold mb-2">Month</label>
                        <select
                            id="month"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            {...register1("month", {
                                required: {
                                    value: true,
                                    message: "Month is required"
                                },
                            })}
                        >
                            {monthName.map((monthName, index) => (
                                <option key={index} value={monthName}>{monthName}</option>
                            ))}
                        </select>
                    </div>
                    <p className='text-red-700'>{errors2.month && errors2.month?.message}</p>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LimitForm
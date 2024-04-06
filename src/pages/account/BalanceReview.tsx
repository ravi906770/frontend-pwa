import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../axios/axiosPrivate';
import toast from 'react-hot-toast';
import { Circle } from 'rc-progress';

type Props = {}

type Limit = {
    income: number,
    daily_limit: number
}


const BalanceReview = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState("")
    const [dailyPaymentData, setDailyPaymentData] = useState<{ date: string; payment: number }[]>([]);
    const [transactionData, setTransactionData] = useState<{ month: string; payment: number }[]>([]);
    const [limitData, setLimitData] = useState<Limit[]>([])


    const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    }

    useEffect(() => {
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

        getLimit()
    }, [])

    const fetch = async () => {
        try {
            const response = await axiosPrivate.get('/transaction-payment');
            if (response && response.data.success) {
                const data = response.data.newTransactionObject;
                setTransactionData(data);
            } else {
                toast.error("Something went wrong while getting the Transaction Payment!!")
            }

        } catch (error) {
            console.error('Failed to fetch transaction data:', error);
        }
    }

    useEffect(() => {
        fetch()
    }, [])


    const handleDateSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value;
        const parts = selectedDate.split("-");
        const reversedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        setSelectedDate(reversedDate);

        try {
            const response = await axiosPrivate.get(`/dailydata`);


            if (response.data.success) {
                setDailyPaymentData(response.data.dailyPaymentData);
            } else {
                console.error('Failed to fetch daily payment data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    // filter for the getting the daily payment based on the selected month
    const filterData = selectedMonth ? transactionData.filter(item => parseInt(item.month) === parseInt(selectedMonth)) : transactionData


    // filter for the getting the daily payment based on the selected date
    const filterDailyData = dailyPaymentData?.filter(item => item.date === selectedDate)


    return (
        <div className='flex gap-10 flex-1 shadow-panelShadow'>
            <div className='sm:w-full w-full sm:h-[500px] h-[550px] p-2'>
                <h1 className='text-center text-[25px]'>Balance Review</h1>
                <div className='flex flex-col gap-6'>
                    <div className='mt-4   flex  rounded gap-4'>
                        <div className='bg-white text-textColor text-[15px]'>
                            <label>Select Date</label>
                            <input onChange={handleDateSelect} type="date" className='border border-solid border-primaryColor p-2 w-full h-[25px]' />
                        </div>
                    </div>
                    <div className='flex sm:gap-4 relative gap-10'>
                        <div className="relative inline-block ">
                            <h4>Daily Budget Limit</h4>
                            {
                                filterDailyData[0]?.payment ? (<Circle percent={((filterDailyData[0]?.payment) / (limitData[0]?.daily_limit)) * 100} strokeWidth={3} strokeColor={((filterDailyData[0]?.payment) / (limitData[0]?.daily_limit)) * 100 > 90 ? "#e53935" : "#4CAF50"} className='w-[125px]' />) :
                                    (<Circle percent={0} strokeWidth={3} strokeColor={((0) / (limitData[0]?.daily_limit)) * 100 > 90 ? "#e53935" : "#4CAF50"} className='w-[125px]' />)
                            }

                            {
                                filterDailyData[0]?.payment ? (<span className="absolute inset-0 flex justify-center items-center  top-5 text-[10px]">Total Usage : {(filterDailyData[0]?.payment)}</span>) :
                                    (<span className="absolute inset-0 flex justify-center items-center top-5  text-[10px]">Total Usage : {0}</span>)
                            }

                        </div>
                        <div className=' sm:absolute right-0 flex flex-col justify-end'>
                            <div>
                                <p className='text-textColor text-[15px]'>Budget Limit:</p>
                                <p className='text-primaryColor font-bold '>{limitData[0]?.daily_limit}</p>
                            </div>
                            <div>
                                <p className='text-textColor text-[15px]'>Total Usage:</p>
                                {
                                    filterDailyData[0]?.payment ? (<p className='text-green-500 font-bold '>{(filterDailyData[0]?.payment)}</p>) :
                                        (<p className='text-green-500 font-bold '>0</p>)
                                }

                            </div>
                            <div>
                                <p className='text-textColor text-[15px]'>Remaining Balance:</p>
                                <p className='text-red-500 font-bold '>{(limitData[0]?.daily_limit) - (filterDailyData[0]?.payment || 0)}</p>
                            </div>

                        </div>
                    </div>

                    {/* <div className="relative inline-block mt-4">
                                        <h4>Weekly Budget Limit</h4>
                                        <Line percent={20} strokeWidth={3} strokeColor="#F9A825" />
                                    </div> */}
                    {/* <div className="relative inline-block">
                                        <div className=' absolute right-0   '>
                                            <h4 className='text-[10px] '>Your Limit :50000</h4>
                                            <h4 className='text-[10px]'>Total Usage: {((totalAmount / 50000) * 100).toFixed(2)}%</h4>
                                        </div>
                                        <h4>Monthly Budget Limit</h4>
                                        <Circle percent={((totalAmount / 50000) * 100)} strokeWidth={3} strokeColor="#3A86FF" className='w-[125px]'/>
                                    </div> */}
                </div>

                <div className='flex gap-4'>
               

                    <div className="relative inline-block mt-4">
                        <h4>Monthly Review</h4>
                        <Circle percent={((filterData[0]?.payment / (limitData[0]?.income)) * 100)} strokeWidth={5} strokeColor={((filterData[0]?.payment) / (limitData[0]?.income)) * 100 > 90 ? "#e53935" : "#4CAF50"} className='w-[125px]' />
                        <span className="absolute inset-0 flex items-center justify-center text-[10px]">Total Usage : {filterData[0]?.payment}</span>
                    </div>


                    <div className='mt-9 '>
                        <div>
                            <p className='text-textColor text-[15px]'>Budget Limit:</p>
                            <p className='text-primaryColor font-bold '>{limitData[0]?.income}</p>
                        </div>
                        <div>
                            <p className='text-textColor text-[15px]'>Total Usage:</p>
                            <p className='text-green-500 font-bold '>{filterData[0]?.payment}</p>
                        </div>
                        <div>
                            <p className='text-textColor text-[15px]'>Remaining Balance:</p>
                            <p className='text-red-500 font-bold '>{(limitData[0]?.income) - (filterData[0]?.payment || 0)}</p>
                        </div>

                    </div>
                    <div className="relative inline-block mt-4 ">
                        <h4>Month</h4>
                        <div className='border border-solid w-[25px]'>
                            <select name="monthSelect" value={selectedMonth} className='bg-white text-textColor border border-solid font-semibold rounded h-8' onChange={handleMonthSelect}>
                                <option value="1">Jan</option>
                                <option value="2">Feb</option>
                                <option value="3">Mar</option>
                                <option value="4">Apr</option>
                                <option value="5">May</option>
                                <option value="6">Jun</option>
                                <option value="7">Jul</option>
                                <option value="8">Aug</option>
                                <option value="9">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default BalanceReview
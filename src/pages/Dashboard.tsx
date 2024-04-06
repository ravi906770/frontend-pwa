import React, { useEffect, useState } from 'react'
import Menu from '../components/common/Menu'
import PieChart from '../components/charts/PieChart'
import Datatable from '../components/Datatable'
import axios from 'axios'
import TransactionForm from '../components/forms/TransactionForm'
import LineChart from '../components/charts/LineChart'
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import useAxiosPrivate from '../axios/axiosPrivate'
import { useAuth } from '../context/authContext'
import { FaFilter } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { filter } from '../components/Filter'
import { IoClose } from 'react-icons/io5'
import BouncingLoader from '../components/loader/BouncingLoader'
import Month from '../components/carosuel/Month'
import LimitCard from '../components/cards/LimitCard'
import LimitForm from '../components/forms/LimitForm'


type Props = {}

type Movie = {
    _id: string;
    name: string;
    description: string;
    date: string;
    category: string;
    payment: number;
    status: string;
    mode: string
};

type Category = {
    category: string,
    totalAmount: number
}

type Limit = {
    income: number,
    daily_limit: number,
    month: string
}

type AllCategory = {
    category: string,
    budget_boundry: number
}

const Dashboard = (props: Props) => {

    const axiosPrivate = useAxiosPrivate();

    const [count, setCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [category, setCategory] = useState<AllCategory[]>([]);
    const [data, setData] = useState<Movie[]>([]);
    const [transactionData, setTransactionData] = useState<{ month: string; payment: number }[]>([]);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [limitData, setLimitData] = useState<Limit[]>([])
    const [showLimitForm, setShowLimitForm] = useState(false);
    const [showLimitForm1, setShowLimitForm1] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleClose = () => {
        setIsOpen(!isOpen);
        getAllTransaction()
    };

    const handleCatgoryClose = () => {
        setCategoryOpen(!categoryOpen)
    }

    const handleLimitForm = () => {
        setShowLimitForm(!showLimitForm)
    }

    const handleLimitUpdateForm = () => {
        setShowLimitForm1(!showLimitForm1)
    }


    const getAllCategory = async () => {
        try {
            const res = await axiosPrivate.get("http://localhost:5000/api/v1/getCategory")
            if (res && res.data.success) {
                setCategory(res.data.getCategory)
            }else{
                toast.error("Something went wrong while getting the Category!!")
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    // console.log();


    const getLimit = async () => {
        try {
            const res = await axiosPrivate.get("http://localhost:5000/api/v1/getLimit")
            if (res && res.data.success) {
                setLimitData(res.data.data)
            }else{
                toast.error("Something went wrong while getting the limit!!")
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getLimit()
    }, [])


    const currentDate = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = currentDate.getMonth(); // Zero-based index of the current month
    const currentMonthName = monthNames[currentMonthIndex];


    const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, getValues: getValues1 } = useForm<Limit>({
        defaultValues: {
            income: 0,
            daily_limit: 0,
            month: currentMonthName
        }
    });

    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, getValues: getValues2, reset } = useForm<Limit>({
        defaultValues: {
            income: 0,
            daily_limit: 0
        }
    });


    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm<AllCategory>({
        defaultValues: {
            category: "",
            budget_boundry: 0
        }
    });



    const onSubmit = async (data: Limit) => {
        try {
            setIsLoading(true);
            const res = await axiosPrivate.post("http://localhost:5000/api/v1/addLimit", data)
            if (res && res.data.success) {
                toast.success("Limit Added Successfully!!!")
                getLimit()
                setShowLimitForm(!showLimitForm)
            }else{
                toast.error("Something went wrong while adding the limit!!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while adding the Limit!!")

        }finally {
            setIsLoading(false); // Set loading to false when request completes (either success or failure)
        }
    }

    const handleCategory = async (data: AllCategory) => {
        try {
            setIsLoading(true)
            const res = await axiosPrivate.post("http://localhost:5000/api/v1/category", data)
            if (res.data.success) {
                toast.success("Category is added successfully!!")
                setCategoryOpen(!categoryOpen)
                getAllCategory()
            }else{
                toast.error("Something went wrong while adding the Category!!")
            }
        } catch (error) {
            toast.error("Something went wrong while Adding the Category!!")
        }finally {
            setIsLoading(false); // Set loading to false when request completes (either success or failure)
        }
    }

    const onSubmit2 = async (data: Limit) => {
        try {
            setIsLoading(true);
            const res = await axiosPrivate.put("http://localhost:5000/api/v1/updateLimit", data)
            if (res && res.data.success) {
                toast.success("Limit Updated Successfully!!")
                setShowLimitForm1(!showLimitForm1)
                getLimit()
            }else{
                toast.error("Something went wrong while adding the limit!!")
            }
        } catch (error) {
            toast.error("Something went wrong in updating limit!!")
        }finally {
            setIsLoading(false); // Set loading to false when request completes (either success or failure)
        }
    }




    const fetch = async () => {
        try {
            const response = await axiosPrivate.get('/transaction-payment');
            if(response.data.success){
                const data = response.data.newTransactionObject;
                setTransactionData(data);
            }else{
                toast.error("Something went wrong while getting the transaction payment!!")
            }
          
        } catch (error) {
            console.error('Failed to fetch transaction data:', error);
        }
    }


    const fetchCategory = async () => {
        try {
            const response = await axiosPrivate.get('/categoryPayment');
            if(response.data.success){
                const data = response.data.formatData;
                setCategoryData(data);
            }else{
                toast.error("Something went wrong while getting the Category payment!!")
            }
           
        } catch (error) {
            console.error('Failed to fetch transaction data:', error);
        }
    }




    // fetch all the transaction



    const getAllTransaction = async () => {
        try {
            const data = await axiosPrivate.get(`/getAllTransaction`)
            if(data && data.data.success){
                const transactionData = data.data.getTransaction;
                const totalCount = transactionData?.length
                setData(data.data.getTransaction)
                setCount(totalCount);
                setTotalAmount(data.data.totalPayment)
                fetchCategory()  // change the pie chart
                fetch()   // change the line chart 
            }else{
                toast.error("Something went wrong while getting the transaction!!")
            }
           
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getAllTransaction()
    }, []);



    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        reset({
            daily_limit: limitData[0]?.daily_limit,
            income: limitData[0]?.income
        })
    }, [limitData])


    // console.log(transactionData.length);



    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fields = [
        { label: 'Transaction Name', type: 'text', name: 'name' },
        { label: 'Description', type: 'text', name: 'description' },
        { label: 'Date', type: 'date', name: 'date' },
        { label: 'Category', type: 'select', name: 'category', options: category.map(category => ({ value: category.category, label: category.category })) },
        { label: 'Payment', type: 'number', name: 'payment' },
        { label: 'End Date', type: 'date', name: 'end_date' },
        { label: 'Status', type: 'select', name: 'status', options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }] },
        { label: 'Transaction Mode', type: 'select', name: 'mode', options: [{ value: 'online', label: 'Online' }, { value: 'offline', label: 'Offline' }] },
      ];


    return (
        <>
         {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center bg-gray-500 bg-opacity-50 items-center z-50">
                 <BouncingLoader/>
                 <div>
                 <span className="ml-2 text-white text-lg">Please Wait</span>
                 </div>
                
            </div>
           
        )}
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
                            {
                                limitData[0]?.income ? (<button onClick={handleLimitUpdateForm} className='absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update Limit</button>) : (<button onClick={handleLimitForm} className='absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Limit</button>)
                            }
{/* updateform */}
                            {showLimitForm1 &&
                                <form onSubmit={handleSubmit2(onSubmit2)} className='z-50 absolute top-5 right-10 bg-gray-200 p-6 rounded-lg shadow-lg'>
                                    <div className="mb-4">
                                        <label htmlFor="billName" className="block text-sm font-semibold mb-2">Your Income</label>
                                        <input type="number" id="billName" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register2("income", {
                                            required: {
                                                value: true,
                                                message: "Income is required"
                                            },
                                            min: {
                                                value: 1,
                                                message: "Income must be grater then 0!!"
                                            }
                                        })} />
                                        <p className='text-red-700'>{errors2.income?.message}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="billAmount" className="block text-sm font-semibold mb-2">Your Daily Limit</label>
                                        <input type="number" id="billAmount" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register2("daily_limit", {
                                            required: {
                                                value: true,
                                                message: "Daily_Limit is required"
                                            },
                                            min: {
                                                value: 1,
                                                message: "Daily Limit must be grater then 0!!"
                                            },
                                            validate: (daily_limit) => {
                                                return daily_limit < getValues2("income") || "Daily Limit must be less then Income!!"
                                            }
                                        })} />
                                    </div>
                                    <p className='text-red-700'>{errors2.daily_limit && errors2.daily_limit?.message}</p>


                                    <div className="text-center">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
                                    </div>
                                </form>


                            }
{/* limitaddform  */}
                            {showLimitForm &&
                                <form onSubmit={handleSubmit1(onSubmit)} className='z-50 absolute top-3 right-10 bg-gray-200 p-6 rounded-lg shadow-lg'>
                                    <div className="mb-4">
                                        <label htmlFor="billName" className="block text-sm font-semibold mb-2">Your Income</label>
                                        <input type="number" id="billName" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register1("income", {
                                            required: {
                                                value: true,
                                                message: "Income is required"
                                            },
                                            min: {
                                                value: 1,
                                                message: "Income must be grater then 0!!"
                                            }
                                        })} />
                                        <p className='text-red-700'>{errors1.income?.message}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="billAmount" className="block text-sm font-semibold mb-2">Your Daily Limit</label>
                                        <input type="number" id="billAmount" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register1("daily_limit", {
                                            required: {
                                                value: true,
                                                message: "Daily_Limit is required"
                                            },
                                            min: {
                                                value: 1,
                                                message: "Daily Limit must be grater then 0!!"
                                            },
                                            validate: (daily_limit) => {
                                                if (daily_limit < getValues1("income")) {
                                                    return true; // Validation passes
                                                } else {
                                                    return "Daily Limit must be less than Income!!"; // Validation fails
                                                }
                                            }
                                        })} />
                                    </div>
                                    <p className='text-red-700'>{errors1.daily_limit && errors1.daily_limit?.message}</p>
                                    <div className="mb-4">
                                        <label htmlFor="month" className="block text-sm font-semibold mb-2">Month</label>
                                        <select id="month" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register1("month", {
                                            required: {
                                                value: true,
                                                message: "Month is required"
                                            },
                                        })}>
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
                                // <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                                // <LimitForm/>
                                // </div>
                            }
                        </div>
                  
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {/* First Line */}
                            <div className='col-span-full'>
                            <Month fetch= {fetch} transactionData = {transactionData}/>
                            </div>
                            
                            {/* <div className='w-full sm:w-72 h-36 border border-solid flex items-center justify-center shadow-panelShadow'>
                                <div className='text-center'>
                                    {
                                        limitData[0]?.income ? (<h1 className='text-2xl text-[#FF6384] font-bold'>₹ {limitData[0]?.income}</h1>) : (<h1 className='text-2xl text-[#FF6384] font-bold'>₹ 0</h1>)
                                    }

                                    <h3>Total Income</h3>
                                </div>
                            </div> */}
                            <LimitCard data={limitData[0]?.income} title="Total Income"  textColor="text-[#FF6384]"/>
                            <LimitCard data= {totalAmount} title="Total Expense" textColor="text-blue-500"/>
                            <LimitCard data={limitData[0]?.income - totalAmount} title="Total Balance" textColor="text-[#83b632]"/>
                            <LimitCard data={count} title="Total Transactions" textColor="text-[#ff944d]"/>
                            <div className='absolute  lg:top-0 right-4 lg:right-0 lg:relative  sm:mt-0 mt-[800px]'>
                                <div className='flex gap-3'>
                                    {
                                        category?.length <= 0 ? (<button onClick={() => setCategoryOpen(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                            Add Category
                                        </button>) : (
                                            <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                Add Transaction
                                            </button>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Second Line */}
                            <div className='col-span-full mt-8 sm:col-span-2 lg:col-span-full'>
                                {/* Transaction Table */}
                                <div className='relative'>
                                    <Datatable data={data} setData={setData} getAllTransaction={getAllTransaction} />
                                    {isOpen && (
                                        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                                            <TransactionForm handleClose={handleClose} />

                                        </div>
                                    )}
                                    

                                    {
                                        categoryOpen && (
                                            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                                <div className="relative md:w-96 w-full max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                                                    <div className="relative">
                                                        <button className='absolute right-0 top-0 text-[20px]' onClick={handleCatgoryClose}><IoClose /></button>
                                                    </div>
                                                    <form onSubmit={handleSubmit3(handleCategory)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor="category" className="block text-sm font-semibold mb-2">Select Category</label>
                                                            <select className="w-full bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register3("category", {
                                                                required: "Category is required!!",
                                                            })}>
                                                                <option value="">Select category</option>
                                                                {filter.map((item, id) => (
                                                                    <option value={item.category} key={item._id}>{item.category}</option>
                                                                ))}
                                                            </select>
                                                            <p className='text-red-700'>{errors3.category?.message}</p>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="budget" className="block text-sm font-semibold mb-2">Enter Budget</label>
                                                            <input type="number" id="budget" className="w-full bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register3("budget_boundry", {
                                                                required: "Budget Boundary is required!!",
                                                                min: { value: 1, message: "Minimum value is must be 1!" },
                                                                validate: (budget_boundry) => {
                                                                    return budget_boundry < getValues2("income") || "Budget Boundary must be less than Your Income!";
                                                                }
                                                            })} />
                                                            <p className='text-red-700'>{errors3.budget_boundry?.message}</p>
                                                        </div>
                                                        <div className="col-span-2 text-center">
                                                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>

                            {/* Third Line */}
                            <div className='col-span-full mt-8 lg:col-span-full'>
                                {/* Line Chart */}
                                <div className='grid grid-cols-1 sm:grid-cols-2'>
                                    <div className='shadow-panelShadow bg-white p-3'>
                                        {
                                            categoryData.length == 0 ?
                                                (<>
                                                    <div className="flex flex-col items-center justify-center">
                                                        <h1 className="text-2xl font-bold mb-4">Nothing to Show Here...</h1>
                                                        <p className="mb-4">Please <Link to="/account" className="text-blue-500 underline">Add Category</Link> First!!!</p>
                                                    </div>
                                                </>
                                                )
                                                :
                                                (<PieChart categoryData={categoryData} fetchCategory={fetchCategory} />)
                                        }

                                    </div>
                                    <div className='mt-8 sm:mt-0 sm:ml-4'>
                                        <div className='lg:shadow-panelShadow bg-white p-3 sm:block hidden'>
                                            {
                                                (!transactionData || transactionData.every(transaction => transaction.payment === 0)) ? (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <h1 className="text-2xl font-bold mb-4">Nothing to Show Here...</h1>
                                                        <p className="mb-4">Please <span className='text-blue-500 underline'>Add Transaction</span>  First!!!</p>
                                                    </div>
                                                ) : (
                                                    <LineChart fetch={fetch} transactionData={transactionData} />
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Dashboard
import React, { useEffect, useState } from 'react'
import Menu from '../../components/common/Menu'
import { Circle, Line } from 'rc-progress';
import atm from "../../assets/bank3.jpg"
import 'react-calendar/dist/Calendar.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiFillBank } from "react-icons/ai";
import mastercard from "../../assets/mastercard.svg"
import { CiCircleChevDown } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import FakeChart3 from '../../components/charts/FakeChart3'
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { FaAmazonPay } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import useAxiosPrivate from '../../axios/axiosPrivate';
import toast from 'react-hot-toast';
import { filter } from '../../components/Filter';
import { TbCategory2 } from "react-icons/tb";
import CategoryReview from './CategoryReview';
import BalanceReview from './BalanceReview';
import Dues from './Dues';


type Props = {}
type ValuePiece = Date | null;

type formValue = {
    name: string,
    date: Date,
    payment: string
}

type Category = {
    category: string,
    totalAmount: number
}

type Limit = {
    income: number,
    daily_limit: number
}


type CategoryBudget = {
    category: string,
    budget_boundry: number
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


const Main = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()

    const colors = [
        '#FF6384', // Red
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#8A2BE2', // Purple
        '#20B2AA', // Light Sea Green
        '#FF7F50', // Coral
        '#32CD32', // Lime Green
        '#FFD700',  // Gold
        '#A52A2A'
    ];

    const [showForm, setShowForm] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [budget, setBudget] = useState<CategoryBudget[]>([]);
    const [dues, setDues] = useState<formValue[]>([]);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [transactionData, setTransactionData] = useState<{ month: string; payment: number }[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [dailyPaymentData, setDailyPaymentData] = useState<{ date: string; payment: number }[]>([]);
    const [selectedMonth, setSelectedMonth] = useState("")
    const [limitData, setLimitData] = useState<Limit[]>([])
    const [openForm, setOpenForm] = useState(false)
    const [category, setCategory] = useState("")
    const [budget_boundry, setBudget_Boundry] = useState(0)


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


    const form = useForm<formValue>();

    // register 
    const { register, handleSubmit, formState, control, getValues } = form;
    const { errors } = formState


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


    const fetchCategory = async () => {
        try {
            const response = await axiosPrivate.get('/categoryPayment');
            if (response && response.data.success) {
                const data = response.data.formatData;
                setCategoryData(data);
            } else {
                toast.error("Something went wrong while getting the Category Payment!!")
            }

        } catch (error) {
            console.error('Failed to fetch transaction data:', error);
        }
    }


    const fetchBudget = async () => {
        try {
            const res = await axiosPrivate.get("/categoryBudget")
            if (res && res.data.success) {
                const data = res.data.data
                setBudget(data);
            } else {
                toast.error("Something went wrong while getting the Category Budget!!")
            }

        } catch (error) {
            console.log(error)
        }
    }


    const getAllTransaction = async () => {
        try {
            const data = await axiosPrivate.get("/getAllTransaction")
            if (data && data.data.success) {
                setTotalAmount(data.data.totalPayment)
            } else {
                toast.error("Something went wrong while getting the transaction!!")
            }
        } catch (error) {
            console.log(error);

        }
    }

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



    const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    }


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
    };;


    // filter for the getting the daily payment based on the selected month
    const filterData = selectedMonth ? transactionData.filter(item => parseInt(item.month) === parseInt(selectedMonth)) : transactionData


    // filter for the getting the daily payment based on the selected date
    const filterDailyData = dailyPaymentData?.filter(item => item.date === selectedDate)

    // console.log(filterDailyData);



    useEffect(() => {
        fetchBudget()
        fetchCategory()
        getDues()
        getAllTransaction()
        fetch()
    }, [])

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen); // Toggle the state to open/close the form
    };
    const handleClose = () => {
        setShowForm(!showForm)
    }
    const handleFormClose = () => {
        setIsFormOpen(!isFormOpen)
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const formHandler = () => {
        setOpenForm(!openForm)
    }

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosPrivate.post("http://localhost:5000/api/v1/category", { category, budget_boundry })
            if (res && res.data.success) {
                toast.success("Category added succssfully!!")
                setOpenForm(!openForm)

            }
            if (!res.data.success) {
                toast.success("Category is already Exits!!")
            }
        } catch (error) {
            toast.error("Something went wrong!!")
        }


    }

    // const getCategory = async () => {
    //     try {
    //         const response = await axiosPrivate.get('http://localhost:5000/api/v1/getCategory');
    //         const data = response.data.getCategory;
    //         setCategoryData(data);
    //     } catch (error) {
    //         console.error('Failed to fetch transaction data:', error);
    //     }
    // }


    return (
        <>
            <section className='flex items-center w-full min-h-screen bg-no-repeat bg-center bg-cover' >
                <div className="flex flex-col lg:flex-row h-full">
                    <div className='sm:w-full lg:w-1/5 w-3/4 bg-slack-50 lg:rounded-r-lg p-4 lg:p-10'>
                        <div className='mt-4 relative cursor-pointer'>
                            <button className='lg:hidden absolute top-0 left-0 text-xl focus:outline-none' onClick={toggleMenu}>
                                {showMenu ? <CiMenuBurger /> : <IoIosCloseCircle />}
                            </button>
                            <div className=''>
                                {!showMenu && <Menu />}
                            </div>

                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 gap-10 mt-5 flex flex-col justify-center ml-3">
                        {/* First Line */}
                       
                        <CategoryReview />
                        <BalanceReview />
                        <Dues/>

                       
                       
                        {/* Second Line */}
                        <div className='col-span-4'>
                            <div className='sm:grid sm:grid-cols-4 gap-5 flex flex-col'>
                                <div className=" col-span-2 w-full border border-solid relative overflow-x-auto shadow-panelShadow bg-white">   
                                    <div className="w-full p-2 sm:block hidden">
                                        <h1 className='text-start text-[25px]'>Daily Review</h1>
                                        <FakeChart3 />
                                    </div>
                                    <div className='absolute top-0 right-0  p-2'>
                                        <h1>Select Month</h1>
                                        <div className='border border-solid '>
                                            <select name="monthSelect" className='bg-primaryColor text-white font-semibold rounded h-8'>
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </select>
                                        </div>

                                    </div>

                                </div>
                                {/* <div className=" col-span-1 w-full border border-solid">
                                    <div className="w-full">
                                        <h1>Stokes</h1>
                                    </div>
                                </div> */}

                            </div>
                        </div>

                        {/* Third Line */}
                        {/* <div className='col-span-4'>
                            <div className=' grid grid-cols-2'>
                                <div className='col-span-1 w-full border border-solid'>
                                    <h1>Upcoming Dues</h1>
                                </div>
                                <div className="ml-4 col-span-1 w-full border border-solid">
                                    <div className="w-full">
                                        <h1>Stokes</h1>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

        </>
    )
}

export default Main
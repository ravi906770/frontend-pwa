import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../axios/axiosPrivate'
import toast from 'react-hot-toast'
import { filter } from '../../components/Filter'
import { TbCategory2 } from 'react-icons/tb'
import { Line } from 'rc-progress'
import { IoCloseCircleOutline } from 'react-icons/io5'

type Props = {}

type Category = {
    category: string,
    totalAmount: number
}

type CategoryBudget = {
    category: string,
    budget_boundry: number
}

const CategoryReview = (props: Props) => {

    const axiosPrivate = useAxiosPrivate()


    const [openForm, setOpenForm] = useState(false)
    const [category, setCategory] = useState("")
    const [budget_boundry, setBudget_Boundry] = useState(0)
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [budget, setBudget] = useState<CategoryBudget[]>([]);

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

    useEffect(() => {
        fetchBudget()
        fetchCategory()
    }, [])


    const formHandler = () => {
        setOpenForm(!openForm)
    }

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

    const handleClose =()=>{
        setOpenForm(!openForm)
    }


    return (
        <div className='flex  gap-10 shadow-panelShadow'>
            <div className='w-full h-[500px] relative p-2' >
                <div className='flex p-1'>
                <h1 className='text-center text-[25px] p-1'>Category</h1>
                <div className='absolute right-4 mt-2'>
                    <button onClick={formHandler} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Category</button>
                    {
                        openForm &&
                        <div className='fixed justify-center items-center bg-white p-8 rounded-lg shadow-lg md:w-96 sm:w-full w-[200px] md:max-w-md z-50'>
                            <IoCloseCircleOutline className='absolute top-0 right-0 text-[25px] cursor-pointer' onClick={handleClose} />
 <form onSubmit={handleSubmitForm} className="">
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-semibold mb-2">Select Category</label>
                                <select onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                                    <option value="">Select category</option>
                                    {filter.map((item, id) => (
                                        <option value={item.category} key={item._id}>{item.category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="budget" className="block text-sm font-semibold mb-2">Enter Budget Boundary</label>
                                <input onChange={(e) => setBudget_Boundry(parseInt(e.target.value))} type="number" id="budget" className="w-full bg-gray-100 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none">
                                    Submit
                                </button>
                            </div>
                        </form>
                        </div>
                       




                    }
                </div>
                </div>
               
                <div className='m-5 p-2 flex flex-col gap-1 mt-[50px]'>
                    {

                        categoryData.map((item, index) => {
                            var budgetAmount = 0;
                            for (let index = 0; index < budget.length; index++) {
                                const element = budget[index];
                                if (element.category === item.category) {
                                    budgetAmount = element.budget_boundry
                                }
                            }
                            return (
                                <>
                                    <div className="flex items-center relative" key={index}>
                                        <TbCategory2 className='text-green-400 mr-2 text-[20px]' />
                                        {/* <CiBookmarkPlus className="text-green-500 mr-2 text-[25px]" onClick={handleIconClick} /> */}
                                        <h1>{item.category}</h1>
                                        <div className='absolute right-0  rounded'>
                                            <h4 className='text-[10px] font-bold'>Your Limit :{budgetAmount}</h4>
                                            {
                                                item.totalAmount <= 0 ? (<h4 className='text-[10px]'>Total Usage:{0}</h4>)
                                                    : (<h4 className='text-[10px]'>Total Usage: {((item.totalAmount / budgetAmount) * 100).toFixed(2)}%</h4>)
                                            }

                                        </div>

                                    </div>
                                    {
                                        item.totalAmount === 0 ? (
                                            <Line percent={0} strokeWidth={3} strokeColor={colors[index % colors.length]} />
                                        ) : (
                                            <Line percent={(item.totalAmount / budgetAmount) * 100} strokeWidth={3} strokeColor={((item.totalAmount / budgetAmount) * 100) > 90 ? "#e53935" : colors[index % colors.length]} />
                                        )
                                    }

                                    
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryReview
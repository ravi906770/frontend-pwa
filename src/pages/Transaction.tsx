import { Link, useNavigate } from 'react-router-dom';
// import BarChart from '../components/BarChart';
import PieChart from '../components/charts/PieChart';
import bg from "../assets/hero-bg.png";
// import heroImg01 from "../assets/hero-img05.avif";
import { Filters } from '../components/Filter';
import { dummy } from '../components/Filter';
import LineChart from '../components/charts/LineChart';
import { FaFilter } from "react-icons/fa";
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Menu from '../components/common/Menu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
// import Datepicker from "react-tailwindcss-datepicker";
import { useAuth } from '../context/authContext';
import useAxiosPrivate from '../axios/axiosPrivate';
type Props = {};


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




const Transaction = (props: Props) => {

  type formValue = {
    name : string,
    description : string,
    date : Date,
    category:string,
    payment : number,
    end_date : string,
    status : string,
    mode : string
}

  const {auth} = useAuth()

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([])
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [flterTransaction, setFilterTransaction] = useState<Transaction[]>([]);
  const [transactionData, setTransactionData] = useState<{ month: string; payment: number }[]>([]);

  const [Open, setOpen] = useState(false);

  console.log(categories);
  


  const [val, setVal] = useState({
    startDate: new Date(),
    endDate: new Date()
});

const handleValueChange = (newValue : any )=> {
    console.log("newValue:", newValue);
    setVal(newValue);
};


  // const toggleDrop = () => {
  //   setOpen(!Open);
  // };



  const dropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm<formValue>({})

  const {register , handleSubmit ,setValue, formState} = form;

  const {errors} = formState

  const navigate = useNavigate()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    try {
      axiosPrivate.get("/getCategory").then((response) => {
        console.log(response.data.getCategory);
        setCategories(response.data.getCategory)

        // console.log(categories[0].category);

      }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onSubmit = async ( data : formValue) => {
    try {
      const res = await axiosPrivate.post(`/transaction`,data )
      if (res && res.data.success) {
        setShowForm(false);
        setTransaction([res.data.newTransaction, ...transaction]);
        fetch()
        // fetchCategory()
        setValue('name',"")
        setValue('category',"")
        setValue('date',new Date())
        setValue('description',"")
        setValue('end_date','')
        setValue('mode',"")
        setValue('payment',0)
        setValue('status',"")
        
      }
    } catch (error) {
      console.log(error);
    }

  }
  const fetch = async () => {
    try {
      const response = await axiosPrivate.get('/transaction-payment');
      const data = response.data.newTransactionObject;
      // const sortedData = data.sort((a: { month: string }, b: { month: string }) => {
      //   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      //   return months.indexOf(a.month) - months.indexOf(b.month);
      // });
      setTransactionData(data);
    } catch (error) {
      console.error('Failed to fetch transaction data:', error);
    }
  }

  
  const getallTransaction = async() => {
    try {
     await axiosPrivate.get("/getAllTransaction").then((response) => {
        // console.log(response.data.getTransaction);
        setTransaction(response.data.getTransaction)

      }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getallTransaction();
    fetch()
  }, [])


  const handleDelete = async (id: string) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this transaction ? ");
      if (!answer) return;
      const { data } = await axiosPrivate.delete(
        `/delete-transaction/${id}`
      );
      getallTransaction();
      fetch()
      // fetchCategory()
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  const toggleForm = (): void => {
    setShowForm(!showForm);
  };


  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLowTransactions = async () => {
    const temp = [...transaction]
    setFilterTransaction(temp.slice().sort((p1, p2) => (p1.payment < p2.payment) ? -1 : (p1.payment > p2.payment) ? 1 : 0));


  }

  const handleFilterhigh = async () => {
    try {
      const res = await axiosPrivate.get("/high-transaction")
      setFilterTransaction(res.data.sorted)
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategory = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: string = event.target.value;
    setFilterTransaction(transaction.filter((ele) => ele.category == selectedValue))
  }


    const handleStatus = async(event: ChangeEvent<HTMLSelectElement>)=>{
      const selectedValue: string = event.target.value.toLowerCase();
        setFilterTransaction(transaction.filter((ele) => ele.status == selectedValue))
    
    }


  //   const handleDateFilter = () => {
  //     const startDate = val.startDate;
  //     const endDate = val.endDate;

  //     const filteredData = transaction.filter(transaction => {
  //         const transactionDate = transaction.date;
  //         return transactionDate >= (startDate.toDateString()) && transactionDate <= (endDate.toDateString());
  //     });
  //     setFilterTransaction(filteredData);
  // };

  const handleRemoveFilters = async () => {
    setFilterTransaction([])
  }




  return (
    <>
      <section className="flex items-center bg-no-repeat bg-center bg-cover min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex flex-col lg:flex-row h-full">
          <div className="w-[20px] lg:w-1/4 bg-slack-50 lg:rounded-r-lg p-4 lg:p-10">
            <div className="mt-4 relative">

              <Menu />

            </div>
          </div>

          <div className="flex-1 p-4 lg:p-10">
            <div className="relative ml-[860px]">
              <button onClick={toggleForm} className="bg-blue-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
                Add Transaction
              </button>
              {showForm && (
                <div className="absolute top-10 right-0 z-10 bg-white p-8 rounded-lg shadow-lg">
                  {/* Your form elements go here */}
                  <form className="space-y-1 w-[500px]" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Example input field */}
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Transaction Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        {...register("name",{
                          required :{
                            value  : true,
                            message : "Name is required!!"
                          }
                        })}
                      />
                    </div>
                    <p className='text-red-700'>{errors.name?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                      type='text'
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        {...register("description",{
                          required :{
                            value  : true,
                            message : "Description is required!!"
                          }
                        })}
                      />
                    </div>
                    <p className='text-red-700'>{errors.description?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        {...register("date",{
                          required :{
                            value  : true,
                            message : "Date is required!!"
                          }
                        })}
                      />
                    </div>
                    <p className='text-red-700'>{errors.date?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        // value={category}
                        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        {...register("category",{
                          required :{
                            value  : true,
                            message : "Atleast One category is required!!"
                          }
                        })}
                      >
                        <option value="">Select Category</option>
                        {categories.map((ele, id) => {
                          return <option key={id} value={ele.category}>{ele.category}</option>

                        })}
                        {/* 
                        <option value="category1">Food</option>
                        <option value="category2">Shopping</option>
                        <option value="category3">Travel</option> */}
                      </select>
                    </div>
                    <p className='text-red-700'>{errors.category?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Payment
                      </label>
                      <input
                        type="number"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                        {...register("payment",{
                          required :{
                            value  : true,
                            message : "Payment is required"
                          },
                          min : {
                            value : 0,
                            message : " value must be greater than 0"
                          }
                        })}
                      />
                    </div>
                    <p className='text-red-700'>{errors.payment?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        End-Date
                      </label>
                      <input
                        type="date"
                       
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        {...register("end_date",{
                          required :{
                            value  : true,
                            message : "End-date is required"
                          }
                        })}
                      />
                    </div>
                    <p className='text-red-700'>{errors.end_date?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                        {...register("status",{
                          required :{
                            value  : true,
                            message : "Status is required"
                          }
                        })}
                      >
                        <option value="">Transaction Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <p className='text-red-700'>{errors.status?.message}</p>
                    <div>
                      <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                        Transaction Mode
                      </label>
                      <select
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        {...register("mode",{
                          required :{
                            value  : true,
                            message : "Mode is required"
                          }
                        })}
                      >
                        <option value="">Transaction Mode</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <p className='text-red-700'>{errors.mode?.message}</p>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-green-400 text-white font-bold mt-10 py-2 px-4 rounded focus:outline-none"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="p-4 justify-between items-center">
              <LineChart fetch={fetch} transactionData={transactionData} />
            </div>
            <div className="h-96  p-4 overflow-hidden">
              <div className='flex justify-between items-center '>
                <div> <h1 className="text-4xl text-headingColor">Transactions</h1>
                </div>
                <div className="relative inline-block text-left" >
                  <div className="flex items-center" onClick={toggleDropdown} >

                    <FaFilter className="w-full cursor-pointer" />
                  </div>
                  <div ref={dropdownRef}  className={`absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y  rounded-md shadow-lg outline-none ${isOpen ? '' : 'hidden'} hover:visible`}>
                    <div className='flex flex-col py-1'>
                      <button className='m-3 hover:bg-blue-500 hover:text-white rounded justify-center text-center p-1' onClick={handleLowTransactions}>Low Amount transaction</button>
                      <button className='m-3 hover:bg-blue-500 rounded  hover:text-white justify-center text-center p-1' onClick={handleFilterhigh}>High Amount transaction</button>

                      <div className="relative w-full lg:max-w-sm flex items-center">
                        <button className='m-3 hover:bg-blue-500 rounded  hover:text-white justify-center text-center p-1' >Category  </button>
                          <select className="w-full p-2.5 text-black -500 shadow-sm outline-none appearance-none border border-solid border-[#000000] rounded" onChange={handleCategory}>
                            {
                              categories.map((e) =>
                                <>
                                  <option value={e.category}>{e.category}</option>
                                </>
                              )
                            }
                          </select>
                      
                      </div>

                      <div className="relative w-full lg:max-w-sm flex items-center">
                        <button className='m-3 hover:bg-blue-500 rounded  hover:text-white justify-center text-center p-1' >Status</button>
                          <select className="w-full p-2.5 text-black -500 shadow-sm outline-none appearance-none border border-solid border-[#000000] rounded" onChange={handleStatus}>
                          <option value={"pending"}>Pending</option>
                          <option value={"completed"}>Completed</option>
                          </select>
                      
                      </div>
                      <button  type= "button" className='m-3 hover:bg-blue-500 hover:text-white rounded justify-center text-center p-1'  >
                      {/* <Datepicker value={val} onChange={handleValueChange} /> */}
                      </button>



                      {/* <button className='m-3 hover:bg-blue-500 rounded  hover:text-white justify-center text-center p-1'>Date</button> */}

            

                      <button className='m-3 bg-red-500 text-white hover:text-white rounded justify-center text-center p-1' onClick={handleRemoveFilters}>Remove Filters</button>
                    </div>
                    {/* <div className="py-1">
                      
                      <button className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLowTransactions}>Low Amount Transaction</button>
                      <button className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleFilterhigh}>High Amount Transaction</button>
                      <div className='relative'>
                      <button className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleDrop}>Status
                        {Open && (
                           <div className="absolute top-5  mt-2 bg-white">
                           Your dropdown content here
                           <button onClick={handleComplete} className=" cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-400">
                             Completed
                           </button>
                           <button onClick={handlePending} className=" cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-400">
                             Pending
                           </button>
                           
                           
                         </div>
                        )}
                       
                      </button>
                      </div>
                     
                        </div>*/}
                  </div>
                </div>
              </div>

              <div className="max-h-80 mt-10 overflow-y-auto">
                <table className=" w-full border-collapse border border-gray-800">
                  <thead className="">
                    <tr className="border-blue-400 text-primaryColor">
                      <th className="border border-blue-400 px-4 py-2">Id</th>
                      <th className="border border-blue-400 px-4 py-2">Name</th>
                      <th className="border border-blue-400 px-4 py-2">Description</th>
                      <th className="border border-blue-400 px-4 py-2">Date</th>
                      <th className="border border-blue-400 px-4 py-2">Category</th>
                      <th className="border border-blue-400 px-4 py-2">Payment</th>
                      <th className="border border-blue-400 px-4 py-2">End Date</th>
                      <th className="border border-blue-400 px-4 py-2">Status</th>
                      <th className="border border-blue-400 px-4 py-2">Mode</th>
                      <th className="border border-blue-400 px-4 py-2">Action</th>
                      <th className="border border-blue-400 px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flterTransaction.length === 0 && transaction.map((transaction, index) => (
                      <tr className="">
                        <td className="border border-blue-400 px-4 py-2">{index}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.name}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.description}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.date as unknown as string}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.category}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.payment}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.end_date as unknown as string}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.status}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.mode}</td>
                        <td className="border border-blue-400 px-4 py-2">
                          <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                            Update
                          </button>
                        </td>
                        <td className="border border-blue-400 px-4 py-2">
                          <button onClick={() => handleDelete(transaction._id)} className='bg-red-500 text-white px-4 py-2 rounded'>
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}
                    {flterTransaction.map((transaction, index) => (
                      <tr className="">
                        <td className="border border-blue-400 px-4 py-2">{index}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.name}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.description}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.date as unknown as string}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.category}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.payment}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.end_date as unknown as string}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.status}</td>
                        <td className="border border-blue-400 px-4 py-2">{transaction.mode}</td>
                        <td className="border border-blue-400 px-4 py-2">
                          <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                            Update
                          </button>
                        </td>
                        <td className="border border-blue-400 px-4 py-2">
                          <button onClick={() => handleDelete(transaction._id)} className='bg-red-500 text-white px-4 py-2 rounded'>
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Transaction;

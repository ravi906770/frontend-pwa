// import React, { useEffect, useState } from 'react'
// import Menu from '../components/Menu'
// import bg from "../assets/hero-bg.png"
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
// import Datatable from '../components/Datatable'
// import { Circle, Line } from 'rc-progress';
// import atm from "../assets/bank3.jpg"
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
// import { CiBookmarkPlus } from "react-icons/ci";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { AiFillBank } from "react-icons/ai";
// import mastercard from "../assets/mastercard.svg"
// import { CiCircleChevDown } from "react-icons/ci";
// import { LuSend } from "react-icons/lu";
// import Duetable from '../components/DueTable'
// import AddDueForm from '../components/AddDueForm'
// import FakeChart3 from '../components/FakeChart3'
// import axios from 'axios'
// import { useForm } from 'react-hook-form'
// import DataTable from 'react-data-table-component'
// import { FaAmazonPay } from "react-icons/fa";
// import useAxiosPrivate from '../axios/axiosPrivate'
// import toast from 'react-hot-toast'

// type Props = {}
// type ValuePiece = Date | null;

// type formValue = {
//     name: string,
//     date: Date,
//     payment: string
// }

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type Category = {
//     category: string,
//     totalAmount: number
// }

// type CategoryBudget = {
//     category: string,
//     budget_boundry: number
// }
// const columns = [
// 	{
// 		name: 'Title',
// 		selector: (row : any) => row.name,
// 	},
// 	{
// 		name: 'End-Date',
// 		selector: (row : any) => row.date,
// 	},
//     {
// 		name: 'Payment',
// 		selector: (row : any) => row.payment,
// 	},
//     {
//         name : "Actions",
//         cell: (row: any) => (
//             <div className=" flex">
//             {/* <button className="px-2 py-2  text-white rounded whitespace-nowrap" >
//                     <MdOutlinePreview className='text-green-500 text-[25px]' onClick={() => handleExpandRow(row)}/>
//                 </button> */}
//                 <button className=""><FaAmazonPay  className='text-green-500 text-[30px]'/></button>
//             </div>
//         ),   
//         button: true    
//     }
// ];


// const SplitBill = (props: Props) => {

//     const axiosPrivate = useAxiosPrivate()


//     const colors = [
//         '#FF6384', // Red
//         '#36A2EB', // Blue
//         '#FFCE56', // Yellow
//         '#8A2BE2', // Purple
//         '#20B2AA', // Light Sea Green
//         '#FF7F50', // Coral
//         '#32CD32', // Lime Green
//         '#FFD700'  // Gold
//     ];

//     const [showForm, setShowForm] = useState(false);
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [categoryData, setCategoryData] = useState<Category[]>([]);
//     const [budget, setBudget] = useState<CategoryBudget[]>([]);
//     const [dues , setDues] = useState<formValue[]>([]);



//     const form = useForm<formValue>();

//     // register 
//     const { register, handleSubmit, formState, control, getValues } = form;
//     const { errors } = formState


//     const onSubmit =async(data : formValue)=>{
//         // e.preventDefault();
//       try {
//         const res = await axiosPrivate.post("/addDues" , data)
//         if (res && res.data.success) {
//             handleClose();
//             toast.success("Dues Added Successfully!!")
//             // console.log(res)
//           }
//       } catch (error) {
//         console.log(error)
//       }
//     }

//     const getDues =async()=>{
//         try {
//           const res = await axiosPrivate.get("/getDues")
//           if (res && res.data.success) {
//              setDues(res.data.data)
//             }
//         } catch (error) {
//           console.log(error)
//         }
//       }


//     const fetchCategory = async () => {
//         try {
//             const response = await axiosPrivate.get('/categoryPayment');
//             const data = response.data.formatData;
//             setCategoryData(data);
//         } catch (error) {
//             console.error('Failed to fetch transaction data:', error);
//         }
//     }


//     const fetchBudget = async () => {
//         try {
//             const res = await axiosPrivate.get("/categoryBudget")
//             const data = res.data.data
//             setBudget(data);
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         fetchBudget()
//         fetchCategory()
//         getDues()
//     }, [])

//     const toggleForm = () => {
//         setIsFormOpen(!isFormOpen); // Toggle the state to open/close the form
//     };
//     const handleIconClick = () => {
//         setShowForm(!showForm);
//     };
//     const handleClose = () => {
//         setShowForm(!showForm)
//     }
//     const handleFormClose = () => {
//         setIsFormOpen(!isFormOpen)
//     }

//     const [value, onChange] = useState<Value>(new Date());
//     const [startDate, setStartDate] = useState(new Date());
//     return (
//         <>
//             <section className='flex items-center w-full min-h-screen bg-no-repeat bg-center bg-cover' >
//                 <div className="flex flex-col lg:flex-row h-full">
//                     <div className="w-[20px] lg:w-1/4 bg-slack-50 lg:rounded-r-lg p-4 lg:p-10">
//                         <div className="mt-4 relative cursor-pointer">
//                             <Menu />
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-3 gap-10 mt-5">
//                         {/* First Line */}
//                         <div className='flex gap-10 flex-1'>
//                             <div className='w-full h-[500px] relative'>
//                                 <h1 className='text-start text-[25px]'>Split Bill</h1>
//                                 <div className='m-5 p-2 flex gap-2'>
                                          
//                                 </div>
//                             </div>
//                         </div>

//                         <div className='flex gap-10 flex-1'>
//                             <div className='w-full h-[500px]'>
//                                 <h1 className='text-start text-[25px]'>Balance Review</h1>
//                                 <div className='mt-4 text-black border border-primaryColor rounded'>
//                                     <Datepicker value={null} onChange={function (value: DateValueType, e?: HTMLInputElement | null | undefined): void {
//                                         throw new Error('Function not implemented.')
//                                     }} />
//                                 </div>
//                                 <div className='flex gap-6'>
//                                     <div className="relative inline-block mt-4">
//                                         <h4>Weekly Review</h4>
//                                         <Circle percent={20} strokeWidth={5} strokeColor="#28a745" className='w-[125px]' />
//                                         <span className="absolute inset-0 flex items-center justify-center">Total Usage</span>
//                                     </div>
//                                     <div className="relative inline-block mt-4">
//                                         <h4>Monthly Review</h4>
//                                         <Circle percent={10} strokeWidth={5} strokeColor="#e83e8c" className='w-[125px]' />
//                                         <span className="absolute inset-0 flex items-center justify-center ">Total Usage</span>
//                                     </div>
//                                 </div>
//                                 <div className='flex flex-col gap-6'>
//                                     <div className="relative inline-block mt-4">
//                                         <h4>Daily Budget Limit</h4>
//                                         <Line percent={30} strokeWidth={3} strokeColor="#4CAF50" />
//                                     </div>
//                                     <div className="relative inline-block mt-4">
//                                         <h4>Weekly Budget Limit</h4>
//                                         <Line percent={20} strokeWidth={3} strokeColor="#F9A825" />
//                                     </div>
//                                     <div className="relative inline-block mt-4">
//                                         <h4>Monthly Budget Limit</h4>
//                                         <Line percent={10} strokeWidth={3} strokeColor="#3A86FF" />
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                         <div className='flex gap-10 flex-1'>
//                             <div className='w-full max-w-[600px] h-auto'>
//                                 <h1 className='text-start text-[25px]'>Bank Details</h1>
//                                 <div>
//                                     <img src={atm} alt="" className='w-full h-[250px]' />
//                                 </div>
//                                 <div className="mt-4">
//                                     <div className='flex gap-1 justify-start'>
//                                         <AiFillBank className='text-[25px]' />
//                                         <h2 className="text-lg font-semibold text-textColor">State Bank of India</h2>
//                                     </div>
//                                     <p className='text-[15px] text-textColor'>Account Holder Name: <span className='text-primaryColor font-semibold'>Ravi Pankhaniya</span></p>
//                                     <div className='h-[50px] border border-solid border-primaryColor flex rounded-full'>
//                                         <div className='border border-left border-primaryColor w-[80px] rounded-full'>
//                                             <figure>
//                                                 <img src={mastercard} alt="" className='w-[50px] ml-3' />
//                                             </figure>
//                                         </div>
//                                         <div className='flex flex-col justify-center items-center ml-[5px]'>
//                                             <h5 className='text-textColor text-[12px] '>Card Number</h5>
//                                             <h1 className='text-headingColor text-[15px]'>1234  5678  9101  1121</h1>
//                                         </div>
//                                         <div className='flex justify-end right-0 w-[90px] mt-3 text-[25px]'>
//                                             <CiCircleChevDown className='text-primaryColor' />
//                                         </div>
//                                     </div>
//                                     <div className='h-[40px] border boder-solid mt-2 flex rounded-full border-primaryColor '>
//                                         <div className='border rounded-full w-[250px]'>
//                                             <input type="number" placeholder="Quick Transfer" className='border text-headingColor hover:bg-none justify-center rounded-full h-full w-[250px]  text-center' />
//                                         </div>
//                                         <div className='border border-left w-[2px] rounded-full'></div>
//                                         <div className='flex justify-center w-[80px] mt-2 text-[25px]'>
//                                             <LuSend className='text-primaryColor' />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Second Line */}
//                         <div className='col-span-3'>
//                             <div className='grid grid-cols-3 gap-5'>
//                                 <div className='col-span-1 w-full border border-solid relative'>
//                                     <div className='flex h-[50px] p-1'>
//                                         <h1 className='text-start text-[25px] '>My Dues</h1>
//                                         <button onClick={toggleForm} className='ml-auto bg-blue-500 mt-1 mr-2 hover:bg-green-300 text-white font-bold py-2 px-4 rounded'>
//                                             Add Dues
//                                         </button>
//                                     </div>
//                                     {isFormOpen && (
//                                         <div className="bg-gray-100 p-4 absolute rounded mt-4 right-0 top-0 z-50 ">
//                                             <IoCloseCircleOutline className='absolute top-0 right-0 text-[25px] cursor-pointer' onClick={handleFormClose} />
//                                             <form onSubmit={handleSubmit(onSubmit)}>
//                                                 <label className='m-1'>Add Bill Name</label>
//                                                 <input type="text" placeholder="Enter Bill Name" className="w-full border rounded px-2 py-1 mt-2" {...register("name", {
//                                                     required: {
//                                                         value: true,
//                                                         message: "name is required"
//                                                     }
//                                                 })} />
//                                                 <label className='m-1'>Add Due Date</label>
//                                                 <input type="date" placeholder="Enter Due Date" className="w-full border rounded px-2 py-1 mt-2" {...register("date", {
//                                                     required: {
//                                                         value: true,
//                                                         message: "date is required"
//                                                     }
//                                                 })} />
//                                                 <label className='m-1'>Add Payment</label>
//                                                 <input type="number" placeholder="Enter Due Payment" className="w-full border rounded px-2 py-1 mt-2" {...register("payment", {
//                                                     required: {
//                                                         value: true,
//                                                         message: "name is required"
//                                                     }
//                                                 })} />
//                                                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-300 font-bold">Submit</button>
//                                             </form>
//                                         </div>
//                                     )}
//                                     <DataTable
//                                     pagination
//                                     columns={columns}
//                                     data={dues}
//                                     /> {/* Render your Duetable component here */}
//                                 </div>
//                                 <div className=" col-span-2 w-full border border-solid relative">
//                                     <div className="w-full p-1">
//                                         <h1 className='text-start text-[25px]'>Daily Review</h1>
//                                         <FakeChart3 dailyPaymentData={}/>
//                                     </div>
//                                     <div className='absolute top-0 right-0  p-2'>
//                                         <h1>Select Month</h1>
//                                         <div className='border border-solid '>
//                                             <select name="monthSelect" className='bg-primaryColor text-white font-semibold rounded h-8'>
//                                                 <option value="January">January</option>
//                                                 <option value="February">February</option>
//                                                 <option value="March">March</option>
//                                                 <option value="April">April</option>
//                                                 <option value="May">May</option>
//                                                 <option value="June">June</option>
//                                                 <option value="July">July</option>
//                                                 <option value="August">August</option>
//                                                 <option value="September">September</option>
//                                                 <option value="October">October</option>
//                                                 <option value="November">November</option>
//                                                 <option value="December">December</option>
//                                             </select>
//                                         </div>

//                                     </div>

//                                 </div>
//                                 {/* <div className=" col-span-1 w-full border border-solid">
//                                     <div className="w-full">
//                                         <h1>Stokes</h1>
//                                     </div>
//                                 </div> */}

//                             </div>
//                         </div>

//                         {/* Third Line */}
//                         {/* <div className='col-span-4'>
//                             <div className=' grid grid-cols-2'>
//                                 <div className='col-span-1 w-full border border-solid'>
//                                     <h1>Upcoming Dues</h1>
//                                 </div>
//                                 <div className="ml-4 col-span-1 w-full border border-solid">
//                                     <div className="w-full">
//                                         <h1>Stokes</h1>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </section>

//         </>
//     )
// }

// export default SplitBill

import React from 'react'

type Props = {}

const SplitBill = (props: Props) => {
  return (
    <div>SplitBill</div>
  )
}

export default SplitBill
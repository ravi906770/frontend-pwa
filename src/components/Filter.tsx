export const Filters = [
    {
      _id: 0,
      name: "Low Amount Transaction"
    },
    {
      _id: 1,
      name: "High Amount Transaction"
    },
    {
      _id: 2,
      name: "Category"
    },
    {
      _id: 3,
      name: "Date"
    },
    {
      _id: 4,
      name: "Status"
    },
  ];



  export const dummy =[
    {
      _id:1,
      name: "Shopping",
      description: "Bought groceries and household items",
      date: "2024-02-10",
      category: "Groceries",
      payment: 500,
      end_date: "2024-02-10",
      status:"Pending",
      mode:"online"
    },
    {
      _id:2,
      name: "Dinner",
      description: "Dined out with friends",
      date: "2024-02-08",
      category: "Dining",
      payment: 300,
      end_date: "2024-02-08",
      status:"Pending",
      mode:"online"
    },
    {
      _id:3,
      name: "Electricity Bill",
      description: "Paid the electricity bill for this month",
      date: "2024-02-05",
      category: "Utilities",
      payment: 200,
      end_date: "2024-02-05",
      status:"Complete",
      mode:"online"
    },
    {
      _id:4,
      name: "Books",
      description: "Bought novels and study materials",
      date: "2024-02-15",
      category: "Education",
      payment: 250,
      end_date: "2024-02-15",
      status:"Pending",
      mode:"online"
    },
    {
      _id:5,
      name: "Fuel",
      description: "Filled up the car tank",
      date: "2024-02-03",
      category: "Transportation",
      payment: 100,
      end_date: "2024-02-03",
      status:"Complete",
      mode:"online"
    },
    {
      _id:6,
      name: "Movie Tickets",
      description: "Watched a movie at the cinema",
      date: "2024-02-12",
      category: "Entertainment",
      payment: 150,
      end_date: "2024-02-12",
      status:"Pending",
      mode:"online"
    },
    {
      _id:7,
      name: "Gym Membership",
      description: "Paid monthly gym subscription",
      date: "2024-02-01",
      category: "Fitness",
      payment: 80,
      end_date: "2024-02-01",
      status:"Pending",
      mode:"online"
    },
    {
      _id:9,
      name: "Lunch",
      description: "Had lunch with colleagues",
      date: "2024-02-07",
      category: "Dining",
      payment: 120,
      end_date: "2024-02-07",
      status:"Complete",
      mode:"online"
    },
    {
      _id:10,
      name: "Phone Bill",
      description: "Paid the mobile phone bill",
      date: "2024-02-18",
      category: "Utilities",
      payment: 80,
      end_date: "2024-02-18",
      status:"Pending",
      mode:"online"
    },
    {
      _id:11,
      name: "Clothing",
      description: "Bought new clothes for the season",
      date: "2024-02-20",
      category: "Shopping",
      payment: 300,
      end_date: "2024-02-20",
      status:"Complete",
      mode:"online"
    },
    {
      _id:12,
      name: "Phone Bill",
      description: "Paid the mobile phone bill",
      date: "2024-02-18",
      category: "Utilities",
      payment: 80,
      end_date: "2024-02-18",
      status:"Pending",
      mode:"online"
    },
    {
      _id:13,
      name: "Phone Bill",
      description: "Paid the mobile phone bill",
      date: "2024-02-18",
      category: "Utilities",
      payment: 80,
      end_date: "2024-02-18",
      status:"Pending",
      mode:"online"
    },
    {
      _id:14,
      name: "Phone Bill",
      description: "Paid the mobile phone bill",
      date: "2024-02-18",
      category: "Utilities",
      payment: 80,
      end_date: "2024-02-18",
      status:"Pending",
      mode:"online"
    },
    // Add more entries as needed
  ]
  


  export const  filter = [
    {
      _id : 1,
      category : "food" 
    },
    {
      _id : 2,
      category : "hospital" 
    },
    {
      _id : 3,
      category : "shopping" 
    },
    {
      _id : 4,
      category : "travel" 
    },
    {
      _id : 5,
      category : "education" 
    },
    {
      _id : 6,
      category : "rent" 
    },
    {
      _id : 7,
      category : "fuel" 
    },
    {
      _id : 8,
      category : "misc" 
    },
    {
      _id : 9,
      category : "invest" 
    }
  ]

  export const  category = [
    {
      _id : 1,
      category : "food",
      budget_boundry : 2000
    },
    {
      _id : 2,
      category : "hospital",
      budget_boundry : 3000
    },
    {
      _id : 3,
      category : "shopping",
      budget_boundry : 4000
    },
    {
      _id : 4,
      category : "travel",
      budget_boundry : 1000
    },
    {
      _id : 5,
      category : "education",
      budget_boundry : 2000
    },
    {
      _id : 6,
      category : "rent" ,
      budget_boundry : 2000
    },
    {
      _id : 7,
      category : "fuel",
      budget_boundry : 1000 
    },
    {
      _id : 8,
      category : "misc",
      budget_boundry : 2000 
    }
  ]



  export const notification = [
    {
      type: "payment_due",
      description: "Your food bill payment is due."
    },
    {
      type: "payment_reminder",
      description: "Don't forget to settle your shopping bill."
    },
    {
      type: "payment_alert",
      description: "Payment required for your recent grocery bill."
    },
    {
      type: "payment_due",
      description: "Your restaurant bill needs to be paid."
    },
    {
      type: "payment_reminder",
      "description": "Shopping bill payment deadline approaching."
    },
    {
      type: "payment_alert",
      description: "Don't overlook your pending food bill payment."
    },
    {
      type: "payment_due",
      description: "Time to settle your clothing shopping bill."
    },
    {
      type: "payment_reminder",
      description: "Your supermarket bill payment is pending."
    },
    {
      type: "payment_alert",
      description: "Don't delay your payment for the dining bill."
    },
    {
      type: "payment_due",
      description: "Your pending bill for household items awaits payment."
    }
  ]















//   import React from 'react';
// import { useForm } from 'react-hook-form';

// function YourFormComponent() {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     // You can perform form submission logic here
//   };

//   return (
//     <div className="relative ml-[860px]">
//       <button onClick={toggleForm} className="bg-blue-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
//         Add Transaction
//       </button>
//       {showForm && (
//         <div className="absolute top-10 right-0 z-10 bg-white p-8 rounded-lg shadow-lg">
//           <form className="space-y-1 w-[500px]" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
//                 Transaction Name
//               </label>
//               <input
//                 type="text"
//                 {...register('name', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {errors.name && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <input
//                 type="text"
//                 {...register('description', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {errors.description && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="date" className="block text-sm font-medium text-gray-700">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 {...register('date', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {errors.date && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <select
//                 {...register('category', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">Select Category</option>
//                 <option value="food">Food</option>
//                 <option value="shopping">Shopping</option>
//                 <option value="travel">Travel</option>
//               </select>
//               {errors.category && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
//                 Payment
//               </label>
//               <input
//                 type="number"
//                 {...register('payment', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {errors.payment && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 {...register('endDate', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               {errors.endDate && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <select
//                 {...register('status', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">Transaction Status</option>
//                 <option value="completed">Completed</option>
//                 <option value="pending">Pending</option>
//               </select>
//               {errors.status && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div>
//               <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
//                 Transaction Mode
//               </label>
//               <select
//                 {...register('mode', { required: true })}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">Transaction Mode</option>
//                 <option value="online">Online</option>
//                 <option value="offline">Offline</option>
//               </select>
//               {errors.mode && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div className="text-right">
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-green-400 text-white font-bold mt-10 py-2 px-4 rounded focus:outline-none"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default YourFormComponent;

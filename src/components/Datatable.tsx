import React, { ChangeEvent, Dispatch, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import DataTable, { Direction } from 'react-data-table-component';
import { number } from 'yup';
import { dummy } from './Filter';
import ExportButton from './ExportButton';
import { FaEdit, FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

import { MdOutlinePreview } from "react-icons/md";
import axios from 'axios';
import Model from './Model';
import { filter } from '../components/Filter';
import useAxiosPrivate from '../axios/axiosPrivate';
import toast from 'react-hot-toast';
// import FilterComponent from './FilterComponent';

type Props = { 
  data : Movie[],
  setData : React.Dispatch<React.SetStateAction<Movie[]>>
  getAllTransaction : ()=>void

}

interface Category {
  _id: string,
  category: string;
  // other properties
}


// filter type
interface FilterComponentProps {
  onFilter: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  filterText: string;
}

// filter 
const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter, onClear, filterText }) => {
  return (
    <div>
      <input type="text" value={filterText} onChange={onFilter} className='w-full h-[25px] rounded border border-solid border-black p-2' placeholder='Search Your Expense' />
      <button onClick={onClear}>Clear</button>
    </div>
  );
};







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

interface ExpandedComponentProps {
  data: Movie
};

const ExpandedContent: React.FC<ExpandedComponentProps> = ({ data }) => (
  <div>
    {data && (
      <div>
        <p>Name: {data.name}</p>
        <p>Description: {data.description}</p>
        <p>Date: {data.date}</p>
        <p>Category: {data.category}</p>
        <p>Payment: {data.payment}</p>
        <p>Status: {data.status}</p>
        <p>Mode: {data.mode}</p>
      </div>
    )
    }
  </div>
);



// download the report


interface ExportProps {
  onExport: (value: string) => void;
}

const Export: React.FC<ExportProps> = ({ onExport }) => (
  <ExportButton onExport={onExport}>
    Export
  </ExportButton>
);






const customStyles = {
  // table: {
  //     style: {
  //       backgroundColor: 'rgba(255, 255, 255, 0)', // Change the background color of the table to transparent with 50% opacity
  //     },
  //   },
  head: {
    style: {
      backgroundColor: 'blue', // Background color of the table header
      color: 'blue',           // Text color of the table header
      fontWeight: 'bold',
      fontSize: '14px'         // Font weight of the table header
      // Add any other styles you want to apply to the table header
    },
  },
  cells: {
    style: {
      fontSize: '13px'  // Font size of column headers
      // Add any other styles you want to apply to the column headers
    },
  },
};



const Datatable = ({data , setData ,getAllTransaction}: Props) => {

  const axiosPrivate = useAxiosPrivate();

  const [expandedRow, setExpandedRow] = useState<Movie | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
 
  const [categories, setCategories] = useState<Category[]>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [filterTransaction, setFilterTransaction] = useState<Movie[]>([]);
  const [category , setCategory] = useState("")


  const handleFilter = () => {
    setOpenFilter(!openFilter)
  }

  const handleCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: string = event.target.value; 
    setCategory(selectedValue);

    const filterData = data.filter((item)=>item.category === selectedValue)
    setFilterTransaction(filterData)
    
  };


  


  const removeFilter = () => {
    setFilterTransaction([])
    getAllTransaction()
    // setData(data)

    setOpenFilter(!openFilter)
  }


  const [updatedData, setUpdatedData] = useState<Movie>({
    _id: '',
    name: '',
    description: '',
    date: '',
    category: '',
    payment: 0,
    status: '',
    mode: ''
  });

  const params = useParams();

  const handleOpenUpdateForm = (_id: string) => {
    setUpdatedData({
      ...data.find(movie => movie._id === _id)!
    });

    setShowUpdateForm(true);
  };









  const downloadCSV = (): void => {
    const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const getAllCategory = () => {
    try {
      axiosPrivate.get("/getCategory").then((response) => {
        setCategories(response.data.getCategory)
      }
      )
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllTransaction()
    getAllCategory()
  }, [])



  const handleDelete = async (_id: string) => {
    try {
      await axiosPrivate.delete(`/delete-transaction/${_id}`)
      toast.success("Transactin Delete Successfully!!")
      getAllTransaction();
    } catch (error) {
      console.log(error)
    }
  }


    const handleUpdate = async (_id : string , e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      try {
        await axiosPrivate.put(`http://localhost:5000/api/v1/updateTransaction/${_id}`, updatedData);
        toast.success("Transaction updated successfully!");
        getAllTransaction(); // Refresh the transaction data after update
        setShowUpdateForm(!showUpdateForm); // Hide the update form
      } catch (error) {
        console.log(error);
      }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUpdatedData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };









  // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data as any)} />, []);


  const [filterText, setFilterText] = useState<string>('');

  // filter the data
  const filteredItems = data?.filter(
    item => item.description && item.description.toLowerCase().includes(filterText.toLowerCase()),
  );


  // filter the data
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);



  const columns = [
    {
      name: 'Id',
      selector: (row: any) => row._id,
      sortable: true, 
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
      grow: 1
    },
    {
      name: 'Description',
      selector: (row: any) => row.description,
    },
    {
      name: 'Date',
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: any) => row.category,
    },
    {
      name: 'Payment',
      selector: (row: any) => row.payment,
      sortable: true
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
    },
    {
      name: 'Mode',
      selector: (row: any) => row.mode,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>

          <div className="  flex">
            {/* <button className="px-2 py-2  text-white rounded whitespace-nowrap" >
                        <MdOutlinePreview className='text-green-500 text-[25px]' onClick={() => handleExpandRow(row)}/>
                    </button> */}
            <button className=" px-2 py-2  text-white rounded whitespace-nowrap" onClick={() => handleOpenUpdateForm(row._id)} ><FaEdit className='text-blue-500 text-[25px]' /></button>
            <button className="px-2 py-2  text-white rounded whitespace-nowrap" onClick={() => handleDelete(row._id)}>
              <MdDelete className='text-red-500 text-[25px]' />
            </button>
          </div>

        </>
      ),
      button: true
    }
  ];




  return (
    <>
      <div className='relative'>
        <DataTable
          title="Expense Report"
          pagination
          columns={columns}
          data={filterTransaction.length === 0 ? data : filterTransaction}
          customStyles={customStyles}
          expandableRows
          expandableRowsComponent={ExpandedContent}
          selectableRowsHighlight
          direction={Direction.AUTO}
          dense
        />
        <div className='absolute flex gap-2 top-0 right-0'>
          <ExportButton onExport={downloadCSV}>Export</ExportButton>
          <button className='text-xl' onClick={handleFilter}>
            <FaFilter />
          </button>
          <div>
            {openFilter && (
              <div className='absolute top-8 left-0 w-50 bg-white shadow-md rounded-md'>
                <div className='p-4'>
                  <select
                    onChange={handleCategory}
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value="">All Categories</option>
                    {filter.map((item, id) => (
                      <option key={id} value={item.category}>{item.category}</option>
                    ))}
                  </select>
                  <button
                    onClick={removeFilter}
                    className='mt-2 px-2 py-2 bg-red-600 text-white text-[13px] rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700'
                  >
                    Remove Filter
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>


      {showUpdateForm && (
        <div className="absolute top-10 right-0 z-10 bg-white p-8 rounded-lg shadow-lg">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-[25px]"
            onClick={() => setShowUpdateForm(false)}
          ><IoCloseCircle /></button>
          {/* Your form elements go here */}
          <form onSubmit={(e) => handleUpdate(updatedData._id, e)} className="space-y-1 w-[500px]"  noValidate>
            {/* Example input field */}
            <div>
              <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                Transaction Name
              </label>
              <input
                name='name'
                onChange={handleInputChange}
                value={updatedData.name}
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                name='description'
                onChange={handleInputChange}
                type='text'
                value={updatedData.description}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                onChange={handleInputChange}
                type="date"
                name='date'
                value={updatedData.date}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={updatedData.category}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option >Select Category</option>
                {categories.map((ele, id) => {
                  return <option key={id} value={ele.category}>{ele.category}</option>

                })}
                {/* 
                        <option value="category1">Food</option>
                        <option value="category2">Shopping</option>
                        <option value="category3">Travel</option> */}
              </select>
            </div>


            <div>
              <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                Payment
              </label>
              <input
                name='payment'
                value={updatedData.payment}
                onChange={handleInputChange}
                type="number"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
                Transaction Mode
              </label>
              <select
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Transaction Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-green-400 text-white font-bold mt-10 py-2 px-4 rounded focus:outline-none"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Datatable


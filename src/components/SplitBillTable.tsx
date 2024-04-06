import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useAxiosPrivate from '../axios/axiosPrivate';
// import useAxiosPrivate from '../axios/axiosPrivate';



type formValue = {
    name : string,
    description : string,
    date : string,
    category:string,
    payment : number,
    status : string,
    mode : string,
    emails : [string]
}

type Props = {
    data : formValue[]
}





const columns = [
	{
		name: 'Name',
		selector: (row : any) => row.name,
	},
	{
		name: 'Description',
		selector: (row : any) => row.description,
	},
    {
		name: 'Date',
		selector: (row : any) => row.date,
	},
    {
		name: 'category',
		selector: (row : any) => row.category,
	},
    {
		name: 'payment',
		selector: (row : any) => row.payment,
	},
    {
		name: 'emails',
		selector: (row : any) => row.emails,
	},
];

interface ExpandedComponentProps {
    data: formValue
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
          <p>Emails: {data.emails}</p>
        </div>
      )
      }
    </div>
  );


const SplitBillTable = ({data}: Props) => {

    console.log(data);
    

	return (
        <div className=''>
<DataTable
        pagination
			columns={columns}
			data={data}
            expandableRows
            expandableRowsComponent={ExpandedContent}
		/>
        </div>
		
	);
};



export default SplitBillTable
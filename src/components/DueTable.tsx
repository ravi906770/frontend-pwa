import DataTable from 'react-data-table-component';

type Props = {
}

const columns = [
	{
		name: 'Title',
		selector: (row : any) => row.title,
	},
	{
		name: 'End-Date',
		selector: (row : any) => row.date,
	},
    {
		name: 'Payment',
		selector: (row : any) => row.payment,
	},
];

const data = [
  	{
		id: 1,
		title: 'Mobile Recharge',
		date: '22-04-2024',
        payment : "500 ₹"
	},
	{
		id: 2,
		title: 'Netflix Subscription',
		date: '18-05-2024',
        payment : "500 ₹"
	},
    {
		id: 2,
		title: 'House Rent',
		date: '19-06-2024',
        payment : "500 ₹"
	},
    {
		id: 2,
		title: 'Light Bill',
		date: '05-04-2024',
        payment : "500 ₹"
	},
    
]

const Duetable = (props: Props) => {
	return (
        <div className='-z-10'>
<DataTable
        pagination
			columns={columns}
			data={data}
		/>
        </div>
		
	);
};



export default Duetable
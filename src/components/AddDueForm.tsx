import { useState } from 'react';

interface AddDueFormProps {
    onClose: () => void;
}

const AddDueForm : React.FC<AddDueFormProps> = ({ onClose }) => {
    const [billName, setBillName] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [open , setOpen] = useState(false)
   
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        // onSubmit({ billName, billAmount, dueDate });
        setBillName('');
        setBillAmount('');
        setDueDate('');
        // Close the form after submission
        onClose();
    };


    return (
        <div className="bg-white p-4 rounded shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="billName" className="block text-sm font-semibold mb-2">Bill Name</label>
                    <input type="text" id="billName" value={billName} onChange={(e) => setBillName(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="billAmount" className="block text-sm font-semibold mb-2">Bill Amount</label>
                    <input type="text" id="billAmount" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-semibold mb-2">Due Date</label>
                    <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddDueForm;

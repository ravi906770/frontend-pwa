import React, { useState } from 'react';

const FilterComponent: React.FC = () => {
	
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', height:"50px" }}>
            <input
                type="text"
                placeholder="Search your Expense"
                value={searchTerm}
                onChange={handleChange}
				className=' w-full border border-solid border-black rounded'
            />
            {searchTerm && (
                <button onClick={handleClear} style={{ marginLeft: '5px' }}>
                    X
                </button>
            )}
        </div>
    );
};

export default FilterComponent;

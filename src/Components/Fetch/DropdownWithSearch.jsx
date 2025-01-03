import React, { useEffect, useState, useRef } from 'react';

const DropdownWithSearch = ({ data, touchedVal, errorsVal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);

    // Create a ref for the dropdown container
    const dropdownRef = useRef(null);

    const getDisplayValues = () => {
        return data.map((option) => {
            return {
                value: `(${option.employeeId}) ${option.firstName} ${option.lastName}`,
                key: option.employeeId
            };
        });
    };

    // Update options and filtered options when data changes
    useEffect(() => {
        if (data && data.length > 0) {
            const displayValues = getDisplayValues();
            setOptions(displayValues);
            setFilteredOptions(displayValues);
        }
    }, [data]);

    // Update filtered options when search term changes
    useEffect(() => {
        setFilteredOptions(
            options.filter(option =>
                option.value.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, options]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Select an option
    const selectOption = (option) => {
        setSelectedOption(option);
        setSearch('');
        setIsOpen(false);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label
                    htmlFor="employeeId"
                    className="block text-xl font-bold text-gray-900 sm:w-1/3 mb-2 sm:mb-0"
                >
                    Employee Id
                </label>
                <div ref={dropdownRef} className="sm:w-2/3 relative">
                    {/* Dropdown Button */}
                    <div
                        onClick={toggleDropdown}
                        className={`block w-full appearance-none rounded-md border-2 py-2 px-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 ${touchedVal.assessmentType && errorsVal.assessmentType ? 'border-red-500' : ''}`}
                    >
                        <span>{selectedOption || 'Select Employee'}</span>
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto scrollbar-hidden">
                            <ul>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="block w-full p-2 border-2 rounded-md text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Render filtered options */}
                                {filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => selectOption(option.value)}
                                    >
                                        {option.value}
                                    </li>
                                ))}
                                {/* No options found */}
                                {filteredOptions.length === 0 && (
                                    <li className="p-2 text-gray-500">No options found</li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Error message */}
                    {touchedVal?.employeeId && errorsVal?.employeeId && (
                        <div className="text-xs italic text-red-700">{errorsVal?.employeeId}</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DropdownWithSearch;

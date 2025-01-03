import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function LocationDropdown({ fieldName, handleBlur, onChange, value, touched , errors}) {

    const [locations, setLocations] = useState([]);
    const storedLocations = useSelector(state => state.locations);

    useEffect(() => {
        setLocations(storedLocations);
    }, [storedLocations]);

    return (
        <>
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <label
                    htmlFor="location"
                    className="text-gray-700 text-xl font-bold mb-2 sm:mr-4"
                >
                    {fieldName}
                </label>

                <div className="w-full sm:w-96">
                    <select
                        id="location"
                        name="location"
                        value={value}
                        onChange={onChange}
                        onBlur={handleBlur}
                        className="shadow appearance-none block bg-white rounded-md w-full h-9 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    >
                        <option value="" disabled>Select location</option>
                        {locations?.map((location, index) => {
                            return (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            )
                        })}
                    </select>
                    {errors.location && touched.location && <p className="text-[#dc2626]">{errors.location}</p>}
                </div>
            </div>
        </>
    )
}

export default LocationDropdown

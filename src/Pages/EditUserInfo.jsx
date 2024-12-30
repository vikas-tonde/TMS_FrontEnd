import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import { MdEdit, MdOutlineSave, MdOutlineSmartButton } from "react-icons/md";
import api from "../services/api";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const EditUserInfo = () => {
    const loaderData = useLoaderData();
    const [trainee, setTrainee] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [locations, setLocations] = useState([]);

    const storedLocations = useSelector(state => state.locations);

    useEffect(() => {
        setLocations(storedLocations);
    }, [storedLocations]);

    useEffect(() => {
        setTrainee({ ...loaderData });
    }, [loaderData]);

    // Handle changes to input fields
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        if (type === "radio") {
            setTrainee({
                ...trainee,
                status: value,
            });
        } else {
            setTrainee({
                ...trainee,
                [id]: value,
            });
        }
    };

    // Toggle between edit mode and save mode
    const handleEditSave = () => {
        if (isEditing) {
            api.put("/api/admin/users/user", trainee)
                .then((response) => {
                    setTrainee(response.data.data);
                    toast.success("Successfully saved the changes.");
                })
                .catch((error) => {
                    console.error("Error saving trainee data:", error);
                    toast.error("Error saving the changes.");
                });
        }
        setIsEditing(!isEditing);
    };

    // Handle reset password
    const handleResetPassword = () => {
        console.log("Password reset for", trainee?.email);
    };

    return (
        <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
            <Link
                to="#"
                className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
            >
                Edit User Page
            </Link>

            {/* Form Wrapper */}
            <div className="mt-4 mx-6 shadow-xl rounded-lg p-6 bg-white">
                <form className="space-y-6" autoComplete="off">
                    <div className="flex flex-col items-start space-y-4">
                        {/* First Name */}
                        <div className="flex flex-col sm:flex-row items-center w-full">
                            <label
                                htmlFor="firstName"
                                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Trainee Name"
                                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                disabled={!isEditing}
                                value={trainee?.firstName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col sm:flex-row items-center w-full">
                            <label
                                htmlFor="lastName"
                                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Trainee Last Name"
                                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                disabled={!isEditing}
                                value={trainee?.lastName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email ID */}
                        <div className="flex flex-col sm:flex-row items-center w-full">
                            <label
                                htmlFor="email"
                                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                            >
                                Email ID
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email ID"
                                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                disabled={!isEditing}
                                value={trainee?.email || ""}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Role */}
                        <div className="flex flex-col sm:flex-row items-center w-full">
                            <label
                                htmlFor="role"
                                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                            >
                                Role
                            </label>
                            <input
                                type="text"
                                id="role"
                                placeholder="Role"
                                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                disabled={!isEditing}
                                value={trainee?.role || ""}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Location Dropdown */}
                        <div className="flex flex-col sm:flex-row items-center w-full">
                            <label
                                htmlFor="location"
                                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                            >
                                Location
                            </label>

                            {/* Location dropdown */}
                            <select
                                id="location"
                                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                // value={activeLocation}
                                onChange={(e) => handleTabClick(e.target.value)}
                                disabled={!isEditing}
                            >
                                {locations?.map((location, index) =>  {return(
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                )})}
                            </select>
                        </div>

                        {/* Active / Inactive */}
                        <div className="flex flex-col sm:flex-row items-start w-full">
                            <label className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0">
                                Status
                            </label>
                            <div className="flex sm:w-2/3">
                                <div className="mr-4">
                                    <input
                                        type="radio"
                                        id="active"
                                        name="status"
                                        value="active"
                                        checked={trainee?.status === "active"}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="active" className="ml-2">Active</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="inactive"
                                        name="status"
                                        value="inactive"
                                        checked={trainee?.status === "inactive"}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="inactive" className="ml-2">Inactive</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="flex justify-center mt-4 space-x-4">
                    {/* Reset Password Button */}
                    <button
                        type="button"
                        className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleResetPassword}
                    >
                        <MdOutlineSmartButton className="inline mr-2 text-lg" />
                        Reset Password
                    </button>

                    {/* Edit/Save Button */}
                    <button
                        type="button"
                        className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleEditSave}
                    >
                        {isEditing ? (
                            <>
                                <MdOutlineSave className="inline mr-2 text-lg" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <MdEdit className="inline mr-2 text-lg" />
                                Edit
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserInfo;

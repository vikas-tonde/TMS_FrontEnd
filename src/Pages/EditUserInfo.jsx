import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import { MdEdit, MdOutlineSave } from "react-icons/md"; // Import icons
import api from "../services/api";

const EditUserInfo = () => {
  const loaderData = useLoaderData();
  const [trainee, setTrainee] = useState({});
  const [isEditing, setIsEditing] = useState(false); // State for edit mode

  useEffect(() => {
    setTrainee({ ...loaderData });
  }, [loaderData]);

  // Handle changes to input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTrainee({
      ...trainee,
      [id]: value, // Update the respective field in trainee data
    });
  };

  // Toggle between edit mode and save mode
  const handleEditSave = () => {
    if (isEditing) {
      // Save the changes by sending them to the API
      api.put("/api/admin/users/user", trainee).then((response) => {
        setTrainee(response.data.data);
      }).catch((error) => {
        console.error("Error saving trainee data:", error);
      });
    }
    setIsEditing(!isEditing); // Toggle the edit mode
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
                htmlFor="name"
                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Trainee Name"
                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={!isEditing} // Disable if not in edit mode
                value={`${trainee?.firstName} ${trainee?.lastName}`}
                onChange={handleChange} // Allow editing when in edit mode
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col sm:flex-row items-center w-full">
              <label
                htmlFor="employeeId"
                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Last Name
              </label>
              <input
                type="text"
                id="employeeId"
                placeholder="Employee Id"
                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={!isEditing} // Disable if not in edit mode
                value={trainee?.employeeId}
                onChange={handleChange} // Allow editing when in edit mode
              />
            </div>

            {/* Email ID */}
            <div className="flex flex-col sm:flex-row items-center w-full">
              <label
                htmlFor="averageMarks"
                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Email ID
              </label>
              <input
                type="email"
                id="averageMarks"
                placeholder="Email ID"
                className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                disabled={!isEditing} // Disable if not in edit mode
                value={trainee?.averageMarks}
                onChange={handleChange} // Allow editing when in edit mode
              />
            </div>
          </div>
        </form>

        {/* Edit/Save Button */}
        <div className="flex justify-center mt-4">
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

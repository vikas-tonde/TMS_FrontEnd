import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import { MdEdit, MdOutlineSave } from "react-icons/md";
import { useSelector } from "react-redux";
import api from "../services/api";
import { toast } from "react-toastify";

const Batch = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [trainee, setTrainee] = useState({
    firstName: "",
    lastName: "",
    status: "active",
    location: "",
  });

  const storedLocations = useSelector(state => state.locations);

  let batch = useLoaderData();

  useEffect(() => {
    if (batch) {
      setTrainee({
        firstName: batch.firstName || "",
        lastName: batch.lastName || "",
        status: batch.status || "active",
        location: batch.location || "",
      });
    }
  }, [batch]);

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

  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='#'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          {batch?.batchName}
        </Link>

        <div className="mt-4 mx-6 shadow-xl rounded-lg p-6 bg-white">
          <form className="space-y-6" autoComplete="off">
            <div className="flex flex-col items-start space-y-4">
              {/* Batch Name */}
              <div className="flex flex-col sm:flex-row items-center w-full">
                <label
                  htmlFor="firstName"
                  className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                >
                  Batch Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Batch Name"
                  className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  disabled={!isEditing}
                  value={trainee.firstName || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div className="flex flex-col sm:flex-row items-center w-full">
                <label
                  htmlFor="location"
                  className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-1 sm:mb-0"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Location"
                  className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  disabled={true} 
                  value={trainee.location || ""}
                  style={{
                    cursor: isEditing ? "not-allowed" : "default",
                  }}
                />
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
                      checked={trainee.status === "active"}
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
                      checked={trainee.status === "inactive"}
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
    </>
  );
};

export default Batch;

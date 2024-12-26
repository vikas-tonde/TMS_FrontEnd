import api from "../services/api";
import { object, string, mixed } from 'yup';
import { useFormik } from 'formik';
import { FaDownload } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const bulkUserEntrySchema = object().shape({
  batchName: string().required("Batch Name is Required"),
  location: string().required("Location is required"),
  userDetailsFile: mixed().required('File is required')
});

function BulkEntryXlsx() {
  const submitHandler = async (values, actions) => {
    let files = document.querySelector('#userDetailsFile');
    let formdata = new FormData();
    formdata.append('file', files.files[0]);
    formdata.append('batchName', values.batchName);
    formdata.append('location', values.location);
    try {
      let response = await api.post("/api/admin/bulk/users", formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Users added...!');
    } catch (error) {
      toast.error('Something went wrong while adding Users, please check all fields carefully...!');
      console.log(error.response);
    }
    actions.resetForm();
  };

  const { handleChange, handleBlur, values, handleSubmit, errors, touched, isValid } = useFormik({
    initialValues: {
      batchName: '',
      location: '',
      userDetailsFile: '',
    },
    validationSchema: bulkUserEntrySchema,
    onSubmit: submitHandler
  });

  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='/users/addbulk'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Bulk Entry of Trainee using xlsx
        </Link>

        {/* Form Section */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 pt-5 bg-white">
          <div className="flex justify-center items-center w-full">
            <form className="w-auto max-w-2xl" onSubmit={handleSubmit}>
              <div className="space-y-6">

                {/* Batch Name */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="batchName" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Batch Name</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="text"
                      id="batchName"
                      name="batchName"
                      placeholder="Enter Batch Name"
                      value={values.batchName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.batchName && touched.batchName && <p className="text-[#dc2626]">{errors.batchName}</p>}
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="location" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Location</label>
                  <div className="w-full sm:w-96">
                    <select
                      id="location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full h-9 py-2 px-3 bg-white rounded-md border-0 text-gray-800 ring-1 ring-inset ring-gray-400"
                    >
                      <option value="" disabled>Select location</option>
                      {/* Add your location options here */}
                    </select>
                    {errors.location && touched.location && <p className="text-[#dc2626]">{errors.location}</p>}
                  </div>
                </div>

                {/* File Upload */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="userDetailsFile" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Upload Sheet</label>
                  <div className="w-full sm:w-96 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-3">
                    <div className="text-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <input
                          accept=".xlsx,.xls"
                          type="file"
                          name="userDetailsFile"
                          id="userDetailsFile"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                        />
                      </label>
                      <p className="text-xs leading-5 text-gray-600">Only .xlsx or .xls supported up to 10MB</p>
                    {errors.userDetailsFile && touched.userDetailsFile && ( <p className="text-xs text-[#dc2626]">{errors.userDetailsFile}</p> )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4"
                  >
                    Submit
                  </button>
                  <Link
                    className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4"
                    to="http://localhost:5000/api/users/download/trainee/input"
                  >
                    Download Sample
                    <FaDownload className="inline-block ml-2" />
                  </Link>
                </div>

              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default BulkEntryXlsx;

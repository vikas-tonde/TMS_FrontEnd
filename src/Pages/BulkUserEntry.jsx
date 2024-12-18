import api from "../services/api";
import { object, string, mixed } from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const bulkUserEntrySchema = object().shape({
  batchName: string().required("Batch Name is Required"),
  location: string().required("Location is required"),
  userDetailsFile: mixed().required('required')
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
      toast.error('Something went wrong while adding Users please check all fields carefully...!');
      console.log(error.response);
    }
    actions.resetForm();
  };

  const { handleChange, handleBlur, values, handleSubmit, errors, touched } = useFormik({
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
        {/* Dashboard Link */}
        <Link 
          to='/users/addbulk' 
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Bulk Entry of Trainee using xlsx
        </Link>

        {/* Form Section */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          <div className="flex justify-center items-center w-full">
            <form className="w-auto max-w-2xl" onSubmit={handleSubmit}>
              <div className="space-y-6">

                {/* Batch Name */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Batch Name</label>
                  <input
                    type="text"
                    id="batchName"
                    name="batchName"
                    placeholder="Enter Batch Name"
                    value={values.batchName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="shadow appearance-none block bg-white rounded-md w-full sm:w-96 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter Location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="shadow appearance-none block bg-white rounded-md w-full sm:w-96 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>

                {/* Upload Sheet */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Upload Sheet</label>
                  <div className="w-full sm:w-96 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
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
                          value={values.userDetailsFile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                        />
                      </label>
                      <p className="text-xs leading-5 text-gray-600">only .xlsx or .xls supported up to 10MB</p>
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

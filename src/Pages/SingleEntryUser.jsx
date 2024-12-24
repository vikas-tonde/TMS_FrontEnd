import { useFormik } from 'formik';
import React from "react";
import { useLoaderData } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string } from 'yup';
import api from "../services/api";
import { Link } from "react-router-dom";

const validationSchema = object().shape({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  employeeId: string().required('Employee ID is required'),
  role: string().required('Role is required'),
  location: string().required('Location is required'),
  batch: string().required("Batch is required"),
  password: string().required('Password is required'),
});

const SingleEntryUser = () => {
  let batches = useLoaderData();

  const submitHandler = async (values, actions) => {
    try {
      console.log(values);
      values.batchId = values.batch;
      const response = await api.post('/api/admin/single/users', values);
      console.log(response.data);
      toast.success('User added...!');
    } catch (error) {
      toast.error('Something went wrong while adding User, please check all fields carefully...!');
      console.log(error.response);
    }
    actions.resetForm();
  };

  const { handleChange, handleBlur, values, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      employeeId: '',
      role: '',
      location: '',
      password: '',
      batch: '',
    },
    validationSchema: validationSchema,
    onSubmit: submitHandler
  });

  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='#'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Add Single Entry of User
        </Link>

        {/* Form Section */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 pt-5 bg-white">
          <div className="flex justify-center items-center w-full">
            <form autoComplete="off" className="flex justify-center w-full" onSubmit={handleSubmit}>
              <div className="w-full max-w-2xl space-y-6">
                {/* First Name */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="firstName" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter First Name</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Enter First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.firstName && touched.firstName && <p className="text-[#dc2626]">{errors.firstName}</p>}
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="lastName" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter Last Name</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.lastName && touched.lastName && <p className="text-[#dc2626]">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="email" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter Email ID</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter Email ID"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.email && touched.email && <p className="text-[#dc2626]">{errors.email}</p>}
                  </div>
                </div>

                {/* Employee ID */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="employeeId" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter Employee ID</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="text"
                      id="employeeId"
                      placeholder="Enter Employee ID"
                      value={values.employeeId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.employeeId && touched.employeeId && <p className="text-[#dc2626]">{errors.employeeId}</p>}
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="role" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter Role</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="text"
                      id="role"
                      placeholder="Enter Role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.role && touched.role && <p className="text-[#dc2626]">{errors.role}</p>}
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="location" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter Location</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="text"
                      id="location"
                      placeholder="Enter Location"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.location && touched.location && <p className="text-[#dc2626]">{errors.location}</p>}
                  </div>
                </div>

                {/* Batch */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="batch" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Select Batch</label>
                  <div className="w-full sm:w-96">
                    <select
                      id="batch"
                      name="batch"
                      autoComplete="off"
                      value={values.batch}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full h-9 py-2 px-3 bg-white rounded-md border-0 text-gray-800 ring-1 ring-inset ring-gray-400"
                    >
                      <option value="" disabled>Select the batch</option>
                      {batches.map(batch => {
                        return <option key={batch._id} value={batch._id}>{batch.batchName}</option>;
                      })}
                    </select>
                    {errors.batch && touched.batch && <p className="text-[#dc2626]">{errors.batch}</p>}
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <label htmlFor="password" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Enter Password</label>
                  <div className="w-full sm:w-96">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                    {errors.password && touched.password && <p className="text-[#dc2626]">{errors.password}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-10"
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
};

export default SingleEntryUser;

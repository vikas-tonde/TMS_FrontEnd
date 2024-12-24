import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import { number, object, string } from 'yup';
import api from "../services/api.jsx";

const examFormSchema = object().shape({
  batch: string().required("Batch is required"),
  assessmentType: string().required("Assessment type is required"),
  assessmentId: string().required("Assessment name is required"),
  obtainedMarks: number().required("Obtained marks are required"),
  employeeId: string().required("Employee ID is required"),
});

const TraineeExamData = () => {
  let batches = useLoaderData();
  const [trainees, setTrainees] = useState([]);
  const [assessments, setAssessments] = useState([]);

  const submitHandler = async (values, actions) => {
    try {
      let reqBody = {
        assessmentId: values.assessmentId,
        employeeId: values.employeeId,
        obtainedMarks: values.obtainedMarks
      };
      let response = await api.post("/api/admin/single/assessment", reqBody);
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Something went wrong while adding user. Please check all fields carefully.');
      console.log(error.response.data.message);
    }
    actions.resetForm();
  };

  const { handleChange, handleBlur, values, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      batch: '',
      assessmentType: '',
      assessmentId: '',
      obtainedMarks: 0,
      employeeId: '',
    },
    validationSchema: examFormSchema,
    onSubmit: submitHandler
  });

  useEffect(() => {
    (async () => {
      if (values.batch) {
        try {
          let response = await api.get(`/api/admin/trainees/info/${values.batch}`);
          setTrainees(response.data.data);
        } catch (error) {
          setTrainees([]);
        }
      }
    })();
  }, [values.batch]);

  useEffect(() => {
    (async () => {
      if (values.assessmentType) {
        try {
          let response = await api.get(`/api/admin/assessments/${values.batch}/${values.assessmentType}`);
          setAssessments(response.data.data);
        } catch (error) {
          setAssessments([]);
        }
      }
    })();
  }, [values.assessmentType]);

  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        {/* Dashboard Link */}
        <Link
          to='/exams/single'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Add Trainee Exam Data for Single User
        </Link>

        {/* Form Wrapper */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          <div className="w-full flex justify-center">
            <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Batch Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label
                    htmlFor="batch"
                    className="block text-xl font-medium text-gray-900 sm:w-1/3"
                  >
                    Select batch
                  </label>
                  <div className="sm:w-2/3">
                    <select
                      id="batch"
                      name="batch"
                      value={values.batch}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-2 py-2 px-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>Select the batch</option>
                      {batches.map(batch => (
                        <option key={batch._id} value={batch._id}>{batch.batchName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Employee ID Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label
                    htmlFor="employeeId"
                    className="block text-xl font-medium text-gray-900 sm:w-1/3"
                  >
                    Employee Id
                  </label>
                  <div className="sm:w-2/3">
                    <select
                      id="employeeId"
                      name="employeeId"
                      value={values.employeeId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-2 py-2 px-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>Select the employee Id</option>
                      {trainees.length > 0 && trainees.map(trainee => (
                        <option key={trainee._id} value={trainee.employeeId}>
                          ({trainee.employeeId}) {trainee.firstName} {trainee.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Assessment Type Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label
                    htmlFor="assessmentType"
                    className="block text-xl font-medium text-gray-900 sm:w-1/3"
                  >
                    Assessment Type
                  </label>
                  <div className="sm:w-2/3">
                    <select
                      id="assessmentType"
                      name="assessmentType"
                      value={values.assessmentType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-2 py-2 px-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>Select an assessment type</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Presentation">Presentation</option>
                    </select>
                  </div>
                </div>

                {/* Assessment Name Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label
                    htmlFor="assessmentId"
                    className="block text-xl font-medium text-gray-900 sm:w-1/3"
                  >
                    Assessment Name
                  </label>
                  <div className="sm:w-2/3">
                    <select
                      id="assessmentId"
                      name="assessmentId"
                      value={values.assessmentId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-2 py-2 px-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>Select an assessment</option>
                      {assessments.length > 0 && assessments.map(assessment => (
                        <option key={assessment._id} value={assessment._id}>
                          {assessment.moduleName} - {assessment.assessmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Obtained Marks */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label
                    htmlFor="obtainedMarks"
                    className="block text-xl font-medium text-gray-900 sm:w-1/3"
                  >
                    Obtained Marks
                  </label>
                  <div className="sm:w-2/3">
                    <input
                      type="number"
                      id="obtainedMarks"
                      name="obtainedMarks"
                      value={values.obtainedMarks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-2 py-2 px-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="px-6 py-1 mb-4 bg-[#0A1C3E] text-xl text-white font-semibold rounded-full shadow-lg"
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

export default TraineeExamData;

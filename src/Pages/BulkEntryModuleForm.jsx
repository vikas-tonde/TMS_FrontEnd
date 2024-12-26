import { useLoaderData } from "react-router";
import api from "../services/api";
import { Link } from "react-router-dom";
import SelectorForTestDetails from "./SelectorForTestDetails";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { object, string, number, mixed } from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const examFormSchema = object().shape({
    assessmentName: string().required("Assessment Name is required"),
    examDate: string().required("Exam Date is required"),
    assessmentType: string().required("Assessment Type is required"),
    totalMarks: number().positive().required("Total Marks are required"),
    examFile: mixed().required('Excel file is required')
});

function BulkEntryModuleForm() {
    let loaderModules = useLoaderData();
    const [modules, setModules] = useState([...loaderModules, "other"]);
    const [selectedModule, setselectedModule] = useState("");
    const [otherModule, setOtherModule] = useState("");
    const [otherModuleBlur, setOtherModuleBlur] = useState("");

    useEffect(() => {
        if (selectedModule === 'other') {
            setselectedModule(otherModule);
        }
    }, [otherModule]);

    const submitHandler = async (values, actions) => {
        let files = document.querySelector('#examFile');
        let formdata = new FormData();
        formdata.append('file', files.files[0]);
        formdata.append('moduleName', selectedModule);
        formdata.append('date', values.examDate);
        formdata.append('totalMarks', values.totalMarks);
        formdata.append('assessmentName', values.assessmentName);
        formdata.append('assessmentType', values.assessmentType);

        try {
            let response = await api.post("/api/admin/bulk/test", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Assessments added successfully!');
        } catch (error) {
            toast.error('Something went wrong while adding assessment. Please check all fields.');
        }
        actions.resetForm();
    };

    const { handleChange, handleBlur, values, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues: {
            assessmentName: '',
            examDate: '',
            assessmentType: '',
            totalMarks: '',
            examFile: '',
        },
        validationSchema: examFormSchema,
        onSubmit: submitHandler
    });

    return (
        <>
            <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
                <Link
                    to="#"
                    className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
                >
                    Form for Test Details Sheet Upload
                </Link>

                <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 pt-5 bg-white">
                    <form className="w-auto max-w-2xl mx-auto" onSubmit={handleSubmit}>
                        <div className="space-y-6">

                            {/* Assessment Name */}
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <label htmlFor="assessmentName" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Assessment Name</label>
                                <div className="w-full sm:w-96">
                                    <input
                                        type="text"
                                        id="assessmentName"
                                        name="assessmentName"
                                        placeholder="Enter Quiz Name"
                                        value={values.assessmentName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    />
                                    {errors.assessmentName && touched.assessmentName && <p className="text-[#dc2626]">{errors.assessmentName}</p>}
                                </div>
                            </div>

                            {/* Assessment Type */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <label htmlFor="assessmentType" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Select Assessment Type</label>
                                <div className="w-full sm:w-96">

                                    <select
                                        className="shadow appearance-none block bg-white rounded-md w-full sm:w-96 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                        id="assessmentType"
                                        name="assessmentType"
                                        value={values.assessmentType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="" disabled selected>Choose an Assessment Type</option>
                                        <option value="Quiz">Quiz</option>
                                        <option value="Assignment">Assignment</option>
                                        <option value="Presentation">Presentation</option>
                                    </select>
                                    {errors.assessmentType && touched.assessmentType && <p className="text-[#dc2626]">{errors.assessmentType}</p>}
                                </div>
                            </div>

                            {/* Module Name */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <label className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Module Name</label>
                                <SelectorForTestDetails
                                    modulesProps={modules}
                                    setSelected={setselectedModule}
                                    selected={selectedModule}
                                />
                            </div>

                            {/* Other Module Name */}
                            {selectedModule === 'other' && (
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <label className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Other Module Name</label>
                                    <input
                                        type="text"
                                        id="otherModule"
                                        name="otherModule"
                                        value={otherModuleBlur}
                                        onChange={(e) => setOtherModuleBlur(e.target.value)}
                                        onBlur={(e) => setOtherModule(e.target.value)}
                                        placeholder="Enter Module Name"
                                        className="shadow appearance-none block bg-white rounded-md w-full sm:w-96 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    />
                                </div>
                            )}

                            {/* Exam Date */}
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <label htmlFor="examDate" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Date</label>
                                <div className="w-full sm:w-96">
                                    <input
                                        type="text"
                                        id="examDate"
                                        name="examDate"
                                        placeholder="Enter date in format mm-dd-yyyy"
                                        value={values.examDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    />
                                    {errors.examDate && touched.examDate && <p className="text-[#dc2626]">{errors.examDate}</p>}
                                </div>
                            </div>

                            {/* Total Marks */}
                            <div className="flex flex-col sm:flex-row items-start justify-between">
                                <label htmlFor="totalMarks" className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Total Marks</label>
                                <div className="w-full sm:w-96">
                                    <input
                                        type="number"
                                        id="totalMarks"
                                        name="totalMarks"
                                        min="0"
                                        value={values.totalMarks}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Total Marks"
                                        className="shadow appearance-none block bg-white rounded-md w-full h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    />
                                    {errors.totalMarks && touched.totalMarks && <p className="text-[#dc2626]">{errors.totalMarks}</p>}
                                </div>
                            </div>

                            {/* Upload Sheet */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <label className="text-gray-700 text-xl font-bold mb-2 sm:mr-4">Upload Sheet</label>
                                <div className="w-full sm:w-96 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-3">
                                    <div className="text-center">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <input
                                                accept=".xlsx,.xls"
                                                type="file"
                                                name="examFile"
                                                id="examFile"
                                                value={values.examFile}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                                            />
                                        </label>
                                        <p className="text-xs leading-5 text-gray-600">only .xlsx or .xls supported up to 10MB</p>
                                        {errors.examFile && touched.examFile && (<p className="text-xs text-[#dc2626]">{errors.examFile}</p>)}
                                    </div>
                                </div>
                            </div>



                            {/* Submit Button */}
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    // ref={submitButtonRef}
                                    disabled={!isValid}
                                    className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                                <Link
                                    className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4"
                                    to="#"
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
        </>
    );
}

export default BulkEntryModuleForm;

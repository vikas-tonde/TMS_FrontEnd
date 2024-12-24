import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

const TraineeInfo = () => {
    const loaderData = useLoaderData();
    const [trainee, setTrainee] = useState({});

    useEffect(() => {
        setTrainee({ ...loaderData });
    }, []);

    return (
        <>
            <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
                <p
                    className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
                >
                    Module Information of Trainee
                </p>

                {/* Form Wrapper */}
                <div className="mt-4 mx-6 shadow-xl rounded-lg p-6 bg-white">
                    <form className="space-y-6" autoComplete="off">
                        <div className="flex flex-col items-start space-y-4">
                            {/* Name of Trainee */}
                            <div className="flex flex-col sm:flex-row items-center w-full">
                                <label
                                    htmlFor="name"
                                    className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
                                >
                                    Name of Trainee
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Trainee Name"
                                    className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    disabled
                                    value={`${trainee?.firstName} ${trainee?.lastName}`}
                                />
                            </div>

                            {/* Employee ID */}
                            <div className="flex flex-col sm:flex-row items-center w-full">
                                <label
                                    htmlFor="employeeId"
                                    className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
                                >
                                    Employee Id
                                </label>
                                <input
                                    type="text"
                                    id="employeeId"
                                    placeholder="Employee Id"
                                    className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    disabled
                                    value={trainee?.employeeId}
                                />
                            </div>

                            {/* Average Marks */}
                            <div className="flex flex-col sm:flex-row items-center w-full">
                                <label
                                    htmlFor="marks"
                                    className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
                                >
                                    Average Marks
                                </label>
                                <input
                                    type="number"
                                    id="marks"
                                    name="marks"
                                    min="0"
                                    placeholder="Average Marks"
                                    className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    disabled
                                    value={trainee?.averageMarks}
                                />
                            </div>

                            {/* Remarks */}
                            <div className="flex flex-col sm:flex-row items-center w-full">
                                <label
                                    htmlFor="remark"
                                    className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
                                >
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    id="remark"
                                    name="remark"
                                    placeholder="Remarks"
                                    className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center w-full">
                                <button
                                    className="bg-[#0A1C3E] text-white font-medium text-sm rounded-lg px-5 py-2.5 hover:bg-white hover:text-[#0A1C3E] border border-white focus:outline-none focus:ring-4 focus:ring-[#0A1C3E]"
                                    type="submit"
                                >
                                    Send Remark
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TraineeInfo;

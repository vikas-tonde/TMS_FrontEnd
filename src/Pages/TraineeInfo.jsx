import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

const TraineeInfo = () => {
    const loaderData = useLoaderData();
    const [trainee, setTrainee] = useState({});

    useEffect(() => {
        setTrainee({...loaderData});
    }, [])
    
    return (
    <>
        <div className=" mx-auto max-w-full md:p-3 2xl:p-6">
            <h1 className="text-2xl font-semibold text-center py-2 text-[#0A1C3E] dark:text-white border-b border-gray-200 dark:border-gray-700">Module Information of Trainee</h1>

            <form className=" justify-center " autoComplete="off">
                <div className="space-y-8 mx-auto  flex items-center justify-center bg">
                    <div className=" border-gray-900/10 items-center">   
                        <div className="m-5 col-span-full flex items-center ">
                            <label className="flex items-center justify-center text-gray-700 text-xl font-bold mt-1 mb-2 mr-20" >Name of Trainee</label>
                            <div className=" pl-2">
                                <input
                                    type="text"
                                    id="name" 
                                    placeholder="Trainee Name"
                                    className="shadow appearance-none block bg-white rounded-md w-96 h-9 py-2 px-3 ml-2 mr-5 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    disabled
                                    value={`${trainee?.firstName} ${trainee?.lastName}`}
                                />
                            </div>
                        </div>
                        <div className="m-5 col-span-full flex items-center ">
                            <label className="flex items-center justify-center text-gray-700 text-xl font-bold mt-1 mb-2 mr-32" >Employee Id</label>
                            <div className=" pl-2">
                                <input
                                    type="text"
                                    id="employeeId" 
                                    placeholder="Employee Id"
                                    className="shadow appearance-none block bg-white rounded-md w-96 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    disabled
                                    value={trainee?.employeeId}
                                />
                            </div>
                        </div>
                        <div className="m-5 col-span-full flex items-center ">
                            <label className="flex items-center justify-center text-gray-700 text-xl font-bold mt-1 mb-2 mr-28" >Average Marks</label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="marks"
                                    min="0"
                                    placeholder="Average Marks"
                                    className="shadow appearance-none block bg-white rounded-md w-96 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                    disabled
                                    value={trainee?.averageMarks}
                                />
                            </div>
                        </div>
                        <div className="m-5 col-span-full flex items-center ">
                            <label className="flex items-center justify-center text-gray-700 text-xl font-bold mt-1 mb-2 mr-36" htmlFor="remark" >Remarks</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    placeholder="Remarks"
                                    name="remark"
                                    id="remark"
                                    className="shadow appearance-none block bg-white rounded-md w-96 h-9 py-2 px-3 ml-7 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 me-2 mb-10 dark:border-[#0A1C3E] dark:text-[#0A1C3E] dark:hover:text-white  dark:focus:ring-[#0A1C3E]" variant="primary" onClick="" type="submit" >Send Remark</button>
                        </div>
                        {/* <div>
                            {module.map((moduleName, index)=>
                                    <button className="border-black m-2 p-2 rounded-md bg-[#0A1C3E] text-white " key={index} onClick={() => handleShowGraph(moduleName)} value={moduleName}>{moduleName} </button>
                                )}
                        </div> */}
                        {/* <div>
                            <select className="w-48">
                                {module.map((moduleName, index)=>
                                    <option key={index} value={moduleName}>{moduleName}</option>
                                )}
                            </select>
                        </div> */}
                        {/* <div className='pt-5 '>
                            <ReactApexChart options={options} series={series} type="line" height={500} width={750} />
                        </div> */}
                    </div>
                </div>
                {/* <div className="flex items-center ml-80 mt-10  ">
                    <button className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 me-2 mb-10 dark:border-[#0A1C3E] dark:text-[#0A1C3E] dark:hover:text-white  dark:focus:ring-[#0A1C3E]" variant="primary" onClick="" type="submit" >Submit</button>
                </div> */}
            </form>
        </div>
    </>
    )
}

export default TraineeInfo;

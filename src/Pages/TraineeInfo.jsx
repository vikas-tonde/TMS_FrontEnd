import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import api from "../services/api";

const TraineeInfo = () => {
  const loaderData = useLoaderData();
  const [trainee, setTrainee] = useState({});
  const [remark, setRemark] = useState("");

  useEffect(() => {
    setTrainee({ ...loaderData });
  }, [loaderData]);

  const handleSendRemark = async () => {
    console.log(remark);
    try {
      let response = await api.put("/api/admin/users/user/remark", {
        employeeId: trainee.employeeId,
        remark: remark
      });
      setTrainee(response.data.data);
      console.log(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to="#"
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Remarks for trainee
        </Link>

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
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="shadow appearance-none block bg-white rounded-md w-full sm:w-2/3 h-9 py-2 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full">
                <button
                  type="button"
                  className="text-white disabled:bg-gray-400 bg-[#0A1C3E] hover:text-white border border-white hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSendRemark}
                  disabled={!remark.trim()}
                >
                  Send Remark
                </button>
              </div>
            </div>
          </form>
          {
            trainee?.remarks && <div className="flex flex-col sm:flex-row items-center w-full mt-3">
              <label
                htmlFor="remark"
                className="text-xl font-bold text-gray-700 w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Remarks till now
              </label>
              <div className="flex flex-col">
                <table className="border border-black">
                  <thead className="border border-black">
                    <tr className="border border-black">
                      <th className="border border-black px-4">Sr. No.</th>
                      <th className="border border-black px-4">Date</th>
                      <th className="border border-black px-4">Remark</th>
                    </tr>
                  </thead>
                  <tbody className="border border-black">
                    {
                      trainee && trainee.remarks.map((remarkVar, index) => {
                        return (<tr key={index} className="border border-black">
                          <td className="border border-black px-4">{index + 1}</td>
                          <td className="border border-black px-4">{remarkVar.date}</td>
                          <td className="border border-black px-4">{remarkVar.value}</td>
                        </tr>)
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>}
        </div>
      </div>

    </>
  );
}

export default TraineeInfo;

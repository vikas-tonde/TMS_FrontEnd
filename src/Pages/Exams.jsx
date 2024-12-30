import React, { useEffect, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import api from "../services/api";

function Exams() {
  const batches = useLoaderData();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        console.log(selectedBatch);
        if (selectedBatch) {
          const response = await api.get(`/api/admin/assessments/${selectedBatch}`);
          console.log(response.data.data);
          setExams(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
        setLoading(false);
      }
    })();
  }, [selectedBatch]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("srno", {
      id: "srno",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Sr. No.",
    }),
    columnHelper.accessor("assessmentName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Assessment Name",
    }),
    columnHelper.accessor("moduleName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Module Name",
    }),
    columnHelper.accessor("date", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Date",
    }),
    columnHelper.accessor("totalMarks", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Total Marks",
    }),
    columnHelper.accessor("assessmentType", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Assessment Type",
    }),
    columnHelper.accessor("Action", {
      id: "edit",
      cell: (info) => {
        const slug = info.row._id;
        return <Link to={`/exams/${slug}`}>Edit</Link>;
      },
      header: "Action",
    }),
  ];

  const filteredExams = exams.filter((exam) => {
    const searchTerm = search.toLowerCase();
    return (
      exam.assessmentName.toLowerCase().includes(searchTerm) ||
      exam.moduleName.toLowerCase().includes(searchTerm)
    );
  });

  const table = useReactTable({
    data: filteredExams,
    columns,
    state: {},
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='/exams'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Table of Exams
        </Link>

        {/* StatisticsTabsMenu without 3D effect */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          <div className="mx-auto max-w-full md:p-3 2xl:p-6 flex justify-center flex-col items-center">

            <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
              <label htmlFor="batch" className="text-gray-700 text-xl font-semibold mb-1 sm:mr-4">
                Select Batch
              </label>
              <div className="w-full sm:w-96">
                <select
                  id="batch"
                  name="batch"
                  autoComplete="off"
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="block w-full h-9 py-2 px-3 bg-white rounded-md border-0 text-gray-800 ring-1 ring-inset ring-gray-400"
                >
                  <option value="" disabled>
                    Select the batch
                  </option>
                  {batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.batchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-2 w-full flex items-center justify-start space-x-2">
              <svg className="w-5 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pr-2 py-1 w-full text-gray-800 focus:outline-none"
                placeholder="Search Exam by Name or Module"
              />
            </div>
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto scrollbar-hidden shadow-md rounded-lg mt-2">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="bg-[#0A1C3E] text-white">
                <tr>
                  <th scope="col" className="py-3 px-2 text-center">Sr. No.</th>
                  <th scope="col" className="py-3 px-2 text-center">Assessment Name</th>
                  <th scope="col" className="py-3 px-2 text-center">Module Name</th>
                  <th scope="col" className="py-3 px-2 text-center">Date</th>
                  <th scope="col" className="py-3 px-2 text-center">Total Marks</th>
                  <th scope="col" className="py-3 px-2 text-center">Assessment Type</th>
                  <th scope="col" className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((row, i) => (
                    <tr
                      key={row._id}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-300 hover:bg-gray-200`}
                    >
                      <td className="py-2 px-2 text-center">{i + 1}</td>
                      <td className="py-2 px-2 text-center">{row.assessmentName}</td>
                      <td className="py-2 px-2 text-center">{row.moduleName}</td>
                      <td className="py-2 px-2 text-center">{row.date}</td>
                      <td className="py-2 px-2 text-center">{row.totalMarks}</td>
                      <td className="py-2 px-2 text-center">{row.assessmentType}</td>
                      <td className="py-2 px-2 text-center">
                        <Link to={`/exams/${row._id}`}>
                          <button className="bg-[#0A1C3E] text-white font-bold py-2 px-4 rounded">Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center h-32">
                    <td colSpan={7}>No Record Found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exams;

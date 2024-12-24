import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from "react-router";
function Exam() {
  const details = useLoaderData();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    setCandidates(details?.candidates);
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "srno",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Sr.No.",
    }),
    columnHelper.accessor("employeeId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Employee ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: " Name",
    }),
    columnHelper.accessor("score", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Average Marks",
    }),

  ];

  const [globalFilter] = useState("");

  const [search, setsearch] = useState("");

  const table = useReactTable({
    data: candidates,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='#'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Assessment Details
        </Link>

        {/* StatisticsTabsMenu without 3D effect */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          <h4 className="text-2xl font-semibold text-center py-2 text-[#0A1C3E] dark:text-white border-b border-gray-200 dark:border-gray-700">Candidates of Assessment - {details.assessmentName}</h4>
          <div className="flex justify-center">
            <div className='px-3 py-2'>Module: {details.moduleName}</div>
            <div className='px-3 py-2'>Total Marks: {details.totalMarks}</div>
            <div className='px-3 py-2'>Date: {details.date}</div>
          </div>

          <div x-data="{ search: '' }">
            <div class="mb-2 w-full flex items-center justify-start space-x-2">
              <svg class="w-5 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <input
                type="search"
                onChange={(e) => { setsearch(e.target.value) }}
                class="h-8 pr-2 py-1 w-full text-gray-800 focus:outline-none"
                placeholder="Search Trainee by Id / Name" />
            </div>
          </div>

          <table className="shadow-sm p-6 h-max w-full text-left mb-5 border-spacing-0" id="table-to-xls">
            <thead className="bg-[#0A1C3E] text-white p-3 h-16 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="capitalize px-4 py-2 ">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {candidates.length ? (
                candidates.filter((item) => {
                  let searchValue = search.toLowerCase();
                  let name = item.firstName + " " + item.lastName;
                  return search.toLowerCase() === '' ? item : item.employeeId.toLowerCase().includes(searchValue) || name.toLowerCase().includes(searchValue)
                }).map((row, i) => (
                  <tr
                    key={i}
                    className={`
                  ${i % 2 === 0 ? "bg-white" : "bg-white"} border-b border-gray-300 h-16 hover:bg-gray-200 
                  `}
                  >
                    <td className="px-4 py-2 ">{i + 1}</td>
                    <td className="px-4 py-2 ">{row.employeeId}</td>
                    <td className="px-4 py-2 ">{row.firstName + " " + row.lastName}</td>
                    <td className="px-4 py-2 ">{row.score}</td>
                  </tr>
                ))
              ) : (
                <tr className="text-center h-32">
                  <td colSpan={12}>No Record Found!</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}

export default Exam
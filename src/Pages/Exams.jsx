import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import api from "../services/api";

function Exams() {
  const batches = useLoaderData();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState("");

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

  const [search, setSearch] = useState("");

  const table = useReactTable({
    data: exams,
    columns,
    state: {},
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className=" mx-auto max-w-full md:p-3 2xl:p-6">
        <h1 className="text-2xl font-semibold text-center py-2 text-[#0A1C3E] dark:text-white border-b border-gray-200 dark:border-gray-700">Table of Exams</h1>

        <div className="" x-data="{ search: '' }">
          <div className=" mb-2 w-50 flex rounded-md">
            <svg className="w-5 h-8 pl-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <input
              type="search"
              onChange={(e) => { setSearch(e.target.value) }}
              className="h-8 px-4 py-1 w-1/3 text-gray-800 focus:outline-none"
              placeholder="Search Trainee by Id / Name"
              x-model="search" />
          </div>
        </div>

        <div className="m-10 col-span-full flex w items-center justify-center">
          <label
            htmlFor="batch"
            className="block text-xl font-medium h-9 mt-4  text-gray-900 mr-2"
          >
            Select batch :
          </label>
          <div className="mt-4 pl-10">
            <select
              id="batch"
              name="batch"
              autoComplete="off"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="block w-96 h-9 rounded-md border-0 py-1.5 text-gray-800 shadow-xl ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset  focus:text-gray-800 mr-2 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="" selected disabled>Select the batch</option>
              {batches.map(batch => (
                <option key={batch._id} value={batch._id}>{batch.batchName}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="shadow-sm p-6 h-max w-full text-left mb-5 border-spacing-0" id="table-to-xls">
          <thead className="bg-blue text-white p-3 h-16 ">
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
            {exams?.length ? (
              exams.map((row, i) => (
                <tr
                  key={row.i}
                  className={`
                    ${i % 2 === 0 ? "bg-white" : "bg-white"} border-b border-gray-300 h-16 hover:bg-neutral-200 
                    `}
                >
                  <td className="px-4 py-2 ">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.assessmentName}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.moduleName}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.date}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.totalMarks}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.assessmentType}
                  </td>
                  <td key="edit" className="px-4 py-2">
                    <Link to={`/exams/${row._id}`}>
                      <button className="bg-blue text-white font-bold py-2 px-4 rounded" >
                        Details
                      </button>
                    </Link>
                  </td>
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
    </>
  )
}

export default Exams
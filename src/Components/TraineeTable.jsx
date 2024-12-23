import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { GiSightDisabled } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import api from "../services/api";

const TraineeTable = () => {
  const batches = useLoaderData();
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState("");
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        console.log(selectedBatch);
        if (selectedBatch) {
          const response = await api.get(`/api/admin/trainees/info/${selectedBatch}`);
          console.log(response.data.data);
          setTrainees(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching trainees:", error);
        setLoading(false);
      }
    };
    fetchTrainees();
  }, [selectedBatch]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "srno",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "",
    }),
    columnHelper.accessor("empId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Employee ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),
    columnHelper.accessor("", {
      id: "edit",
      cell: (info) => {
        const slug = info.row.original.employeeId;
        return <Link to={`/table/${slug}`}>Edit</Link>;
      },
      header: "",
    }),
  ];
  const [globalFilter] = useState("");

  const [search, setSearch] = useState("");

  const table = useReactTable({
    data: trainees,
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
          to='/users' 
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Table of Trainee
        </Link>

        {/* StatisticsTabsMenu without 3D effect */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">

        <div className=" mx-auto max-w-full md:p-3 2xl:p-6 flex justify-center flex-col items-center">
        <div className="m-6 py-2 w-full md:w-1/2 flex items-center justify-between md:justify-center rounded-full border shadow-lg">
  <label
    htmlFor="batch"
    className="block text-xl h-9 mt-2 font-medium text-gray-900 mr-2"
  >
    Select batch
  </label>
  <div className="pl-0 md:pl-10">
    <select
      id="batch"
      name="batch"
      autoComplete="off"
      value={selectedBatch}
      onChange={(e) => setSelectedBatch(e.target.value)}
      className="block w-full md:w-96 h-9 rounded-md border-0 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:text-gray-800 sm:max-w-xs sm:text-sm sm:leading-6"
    >
      <option value="" disabled>Select the batch</option>
      {batches.map(batch => (
        <option key={batch._id} value={batch._id}>{batch.batchName}</option>
      ))}
    </select>
  </div>
</div>


        <div className="flex w-full" xData="{ search: '' }">
          <div className=" mb-2 w-auto flex rounded-md">
            <svg className="w-5 h-8 pl-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <input
              type="search"
              onChange={(e) => { setSearch(e.target.value) }}
              className="h-8 px-4 py-1 w-96 text-gray-800 focus:outline-none"
              placeholder="Search Trainee by Id / Name"
              xModel="search" />
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
            {trainees?.length ? (
              trainees.map((row, i) => (
                <tr
                  key={row.i}
                  className={`
                  ${i % 2 === 0 ? "bg-white" : "bg-white"} border-b border-gray-300 h-16 hover:bg-neutral-200 
                  `}
                >
                  <td className="px-4 py-2 ">
                    <input
                      type="checkbox"
                      // Assuming row.srno is unique
                      value={row.srno}
                    // Add your checkbox handler function here
                    />
                    {row.srno}

                  </td>
                  <td className="px-4 py-2 ">
                    {row.employeeId}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.firstName} {row.lastName}
                  </td>
                  <td className="px-4 py-2 ">
                    {row.email}
                  </td>
                  <td key="edit" className="px-4 py-2 flex space-x-2">
                    <button title="disable" className="bg-blue text-white text-lg font-extrabold py-2 px-4 rounded flex items-center justify-center h-10" >
                      <GiSightDisabled className=""/>
                    </button>
                    <Link className="bg-blue text-white font-bold py-2 px-4 rounded flex items-center justify-center w-10 h-10" to={`/table/${row.employeeId}`}>
                      <button className="">
                          <MdEdit />
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
        </div>
      </div>

     
    </>
  );
};

export default TraineeTable;

import { useState, useEffect } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import api from "../services/api";

const Table = () => {
  const [trainees, setTrainees] = useState([]);
  const [srno, setSrno] = useState(1);

  const incrementSrno = () => {
    setSrno(srno + 1);
  };

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await api.get(`/api/admin/trainees/Pune`);
        console.log(response.data.data);
        setTrainees(response.data.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching trainees:", error);
        // setLoading(false);
      }
    };
    fetchTrainees();
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
    columnHelper.accessor("avgMarks", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Average Marks",
    }),
    columnHelper.accessor("", {
      id: "empId",
      cell: (info) => {
        const empId = info.row.original.employeeId;
        const slug = empId;
        return <Link to={`/traineeInfo/${slug}`}>Edit</Link>;
      },
      header: "",
    }),
  ];

  const [globalFilter] = useState("");

  const [search, setsearch] = useState("");

  const table = useReactTable({
    data: trainees,
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
      <div className=" mx-auto max-w-full md:p-3 2xl:p-6">
      <span className="relative flex mt-6 justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
        <span className="text-2xl font-semibold relative z-10 text-[#0A1C3E] bg-white px-6">Table of Trainee</span>
      </span>
        <div className="" x-data="{ search: '' }">
          <div className="ml-1 w-50 flex items-center rounded-md">
            <div className="flex items-center px-2">
              <svg className="w-5 h-8 pl-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>

            <div className="flex-1">
              <input
                type="search"
                onChange={(e) => { setsearch(e.target.value) }}
                className="h-8 px-2 py-1 w-full text-gray-800 focus:outline-none"
                placeholder="Search Trainee by Id / Name"
                x-model="search" />
            </div>
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
            {trainees.length ? (
              trainees.filter((item) => {
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
                  <td className="px-4 py-2 ">{row.Exams[0]?.averageMarks}</td>
                  <td className="px-4 py-2">
                    <Link to={`/dashboard/${row.employeeId}`}>
                      <button className="bg-[#0A1C3E] text-white font-bold py-2 px-4 rounded" >
                        View
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
  );
};


export default Table;

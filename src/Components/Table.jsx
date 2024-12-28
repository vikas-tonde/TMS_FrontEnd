import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Table = () => {
  const [trainees, setTrainees] = useState([]);
  const activeLocation = useSelector(state => state.location);
  const traineesSelected = useSelector(state => state.trainees);
  useEffect(() => {
    setTrainees(traineesSelected);
  }, [activeLocation, traineesSelected]);

  const [search, setsearch] = useState("");

  return (
    <>
      <div className=" mx-auto max-w-full md:py-3 2xl:p-6">
        <span className="relative flex mt-6 justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
          <span className="text-2xl font-semibold relative z-10 text-[#0A1C3E] bg-white px-6">Table of Trainee</span>
        </span>
        <div x-data="{ search: '' }">
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

        {/* --- Table ---*/}
        <div className="relative overflow-x-auto scrollbar-hidden shadow-md rounded-lg mt-2">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="bg-[#0A1C3E] text-white">
              <tr>
                <th scope="col" className="py-3 px-2 text-center">
                  Sr. No.
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                  Employee Id
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                  Name
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                  Average Marks
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trainees.length ? (
                trainees
                  .filter((item) => {
                    let searchValue = search.toLowerCase();
                    let name = item.firstName + " " + item.lastName;
                    return search.toLowerCase() === ''
                      ? item
                      : item.employeeId.toLowerCase().includes(searchValue) ||
                      name.toLowerCase().includes(searchValue);
                  })
                  .map((row, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-white"
                        } border-b border-gray-300 hover:bg-gray-200`}
                    >
                      <td className="py-2 px-2 text-center font-medium text-gray-900 whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td className="py-2 px-2 text-center">{row.employeeId}</td>
                      <td className="py-2 px-2 text-center">{row.firstName + " " + row.lastName}</td>
                      <td className="py-2 px-2 text-center">{row.Exams[0]?.averageMarks}</td>
                      <td className="py-2 px-2 text-center">
                        <Link to={`/dashboard/${row.employeeId}`}>
                          <Button className="">
                            View
                          </Button>
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
    </>
  );
};


export default Table;

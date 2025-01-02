import { useState } from "react";
import { Link } from "react-router-dom";
import { createColumnHelper, useReactTable, flexRender } from "@tanstack/react-table";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useLoaderData } from "react-router";

const BatchTable = () => {
  const batches = useLoaderData();
  const [disabledBatches, setDisabledBatches] = useState(new Set());
  const [search, setSearch] = useState("");

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "srno",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Sr.No.",
    }),
    columnHelper.accessor("batchName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Batch Name",
    }),
    columnHelper.accessor("", {
      id: "actions",
      cell: (info) => {
        const batchId = info.row.original._id;
        return (
          <button
            title={disabledBatches.has(batchId) ? "Enable" : "Disable"}
            onClick={() => handleToggleStatus(batchId)}
            className="bg-blue text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            {disabledBatches.has(batchId) ? <IoMdEye /> : <IoMdEyeOff />}
          </button>
        );
      },
      header: "Actions",
    }),
  ];

  const table = useReactTable({
    data: batches,
    columns,
  });


  const handleToggleStatus = (batchId) => {
    setDisabledBatches((prev) => {
      const newDisabled = new Set(prev);
      if (newDisabled.has(batchId)) {
        newDisabled.delete(batchId);
      } else {
        newDisabled.add(batchId);
      }
      return newDisabled;
    });
  };

  return (
    <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
      <Link
        to='/batch'
        className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
      >
        All Batches
      </Link>

      <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
        <div className="mx-auto max-w-full md:p-3 2xl:p-6">

          <div className="mb-2 w-full flex items-center justify-start space-x-2">
            <svg
              className="w-5 h-8 mr-1 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pr-2 py-1 w-full text-gray-800 focus:outline-none"
              placeholder="Search Batch by Name"
            />
          </div>

          <div className="overflow-x-auto w-full scrollbar-hidden rounded-lg mt-2">
            <table className="shadow-sm p-6 h-max w-full text-left mb-3 border-spacing-0" id="table-to-xls">
              <thead className="bg-[#0A1C3E] text-white p-3">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="capitalize text-center py-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {batches.length ? (
                  batches
                    .filter((item) =>
                      search.toLowerCase() === '' ? item : item.batchName.toLowerCase().includes(search)
                    )
                    .map((row, i) => (
                      <tr
                        key={row._id}
                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-white'
                          } border-b border-gray-300 h-16 hover:bg-neutral-200`}
                      >
                        <td className="text-center py-2">{i + 1}</td>
                        <td className="text-center py-2">{row.batchName}</td>
                        <td className="text-center py-2">
                          <button
                            title={disabledBatches.has(row._id) ? "Enable" : "Disable"}
                            onClick={() => handleToggleStatus(row._id)}
                            className="bg-blue text-white font-bold py-2 px-4 rounded items-center justify-center"
                          >
                            {disabledBatches.has(row._id) ? <IoMdEye /> : <IoMdEyeOff />}
                          </button>
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
    </div>
  );
};

export default BatchTable;

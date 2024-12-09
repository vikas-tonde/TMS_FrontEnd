import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import api from "../services/api";


const TraineeExamTable = () => {

	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			let response = await api.get("/api/trainee/exams");
			console.log(response.data.data);
			setData(response.data.data);
		} catch (error) {
			setData([]);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])

	const columnHelper = createColumnHelper();

	const columns = [
		columnHelper.accessor("", {
			id: "srno",
			cell: (info) => <span>{info.row.index + 1}</span>,
			header: "Sr.No.",
		}),
		columnHelper.accessor("date", {
			cell: (info) => <span>{info.getValue()}</span>,
			header: "Date",
		}),
		columnHelper.accessor("moduleName", {
			cell: (info) => <span>{info.getValue()}</span>,
			header: "Module Name",
		}),
		columnHelper.accessor("assessmentName", {
			cell: (info) => <span>{info.getValue()}</span>,
			header: "Assessment Name",
		}),
		columnHelper.accessor("assessmentType", {
			cell: (info) => <span>{info.getValue()}</span>,
			header: "Assessment Type",
		}),
		columnHelper.accessor("marksObtained", {
			cell: (info) => <span>{info.getValue()}</span>,
			header: "Marks Obtained",
		}),
	];
	// const [data, setData] = useState([
	//      { id: 1, date: '29-02-2024', examName: "ITK" , marks : 12 },
	//      { id: 2, date: '29-02-2024', examName: "Teamcenter" , marks : 11 },
	//      { id: 3, date: '29-02-2024', examName: "RAC" , marks : 10 },
	//      { id: 4, date: '29-02-2024', examName: "BMIDE" , marks : 19 },
	//      { id: 5, date: '29-02-2024', examName: "AWC" , marks : -15 },
	// ]);
	const [globalFilter] = useState("");

	const [search, setsearch] = useState("");

	const table = useReactTable({
		data,
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
				<h1 className="text-2xl font-semibold text-center py-2 text-[#0A1C3E] dark:text-white border-b border-gray-200 dark:border-gray-700">Table of Exams</h1>

				<div className="" x-data="{ search: '' }">
					<div className=" mb-2 w-50 flex rounded-md">
						<svg className="w-5 h-8 pl-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
						</svg>
						<input

							type="search"
							onChange={(e) => { setsearch(e.target.value) }}
							className="h-8 px-4 py-1 w-1/3 text-gray-800 focus:outline-none"
							placeholder="Exam Name"
							x-model="search" />
					</div>
				</div>

				<table className="shadow-sm p-6 h-max w-full text-left mb-5 border-spacing-0" id="table-to-xls">
					<thead className="bg-[#0A1C3E] text-white p-3 h-16 ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id} className="capitalize px-4 py-2 text-center">
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
						{data.length > 0 ? (
							data.filter((item) => {
								return search.toLowerCase() === '' ? item : item && item.assessmentName && item.assessmentName.toLowerCase().includes(search.toLowerCase())
							}).map((row, i) => (
								<tr
									key={row.id}
									className={`
                    ${i % 2 === 0 ? "bg-white" : "bg-white"} border-b border-gray-300 h-16 hover:bg-neutral-200 
                `}>
									<td className="px-4 py-2 text-center">
										{i + 1}
									</td>
									<td className="px-4 py-2 text-center">
										{row["date"]}
									</td>
									<td className="px-4 py-2 text-center">
										{row["moduleName"]}
									</td>
									<td className="px-4 py-2 text-center">
										{row["assessmentName"]}
									</td>
									<td className="px-4 py-2 text-center">
										{row["assessmentType"]}
									</td>
									<td className="px-4 py-2 text-center">
										{row["marksObtained"]}
									</td>
								</tr>
							))
						) : (
							<tr className="text-center h-32">
								<td colSpan={columns.length}>No Record Found! <br /> You may not have given any exam.</td>
							</tr>
						)}

					</tbody>
				</table>
			</div>
		</>
	);
};


export default TraineeExamTable;

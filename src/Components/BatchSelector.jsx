import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBatch } from '../reducers/GeneralReducers';
import api from "../services/api";

const Selector = () => {
  const [batches, setBatches] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const activeLocation = useSelector(state => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/admin/batches/${activeLocation}`);
        setBatches(response.data.data);
      } catch (error) {
        setBatches([]);
      }
    })();
  }, [activeLocation]);

  // Dispatch action to fetch the current batch only when `selected` changes
  useEffect(() => {
    if (selected) {
      dispatch(fetchCurrentBatch(selected));
    }
  }, [selected, dispatch]);

  return (
    <div className="m-1 py-1 w-full rounded-lg border-2 border-gray-600 text-black-700 sm:text-sm">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"
          }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select Batch"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white overflow-x-hidden ${open ? "max-h-60" : "max-h-0"
          }`}
      >
        <div className="flex items-center px-1 sticky bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter Batch Name"
            className="placeholder:text-gray-700 p-2 outline-none flex-grow"
          />
        </div>
        {batches?.map((batch) => (
          <li
            key={batch._id}
            className={`p-2 text-sm hover:bg-gray-200 hover:text-sky
            ${batch._id === selected &&
              "bg-sky-600 text-sky"
              }
            ${batch.batchName.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
              }`}
            onClick={() => {
              if (batch._id !== selected) {
                setSelected(batch.batchName);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {batch.batchName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
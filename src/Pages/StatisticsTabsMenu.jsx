import React from "react";
import Statistics from "./Statistics";
import Table from "../Components/Table";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLocation } from '../reducers/GeneralReducers';

const StatisticsTabsMenu = () => {
  const activeLocation = useSelector(state => state.location);
  const locations = useSelector(state => state.locations);
  const dispatch = useDispatch();

  const handleTabClick = (location) => {
    dispatch(setActiveLocation(location));
  };

  return (
    <>
      <div className="flex-1 px-8 py-2 h-auto">
        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">Tab</label>
          <select
            id="Tab"
            className="w-full rounded-md border-2 border-gray-250 text-lg"
            value={activeLocation}
            onChange={(e) => handleTabClick(e.target.value)}
          >
            {
              locations.map((location, index)=>{
                <option key={index} value={location}>{location}</option>
              })
            }
          </select>
        </div>

        {/* Desktop Tab Buttons */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 justify-center">
              {locations.map(location => (
                <button
                  key={location}
                  onClick={() => handleTabClick(location)}
                  className={`shrink-0 font-medium p-4 text-lg border ${activeLocation !== location ? "border-transparent text-gray-500 hover:text-gray-700" : "rounded-t-lg border-gray-300 border-b-white text-sky-600"}`}
                >
                  {location}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content Rendering based on Active Location */}
      <div className="mt-6 mx-6">
        {activeLocation && (
          <div>
            <Statistics/>
            <Table/>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsTabsMenu;

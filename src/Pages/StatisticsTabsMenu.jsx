import React from "react";
import { Tabs, Tab } from '../Components/Tabs';
import Statistics from "./Statistics";
import Table from "../Components/Table";
import { Link } from "react-router-dom";
import { useState } from "react";

const StatisticsTabsMenu = () => {
  const [activeLocation, setActiveLocation] = useState("Pune");

  // Function to handle tab click
  const handleTabClick = (location) => {
    setActiveLocation(location);
  };
  return (
    <>
      <div className="flex-1 px-8 py-2 h-auto">
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">Tab</label>
          <select id="Tab" className="w-full rounded-md border-2 border-gray-250 text-lg" value={activeLocation} onChange={(e) => handleTabClick(e.target.value)}>
            <option select>Pune</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Germany</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 justify-center">
              <button
                onClick={() => handleTabClick("Pune")}
                className={`shrink-0 font-medium p-4 text-lg border ${activeLocation !== "Pune" ? "border-transparent text-gray-500 hover:text-gray-700" : "rounded-t-lg border-gray-300 border-b-white text-sky-600"}`}
              >
                Pune
              </button>

              <button
                onClick={() => handleTabClick("Chennai")}
                className={`shrink-0 font-medium p-4 text-lg border ${activeLocation !== "Chennai" ? "border-transparent text-gray-500 hover:text-gray-700" : "rounded-t-lg border-gray-300 border-b-white text-sky-600"}`}
              >
                Chennai
              </button>

              <button
                onClick={() => handleTabClick("Bangalore")}
                className={`shrink-0 font-medium p-4 text-lg border ${activeLocation !== "Bangalore" ? "border-transparent text-gray-500 hover:text-gray-700" : "rounded-t-lg border-gray-300 border-b-white text-sky-600"}`}
              >
                Bangalore
              </button>

              <button
                onClick={() => handleTabClick("Germany")}
                className={`shrink-0 font-medium p-4 text-lg border ${activeLocation !== "Germany" ? "border-transparent text-gray-500 hover:text-gray-700" : "rounded-t-lg border-gray-300 border-b-white text-sky-600"}`}
              >
                Germany
              </button>
            </nav>
          </div>
        </div>
      </div>
      {/* Content rendering based on the active tab */}
      <div className="mt-6 mx-6">
        {activeLocation === "Pune" && (
          <div>
            <Statistics location="Pune" />
            <Table location="Pune" />
          </div>
        )}
        {activeLocation === "Chennai" && (
          <div>
            <Statistics location="Chennai" />
            <Table location="Chennai" />
          </div>
        )}
        {activeLocation === "Bangalore" && (
          <div>
            <Statistics location="Bangalore" />
            <Table location="Bangalore" />
          </div>
        )}
        {activeLocation === "Germany" && (
          <div>
            <Statistics location="Germany" />
            <Table location="Germany" />
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsTabsMenu;
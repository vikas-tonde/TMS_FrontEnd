import React from "react";
import StatisticsTabsMenu from "./StatisticsTabsMenu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        {/* Dashboard Link */}
        <Link 
          to='/dashboard' 
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Dashboard
        </Link>

        {/* StatisticsTabsMenu without 3D effect */}
        <div className="mt-6 mx-6 shadow-xl rounded-lg p-6 bg-white">
          <StatisticsTabsMenu />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

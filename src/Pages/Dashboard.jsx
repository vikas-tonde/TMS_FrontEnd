import React from "react";
import StatisticsTabsMenu from "./StatisticsTabsMenu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex-1" >
      <Link to='/dashboard' className="block py-3 pl-5 px-5 font-bold text-3xl Times text-center mx-auto">Dashboard</Link>
        <StatisticsTabsMenu />
      </div>
    </>
  );
};

export default Dashboard;

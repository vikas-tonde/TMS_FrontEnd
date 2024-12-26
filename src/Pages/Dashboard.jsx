import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTrainees } from "../reducers/GeneralReducers";
import api from "../services/api";
import StatisticsTabsMenu from "./StatisticsTabsMenu";

const Dashboard = () => {
  const dispatch = useDispatch();
  const activeLocation = useSelector(state => state.location);
  const activeBatch = useSelector(state => state.batch);
  useEffect(() => {
    (async () => {
      let endpoint = `/${activeLocation}`;
      if (activeBatch) {
        endpoint = `${endpoint}/${activeBatch}`
      }
      try {
        const response = await api.get(`/api/admin/trainees/${endpoint}`);
        dispatch(fetchTrainees(response.data.data));
      } catch (error) {
        console.error("Error fetching trainees:", error);
        dispatch(fetchTrainees([]));
      }
    })();
  }, [activeLocation, activeBatch])

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
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          <StatisticsTabsMenu />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

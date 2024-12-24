import React from 'react'
import { Link } from 'react-router-dom'

function Analytics() {
  return (
    <>
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link 
          to='/graph' 
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Marks Statistics
        </Link>

        {/* StatisticsTabsMenu without 3D effect */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          need to fill
        </div>
      </div>
    </>
  )
}

export default Analytics

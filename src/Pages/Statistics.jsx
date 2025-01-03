import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Selector from "../Components/BatchSelector";
import avatar from '../assets/avatar.svg';
import { useAuth } from "../services/auth";

const Statistics = () => {
  const activeLocation = useSelector(state => state.location);
  const [entries, setEntries] = useState([]);
  const {user } = useAuth();

  let traineesSelected = useSelector(state => state.trainees) || [];
  useEffect(() => {
    if (Array.isArray(traineesSelected)) {
      setEntries(traineesSelected.slice(0, 5));
    }
    else {
      setEntries([]);
    }
  }, [traineesSelected, activeLocation]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <>
      <Selector />
      <div className="flex items-center justify-center mt-8 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Toppers Slider Section */}
          <div className="items-center">
            <span className="relative flex justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
              <span className="text-lg font-semibold relative z-10 text-[#0A1C3E] bg-white px-6">Toppers</span>
            </span>
            {
              entries.length ?
                <Slider {...settings} className="max-w-3xl mx-auto">
                  {entries.map((entry, index) => (
                    <div key={index} className="py-1 sm:py-4">
                      <div className="w-full p-1">
                        <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4">
                          <img
                            src={entry.profileImage ? `/api/users/profile/${entry.profileImage}` : avatar}

                            alt={`${entry?.firstName} ${entry?.lastName}`}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{`${entry?.firstName} ${entry?.lastName}`}</h3>
                            <p className="text-sm text-gray-600">Percentage: {entry?.percentage}</p>
                            <p className="text-sm text-gray-600">Email: {entry?.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                : <p className="text-center mt-6 h-32">No Record Found!</p>
            }
          </div>

          {/* Statistics Section */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-rows-3 gap-6 md:max-w-3xl mx-auto">
              {[
                { label: "Number of Exams", value: 18, description: "Number of exams conducted during the training program." },
                { label: "Number of Trainees", value: 27, description: "Number of trainees currently enrolled in the training program." },
                { label: "Ongoing Training", value: 3, description: "Number of trainees currently undergoing training." },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center transform hover:scale-105 transition duration-300 bg-[#0A1C3E] p-6 m-1 rounded-lg shadow-md text-white"
                >
                  <div className="flex-1 px-4 min-w-0">
                    <h2 className="text-lg font-semibold">{stat.label}</h2>
                    <span className="text-sm">{stat.description}</span>
                  </div>
                  <div className="inline-flex items-center">
                    <div className="w-6 h-6 p-5 text-white flex items-center justify-center rounded-full text-md font-semibold">
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;

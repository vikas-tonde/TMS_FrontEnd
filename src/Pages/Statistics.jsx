import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Selector from "../Components/BatchSelector";
import { getBatches } from "./../services/loaderFunctions";

const Statistics = () => {
  const [entries, setEntries] = useState([
    {
      name: "Vikas Tonde",
      email: "vikas.tonde@intelizign.com",
      score: 92,
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Unique image for Vikas
    },
    {
      name: "Shivkanya Doiphode",
      email: "shivkanya.doiphode@intelizign.com",
      score: 90,
      image: "https://randomuser.me/api/portraits/women/2.jpg", // Unique image for Shivkanya
    },
    {
      name: "Rishi Rathod",
      email: "rishi.rathod@intelizign.com",
      score: 88,
      image: "https://randomuser.me/api/portraits/men/3.jpg", // Unique image for Rishi
    },
    {
      name: "Rutika Vale",
      email: "rutika.vale@intelizign.com",
      score: 87,
      image: "https://randomuser.me/api/portraits/women/4.jpg", // Unique image for Rutika
    },
    {
      name: "Trupti Panhale",
      email: "trupti.panhale@intelizign.com",
      score: 85,
      image: "https://randomuser.me/api/portraits/women/5.jpg", // Unique image for Trupti
    },
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <Selector loader={getBatches} />
      <div className="flex items-center justify-center mt-8 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Toppers Slider Section */}
          <div className="items-center">
            <h2 className="text-lg font-semibold text-center py-1 text-[#0A1C3E]">Toppers</h2>
            <Slider {...settings} className="max-w-3xl mx-auto">
              {entries.map((entry, index) => (
                <div key={index} className="py-1 sm:py-4">
                  <div className="w-full p-1">
                    <div className="relative mb-32 max-w-sm mx-auto mt-24">
                      <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center">
                          <div className="h-32 w-32">
                            {/* Displaying unique image for each entry */}
                            <img
                              src={entry.image}
                              className="rounded-full object-cover h-full w-full shadow-md"
                              alt="User avatar"
                            />
                          </div>
                          <div className=" mt-4">
                            <h1 className="font-bold text-lg text-center mb-1">{entry.name}</h1>
                            <p className="text-gray-800 flex-wrap font-semibold text-sm text-center">Total Score:
                            <span> {entry.score}</span></p>
                            <p className="text-center flex-wrap text-gray-600 text-base font-semibold">
                              Email Id: <span>{entry.email}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Statistics Section */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-rows-3 gap-3 md:max-w-3xl mx-auto">
              {[
                { label: "Number of Exams", value: 18, description: "Number of exams conducted during the training program." },
                { label: "Number of Trainees", value: 27, description: "Number of trainees currently enrolled in the training program." },
                { label: "Ongoing Training", value: 3, description: "Number of trainees currently undergoing training." },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center transform hover:scale-105 transition duration-300 bg-[#0A1C3E] p-6 m-2 rounded-lg shadow-md text-white"
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

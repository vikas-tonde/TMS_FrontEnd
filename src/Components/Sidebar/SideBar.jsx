import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AiFillPieChart } from 'react-icons/ai';
import { BiSolidSelectMultiple } from "react-icons/bi";
import { FaBars, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdAddCircle, MdOutlineBatchPrediction } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { RiDashboardFill, RiUserSettingsFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
    path: "/profile",
    name: "Personal Information",
    icon: <RiUserSettingsFill />,
    
  },
  {
    path: "/exams",
    name: "Exams",
    icon: <PiExamFill />,
    subRoutes: [
      {
        path: "/exams",
        name: "All Exams",
        icon: <PiExamFill />,
      },
      {
        path: "/exams/single",
        name: "Single Entry",
        icon: <MdAddCircle />,
      },
      {
        path: "/exams/addbulk",
        name: "Bulk Entry",
        icon: <BiSolidSelectMultiple />,
      },
    ],
  },
  {
    path: "/users",
    name: "Users Details",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/users/singleentry",
        name: "Single Entry",
        icon: <MdAddCircle />,
      },
      {
        path: "/users/addbulk",
        name: "Bulk Entry",
        icon: <BiSolidSelectMultiple />,
      },
      {
        path: "/users",
        name: "All Users",
        icon: <FaUsers />,
      },
    ],
  },
  {
    path: "/graph",
    name: "Graphs",
    icon: < AiFillPieChart />,
  },
  {
    path: "/batch",
    name: "Batch",
    icon: <MdOutlineBatchPrediction />,
  },
  {
    path: "/logout",
    name: "Log out",
    icon: <FaSignOutAlt />,
  },
];


const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  const showAnimation = {
    hidden: {
      opacity: 1,
      padding: "5px 15px",
      width: "180px",
      transition: {
        duration: 0.9,
      },
    },
    show: {
      opacity: 1,
      padding: "5px 15px",
      width: "180px",
      transition: {
      duration: 0.9,

      },
    },
  };

  return (
    <>
      <div className=" sticky top-0 h-screen ">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
        
          }}
          className={`sidebar bg-[#0A1C3E] text-white flex flex-col min-h-screen`}
        
        >
          <div className="flex flex-none content-center justify-between p-4">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
          Admin Dashboard
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars ">
              <FaBars onClick={toggle} />
            </div>
          </div>
          

          <section className="routes">
            <div className="flex flex-col flex-wrap justify-between items-start ">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                      key={index}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeclassname="active"
                  >
                    <div className="flex items-center p-4">
                      <div className="mr-4">{route.icon}</div>
                      <div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="link_text"
                            >
                              {route.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </section>
        </motion.div>

        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
};

export default SideBar;

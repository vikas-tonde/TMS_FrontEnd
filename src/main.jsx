import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import BatchTable from "./Components/BatchTable";
import AdminLayout from './Components/Layouts/AdminLayout';
import MasterLayout from './Components/Layouts/MasterLayout';
import TraineeLayout from './Components/Layouts/TraineeLayout';
import TraineeExamData from './Components/TraineeExamData';
import TraineeExamTable from './Components/TraineeExamTable';
import TraineeTable from './Components/TraineeTable';
import Analytics from './Pages/Analytics';
import AssignmentStatus from './Pages/AssignmentStatus';
import Batch from './Pages/Batch';
import BulkEntryModuleForm from './Pages/BulkEntryModuleForm';
import BulkEntryXlsx from './Pages/BulkUserEntry';
import Dashboard from './Pages/Dashboard';
import TraineeDashboard from './Pages/TraineeDashboard';
import Homepage from './Pages/HomePage';
import Login from './Pages/LoginPage';
import Logout from './Pages/Logout';
import Messages from './Pages/Messages';
import SingleEntryUser from './Pages/SingleEntryUser';
import TraineeInfo from './Pages/TraineeInfo';
import Users from './Pages/Users';
import './index.css';
import { AuthProvider, RequireAuth } from './services/auth';
import { getBatches, getModules } from './services/loaderFunctions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/**
       * TODO: Make group of all admin routes and user routes below
      */}
      <Route element={<AuthProvider> <MasterLayout /> </AuthProvider>}>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth> <AdminLayout /> </RequireAuth>}>
          {/**
           * Please Don't Change any exising Route.
           * You can Add your Route for testing purpose.
            */ }
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Users />} />
          <Route path="/exams" element={<Messages />} />
          <Route path="/exams/single" element={<TraineeExamData />} loader={getBatches} />
          <Route path="/dashboard/:empId" element={<TraineeInfo />} />

          <Route path="/trainees/singleentry" element={<SingleEntryUser />} loader={getBatches} />
          <Route path="/trainees/addbulk" element={<BulkEntryXlsx />} />
          <Route path="/exams/addbulk" element={<BulkEntryModuleForm />} loader={getModules} />
          <Route path="/trainees/alltrainees" element={<TraineeTable />} loader={getBatches} />


          <Route path="/batch" element={<BatchTable />} loader={getBatches} />
          <Route path="/batch/:batchName" element={<Batch />} />
          <Route path="/graph" element={<Analytics />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/table/:empId" element={<TraineeInfo />} />

        </Route>

        <Route element={<RequireAuth> <TraineeLayout /> </RequireAuth>}>
          {/**
           * trainee
            */ }
          <Route path="/trainee" element={<TraineeDashboard />} />
          <Route path="/trainee/dashboard" element={<TraineeDashboard />} />
          <Route path="/trainee/profile" element={<Users />} />
          <Route path="/trainee/exams" element={<TraineeExamTable />} />
          <Route path="/trainee/assignments" element={<AssignmentStatus />} />

          <Route path="/logout" element={<Logout />} />
        </Route>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <StrictMode>
      <Homepage />
    </StrictMode>
  </RouterProvider>,
)

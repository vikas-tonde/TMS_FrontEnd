import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
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
import Exam from './Pages/Exam';
import Exams from './Pages/Exams';
import Homepage from './Pages/HomePage';
import Login from './Pages/LoginPage';
import Logout from './Pages/Logout';
import SingleEntryUser from './Pages/SingleEntryUser';
import TraineeDashboard from './Pages/TraineeDashboard';
import TraineeInfo from './Pages/TraineeInfo';
import Users from './Pages/Users';
import './index.css';
import { AuthProvider, RequireAuth } from './services/auth';
import { getBatch, getBatches, getExam, getModules, getTraineeDetails } from './services/loaderFunctions';
import { MyStore } from './store/Store.js';

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

          {/**Exams routes */}
          <Route path="/exams" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <Exams />
            </Suspense>
          } loader={getBatches} />
          <Route path="/exam/add" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <TraineeExamData />
            </Suspense>
          } loader={getBatches} />
          <Route path="/exams/add" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <BulkEntryModuleForm />
            </Suspense>
          } loader={getModules} />
          <Route path="/exams/:assessmentId" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <Exam />
            </Suspense>
          } loader={getExam} />

          <Route path="/dashboard/:empId" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <TraineeInfo />
            </Suspense>
          } loader={getTraineeDetails} />

          <Route path="/user/add" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <SingleEntryUser />
            </Suspense>
          } loader={getBatches} />
          <Route path="/users/add" element={<BulkEntryXlsx />} />

          <Route path="/users" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <TraineeTable />
            </Suspense>
          } loader={getBatches} />


          <Route path="/batch" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <BatchTable />
            </Suspense>
          } loader={getBatches} />
          <Route path="/batch/:batchId" element={
            <Suspense fallback={<div>Loading batch details...</div>}>
              <Batch />
            </Suspense>
          } loader={getBatch} />
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
  <StrictMode>
    <Provider store={MyStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

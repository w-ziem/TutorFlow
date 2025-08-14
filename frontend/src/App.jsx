import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import MainLayout from './Layouts/MainLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
import TutorDashboardPage from "./pages/TutorDashboardPage.jsx";
import TutorLayout from "./Layouts/TutorLayout.jsx";
import ProtectedRoute from './components/ProtectedRoute';

import Modal from './components/Modal/Modal';
import AddStudentForm from "./components/Forms/AddStudentForm.jsx";
import {useState} from "react";
import {FormProvider} from "./contexts/FromContext.jsx";
import {GlobalModal} from "./components/Modal/GlobalModal.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<MainPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
            
            <Route path="/dashboard-student" element={
                <ProtectedRoute requiredRole="STUDENT">
                    <StudentDashboardPage />
                </ProtectedRoute>
            } />
            
            <Route path="/dashboard-tutor/*" element={
                <ProtectedRoute requiredRole="TUTOR">
                    <TutorLayout />
                </ProtectedRoute>
            } >            
                <Route index element={<TutorDashboardPage />} />
            </Route>
        </>
    )
)

function App() {
    return (
        <AuthProvider>
            <FormProvider>
                <RouterProvider router={router}/>
                <GlobalModal />
            </FormProvider>
        </AuthProvider>
    );
}


export default App
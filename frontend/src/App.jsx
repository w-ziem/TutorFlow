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


import {FormProvider} from "./contexts/FromContext.jsx";
import {GlobalModal} from "./components/Modal/GlobalModal.jsx";
import {Toaster} from "react-hot-toast";
import ListPage from "./pages/ListPage.jsx";

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
                <Route path="students" element={<ListPage type="students"/>} />
                <Route path="lessons" element={<ListPage type="lessons"/>} />
                <Route path="materials" element={<ListPage type="materials"/>} />
                <Route path="reports" element={<ListPage type="reports"/>} />
            </Route>
        </>
    )
)

function App() {
    return (
       <>
        <AuthProvider>
            <FormProvider>
                <RouterProvider router={router}/>
                <GlobalModal />
            </FormProvider>
        </AuthProvider>
        <Toaster position='top-right' reverseOrder={false} />
       </>
    );
}


export default App
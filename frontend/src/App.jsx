import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
import TutorDashboardPage from "./pages/TutorDashboardPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />} >

            <Route index element={<MainPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/dashboard/student' element={<StudentDashboardPage />} />
            <Route path='/dashboard/tutor' element={<TutorDashboardPage />} />

        </Route>
    )
)


function App() {
  return <RouterProvider  router={router}/>
}

export default App

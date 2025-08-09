import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />} >

            <Route index element={<MainPage />} />
            <Route path='*' element={<NotFoundPage />} />

        </Route>
    )
)


function App() {
  return <RouterProvider  router={router}/>
}

export default App

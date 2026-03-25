import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import FormPage from './pages/FormPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import {Toaster} from 'react-hot-toast'


function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/form" element={
                        <ProtectedRoute>
                            <FormPage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </Router>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                }}
            />
        </>
    )
}

export default App

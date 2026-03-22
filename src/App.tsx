import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import FormPage from './pages/FormPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'


function App() {

    return (
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
    )
}

export default App

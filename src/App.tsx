import './App.css';
import SignUp from './pages/signup/SignUp.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Correct import
import Login from './pages/login/Login.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {UserProvider} from "./UserContext.tsx";
import Home from './pages/home/Home.tsx';

function App() {
    return (
        <Router>
            <GoogleOAuthProvider clientId={"1041924221263-bvm79ds6tmdffeeg46dh7atehusbskg0.apps.googleusercontent.com"}>
                <UserProvider>
                    <Routes>
                        {/* Route for login page */}
                        <Route path="/login" element={<Login />} />

                        {/* Route for sign-up page */}
                        <Route path="/signup" element={<SignUp />} />

                        {/* Default route */}
                        <Route path="/" element={<Home />} />
                    </Routes>
                </UserProvider>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default App;
import React from "react";
import SignUp from "./components/SignUp/SignUp.jsx";
import OTP from "./components/OTP/OTP.jsx";
import styles from "./App.module.css";
import Messages from "./components/Messages/Messages.jsx";
import Jobs from "./components/Jobs/Jobs.jsx";
import Freelancers from "./components/Freelancers/Freelancers.jsx";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Freelancer from "./components/Freelancer/Freelancer.jsx";
import Login from "./components/Login/Login.jsx";
import JobPosting from "./components/JobPosting/JobPosting.jsx";
import "./App.css";
import { AuthProvider } from "./AuthProvider.jsx";

function App() {
    return (
        <AuthProvider>
            <div className={styles.app}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignUp />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/otp" element={<OTP />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/freelancers" element={<Freelancers />} />
                        <Route path="/freelancers/*" element={<Freelancer />} />
                        <Route path="/JobPosting" element={<JobPosting />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;

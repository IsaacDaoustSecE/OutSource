import React from "react";
import SignUp from "./components/SignUp/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTP from "./components/OTP/OTP.jsx";
import styles from "./App.module.css";
import Messages from "./components/Messages/Messages.jsx";
import Jobs from "./components/Jobs/Jobs.jsx";
import Freelancers from "./components/Freelancers/Freelancers.jsx";

function App() {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/otp" element={<OTP />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/freelancers" element={<Freelancers />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

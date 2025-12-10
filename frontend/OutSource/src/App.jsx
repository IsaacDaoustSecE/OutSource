import React from "react";
import SignUp from "./components/SignUp/SignUp.jsx";
import OTP from "./components/OTP/OTP.jsx";
import Home from "./components/Home/Home.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

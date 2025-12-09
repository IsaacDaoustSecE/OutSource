import React from "react";
import SignUp from "./components/SignUp/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTP from "./components/OTP/OTP.jsx";

function App() {

 return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/otp" element={<OTP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

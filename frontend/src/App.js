import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./App.css";
import HotelList from "./pages/HotelList";
import HotelDetail from "./pages/HotelDetail";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/hotels" element={<HotelList/>}/>
              <Route path="/hotel/:id" element={<HotelDetail/>}/>
              <Route path="/bookings" element={<Booking/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import ReactStars from "react-rating-stars-component";
import { IoPeople } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";

const Room = (props) => {
  const { item } = props;
  return (
    <>
      <div className="card-wrapper d-flex flex-column p-2 m-1 col">
        <div className="img-wrapper border">
          <img src="../images/hotel1.png" alt="hotel" className="h-100 w-100 object-fit-cover" />
        </div>
        <div className="card-details">
          <h6 className="fs-6">Superior Room, 1 King Bed,NonSmoking</h6>
          <div className="no-of-guest d-flex">
            <IoPeople className="mx-1" />
            <p>2 People</p>
          </div>
          <div className="bed d-flex">
            <FaBed className="mx-1"/>
            <p>Queen Bed and 1 Sofa Bed (or Twin Bed)</p>
          </div>
          <div className="price-book d-flex justify-content-between algin-items-center">
            <div className="room-price">
              <h4 className="fs-6">$410</h4>
              <p>Per Day / Room</p>
            </div>
            <Link to="/booking" className="booking-btn">Reserve Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;

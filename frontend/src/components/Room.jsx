import React from "react";
import ReactStars from "react-rating-stars-component";
import { IoPeople } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking } from "../features/auth/authSlice";
import { format, differenceInDays } from "date-fns";
import { toast } from "react-toastify";

const Room = (props) => {
  const { item, checkinDate, checkoutDate, hotelId, hotelName } = props;
  const dispatch = useDispatch();
  const totalPrice =
    item?.price *
    differenceInDays(new Date(checkoutDate), new Date(checkinDate));

  const handleReservation = () => {
    if (checkinDate === null || checkoutDate === null) {
      toast.error("Please Select Check In and Check Out dates!");
    } else if (checkinDate > checkoutDate) {
      toast.error("Check out day should be at least a day after check in date!")
    } else {
      dispatch(
        createBooking({
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
          price: item?.price,
          hotelId: hotelId,
          hotelName: hotelName,
          roomName: item?.name,
          totalPrice: totalPrice,
        })
      );
    }
  };

  console.log(checkinDate);
  return (
    <>
      <div className="card-wrapper d-flex flex-column p-2 m-1 col">
        <div className="img-wrapper border">
          <img
            src={item?.image}
            alt="hotel"
            className="h-100 w-100 object-fit-cover"
          />
        </div>
        <div className="card-details">
          <h6 className="fs-6">{item?.name}</h6>
          <div className="no-of-guest d-flex align-items-center">
            <IoPeople className="mx-1 col-1" />
            <span>{item?.count} People</span>
          </div>
          <div className="bed d-flex align-items-center">
            <FaBed className="mx-1 col-1" />
            <span>{item?.beds}</span>
          </div>
          <div className="price-book d-flex justify-content-between algin-items-center">
            <div className="room-price">
              <h4 className="fs-6">${item?.price}</h4>
              <p>Per Day / Room</p>
            </div>
            <button
              onClick={() => {
                handleReservation();
              }}
              className="booking-btn"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;

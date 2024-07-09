import React from "react";
import ReactStars from "react-rating-stars-component";
import { IoPeople } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking } from "../features/auth/authSlice";
import { format ,differenceInDays} from "date-fns";

const Room = (props) => {
  const { item, checkinDate, checkoutDate , hotelId , hotelName } = props;
  const dispatch = useDispatch();
  const totalPrice = item?.price * differenceInDays(new Date(checkoutDate) , new Date(checkinDate))

  const handleReservation = () => {
    dispatch(
      createBooking({
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        price: item?.price,
        hotelId: hotelId,
        hotelName: hotelName,
        roomName: item?.name,
        totalPrice: totalPrice
      })
    );
  };
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
          <div className="no-of-guest d-flex">
            <IoPeople className="mx-1" />
            <p>2 People</p>
          </div>
          <div className="bed d-flex">
            <FaBed className="mx-1" />
            <p>{item?.beds}</p>
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

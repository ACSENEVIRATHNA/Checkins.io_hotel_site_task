import React, { useEffect, useState } from "react";
import Zoom from "react-img-zoom-gdn";
import { hotels } from "../utils/Data";
import { IoLocationSharp } from "react-icons/io5";
import Room from "../components/Room";
import { useLocation } from "react-router-dom";

const HotelDetail = () => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const [img, setImg] = useState(null);
  useEffect(() => {
    setImg(hotels[0].image);
  }, []);
  return (
    <>
      <div className="container-fluid p-3 hotel-wrapper">
        <div className="image-container col-12 row m-2">
          <div className=" col-6 p-2 border rounded ">
            {img && (
              <Zoom
                key={img}
                img={img}
                zoomScale={2}
                width={500}
                height={300}
                className="imgzoom"
              />
            )}
          </div>
          <div className="col-6 p-2 border rounded">
            <div className="row row-cols-3">
              <div className="col">
                <img className="img-fluid" src={hotels[0].image} alt="hotel1" />
              </div>
              <div className="col">
                <img className="img-fluid" src={hotels[0].image} alt="hotel" />
              </div>
              <div className="col">
                <img className="img-fluid" src={hotels[0].image} alt="hotel" />
              </div>
            </div>
          </div>
        </div>
        <div className="detail-container m-2">
          <div className="hotel-name border rounded my-2 p-2">
            <h4>SLS Hotel, a Luxury Collection Hotel, Beverly Hills</h4>
            <div className="loc d-flex">
              <IoLocationSharp />
              <p>465 S La Cienega Blvd, Los Angeles</p>
            </div>
          </div>
          <div className="about border rounded my-2 p-2">
            <h4>About</h4>
            <p>
              Sophisticated but very comfortable hotel «SLS Hotel, a Luxury
              Collection Hotel, Beverly Hills» is located in Los Angeles. This
              hotel is located in 12 km from the city center. You can take a
              walk and explore the neighbourhood area of the hotel — Farmers
              Market, Los Angeles County Museum of Art and Hollywood/Highland.
            </p>
          </div>
          <div className="map-location border rounded p-2">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15840.418630099539!2d81.0446664749172!3d6.996954724406469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae46212ab01ce67%3A0xf0624b58ecdc4a16!2sBadulla%20Central%20College!5e0!3m2!1sen!2slk!4v1708352925273!5m2!1sen!2slk"
              width="600"
              height="450"
              className="border rounded-2 w-100 "
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="rooms my-2">
            <h4>Rooms</h4>
            <div className="row row-cols-3">
              <div className="col">
                <Room/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetail;

import React, { useEffect, useState } from "react";
import Zoom from "react-img-zoom-gdn";
import { hotels } from "../utils/Data";
import { IoLocationSharp } from "react-icons/io5";
import Room from "../components/Room";
import { useLocation, useOutletContext } from "react-router-dom";

const HotelDetail = () => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const id = hotelId - 1;
  const { checkinDate, checkoutDate } = useOutletContext();
  const [img, setImg] = useState(null);
  useEffect(() => {
    setImg(hotels[id]?.images[0]);
  }, []);
  console.log(hotels[id]);
  return (
    <>
      <div className="container-fluid p-3 hotel-wrapper">
        <div className="image-container col-12 row m-2">
          <div className=" col-6 p-2 border h-100 rounded overflow-hidden zoom-container">
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
                <img className="img-fluid" src={hotels[id]?.images[1]} alt="hotel1" />
              </div>
              <div className="col">
                <img className="img-fluid" src={hotels[id]?.images[2]} alt="hotel" />
              </div>
              <div className="col">
                <img className="img-fluid" src={hotels[id]?.images[3]} alt="hotel" />
              </div>
            </div>
          </div>
        </div>
        <div className="detail-container m-2">
          <div className="hotel-name border rounded my-2 p-2">
            <h4>{hotels[id]?.name}</h4>
            <div className="loc d-flex">
              <IoLocationSharp />
              <p>{hotels[id]?.location}</p>
            </div>
          </div>
          <div className="about border rounded my-2 p-2">
            <h4>About</h4>
            <p>{hotels[id]?.about}</p>
          </div>
          <div className="map-location border rounded p-2">
            <iframe
              title="map"
              src={hotels[id]?.loc_link}
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
            <div className="row row-cols-4">
              {hotels[id].rooms?.map((item, index) => {
                return (
                  <div key={index} className="col">
                    <Room
                      item={item}
                      hotelId={hotels[id].id}
                      checkinDate={checkinDate}
                      checkoutDate={checkoutDate}
                      hotelName={hotels[id].name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetail;

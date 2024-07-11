import React, { useEffect, useState, useRef } from "react";
import Zoom from "react-img-zoom-gdn";
import { hotels } from "../utils/Data";
import { IoLocationSharp } from "react-icons/io5";
import Room from "../components/Room";
import { useLocation, useOutletContext } from "react-router-dom";
import LoginWarning from "../components/LoginWarning";

const HotelDetail = () => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const [loginWarning, setLoginWarning] = useState(false);
  const id = hotelId - 1;
  const { checkinDate, checkoutDate, noOfGuests } = useOutletContext();
  const [img, setImg] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  const updateDimensions = () => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  };

  useEffect(() => {
    updateDimensions();
  }, [window.innerWidth]);

  useEffect(() => {
    setImg(hotels[id]?.images[0]);
  }, []);
  console.log(dimensions);
  return (
    <>
      <div className="container-fluid hotel-wrapper">
        <div className="image-container row">
          <div
            className="col-md-6  d-flex px-0 algin-items-ccenter h-100 overflow-hidden zoom-container"
            ref={containerRef}
          >
            {img && (
              <Zoom
                key={img}
                img={img}
                zoomScale={2}
                width={dimensions.width}
                height={(dimensions.width / 3) * 2}
                className="imgzoom"
              />
            )}
          </div>
          <div className="col-md-6 p-2">
            <div className="row row-cols-3">
              {hotels[id]?.images &&
                hotels[id]?.images?.map((item, index) => {
                  return (
                    <div className="col" key={index}>
                      <img
                        className="img-fluid border rounded p-1"
                        src={item}
                        alt="hotel-img"
                        onClick={() => setImg(item)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="detail-container row">
          <div className="hotel-name border rounded my-2 p-2">
            <h4>{hotels[id]?.name}</h4>
            <div className="loc d-flex">
              <IoLocationSharp />
              <p>
                {hotels[id]?.location?.city},{hotels[id]?.location?.country}
              </p>
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
          <div className="rooms my-2 position-relative">
            <h4>Rooms</h4>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
              {hotels[id].rooms?.map((item, index) => {
                if (item?.count >= noOfGuests) {
                  return (
                    <div key={index} className="col p-0">
                      <Room
                        item={item}
                        hotelId={hotels[id].id}
                        checkinDate={checkinDate}
                        checkoutDate={checkoutDate}
                        hotelName={hotels[id].name}
                        setLoginWarning={setLoginWarning}
                      />
                    </div>
                  );
                }
              })}
            </div>
            {loginWarning && <LoginWarning message={'make a reservation!'}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetail;

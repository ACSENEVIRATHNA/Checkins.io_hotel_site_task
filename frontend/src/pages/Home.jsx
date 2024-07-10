import React from "react";
import { hotels } from "../utils/Data";
import Marquee from "react-fast-marquee";
import HotelCard from "../components/HotelCard";

const Home = () => {
  return (
    <>
      <div className="container-fluid home-wrapper p-3">
        <div className="row">
          <div className="col-12 top-rated">
            <h3>TOP RATED HOTELS</h3>
            <div className="marquee-inner-wrapper border z-1 row">
              <Marquee autoFill={true} pauseOnHover={true}>
                {hotels &&
                  hotels?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="marquee-item d-flex justify-content-center"
                      >
                        <HotelCard item={item} />
                      </div>
                    );
                  })}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

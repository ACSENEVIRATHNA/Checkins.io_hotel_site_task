import React, { useState } from "react";
import { hotels, cities } from "../utils/Data";
import Marquee from "react-fast-marquee";
import HotelCard from "../components/HotelCard";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentPage < Math.ceil(hotels.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedHotels = hotels.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  return (
    <>
      <div className="container-fluid home-wrapper p-5">
        <div className="row">
          <div className="col-12 top-rated py-3">
            <h3>TOP RATED HOTELS</h3>
            <div className="marquee-inner-wrapper">
              {paginatedHotels.map((item, index) => (
                <div
                  key={index}
                  className="marquee-item col-3 d-flex justify-content-center"
                >
                  <HotelCard item={item} />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end pt-2">
              <nav aria-label="...">
                <ul class="pagination">
                  <li
                    class="page-item disabled"
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                  >
                    <span class="page-link">Previous</span>
                  </li>
                  <li
                    class="page-item"
                    onClick={handleNext}
                    disabled={
                      currentPage >= Math.ceil(hotels.length / itemsPerPage) - 1
                    }
                  >
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-12 py-3">
            <h3>Decide Where You Want To We Will Arrange Your Accomadation</h3>
            <div className="marquee-inner-wrapper z-1 row">
              <Marquee autoFill={true} pauseOnHover={true}>
                {cities &&
                  cities?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2 city-wrapper position-relative"
                      >
                        <img
                          src={item?.img}
                          alt="city-img"
                          className="img-fluid rounded"
                        />
                        <h2 className="position-absolute city-name">
                          {item?.city}
                        </h2>
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

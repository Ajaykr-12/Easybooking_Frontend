import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import {
  faArrowLeft,
  faLocationDot,
  faArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./hotel.css";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { id } from "date-fns/locale";

function Hotel() {
  const [openSlide, setOpenSlide] = useState(false);
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const [openReserve, setOpenReserve] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hotelId}`);

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  function dateDiff(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const dateDiff = Math.ceil(timeDiff / MS_PER_DAY);
    return dateDiff;
  }

  const days = dateDiff(dates[0].startDate, dates[0].endDate);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/square600/522512103.webp?k=479d3da9a5481e744e653d3726e4087e6743810e209c2e0fdb3fde8887b1d4e3&o=",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/square600/526601316.webp?k=5afdef7156b13dbda5f71c751c1dba91e26b4406c1733027356abf56a0c61932&o=",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/square600/524517775.webp?k=98ae218c1acae55008631c0dfab028790c05096d9fe8a2f0f4a3f1bf346a7105&o=",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/square600/520267153.webp?k=d1eac6296296999438dc4d0c179dd3d600183db96bf5f6ecb4807799054d5408&o=",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/square600/525573629.webp?k=757d1b53249afa29e7a45b2b51eccdbcd04f27688030edab2574c5ab3f286d70&o=",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/square600/529109402.webp?k=abf22d2b999bca16082d0c24110a8ecd6d7a94b1847a2c36b564396a7ac09b4e&o=",
    },
  ];

  function handleSlideClick(i) {
    setOpenSlide(true);
    setIndex(i);
  }

  function handleSlideArrow(direction) {
    if (direction === "l") {
      if (index > 0) {
        setIndex((pre) => pre - 1);
      }
    } else {
      if (index < photos.length - 1) {
        setIndex((pre) => pre + 1);
      }
    }
  }

  function handleReserveClick() {
    if (user) {
      setOpenReserve(true);
    } else {
      navigate("/login");
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="hotelContainer">
          {openSlide && (
            <div className="slider">
              <div className="sliderWrapper">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => setOpenSlide(false)}
                  className="closeBtn"
                />
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={() => handleSlideArrow("l")}
                  className="arrow"
                />
                <img src={data.photos[index]} alt="" className="slideImg" />
                <FontAwesomeIcon
                  icon={faArrowRight}
                  onClick={() => handleSlideArrow("r")}
                  className="arrow"
                />
              </div>
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleReserveClick}>
              Reserve or book now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighLight">
              Book a stay over ₹{data.cheapestPrice} and get a free airport taxi
            </span>
            <div className="hotelImgs">
              {data.photos?.map((img, i) => {
                return (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      src={img}
                      onClick={() => handleSlideClick(i)}
                      alt="hotelImg"
                      className="hotelImg"
                    />
                  </div>
                );
              })}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for {days} night stay</h1>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ullam, adipisci?
                </span>
                <h2>
                  <b>₹{days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleReserveClick}>
                  Reserve or book now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openReserve && <Reserve setOpen={setOpenReserve} id={hotelId} />}
    </div>
  );
}

export default Hotel;

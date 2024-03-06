import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";

function SearchItem({ items }) {
  return (
    <div className="searchItem">
      <img src={items.photos[0]} alt="siImg" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{items.name}</h1>
        <span className="siDistance">{items.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{items.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          {items.rating && (
            <>
              <span>Excellent</span>
              <button>{items.rating}</button>
            </>
          )}
        </div>
        <div className="isDetailsText">
          <span className="isPrice">₹{items.cheapestPrice}</span>
          <span className="siTaxOp">Include taxes and fees</span>
          <Link to={`/hotels/${items._id}`}>
            <button className="isCheckBtn">See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;

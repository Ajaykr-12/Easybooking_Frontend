import React from "react";
import "./subProperty.css";
import useFetch from "../../hooks/useFetch";

function SubProperty() {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="subProperty">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data.map((item, i) => {
            return (
              <div className="subProItem" key={i}>
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/square600/484149806.webp?k=6ce1bafc6595c03f166d34f73fccc244e1a7f3daea53b24876b45d1d69c81bf3&o="
                  alt="KanchipuramImg"
                  className="spImg"
                />
                <span className="spName">{item.name}</span>
                <span className="spCity">{item.city}</span>
                <span className="spPrice">
                  String from ₹{item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="spRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default SubProperty;

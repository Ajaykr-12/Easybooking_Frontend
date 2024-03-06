import React from "react";
import "./features.css";
import useFetch from "../../hooks/useFetch";

function Features() {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=bangalore,chennai,pondy"
  );
  return (
    <div className="features">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          <div className="featureItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/540x270/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
              alt="BangaloreImg"
              className="featureImg"
            />
            <div className="featureTitle">
              <h1>Bangalore</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featureItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/354x266/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o="
              alt="ChennaiImg"
              className="featureImg"
            />
            <div className="featureTitle">
              <h1>Chennai</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featureItem">
            <img
              src="https://r-xx.bstatic.com/xdata/images/city/170x136/684769.jpg?k=146b18e42b9eb74078f2e80e07e573e8dbac879208b86bae451f99882f566a99&o="
              alt="PuducherryImg"
              className="featureImg"
            />
            <div className="featureTitle">
              <h1>Puducherry</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Features;

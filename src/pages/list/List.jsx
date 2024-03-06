import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [showDate, setShowDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  function handleSearchClick() {
    reFetch();
  }

  return (
    <div className="listOut">
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setShowDate(!showDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {showDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setMin(e.target.value);
                    }}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setMax(e.target.value);
                    }}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder={options.adult}
                    className="lsOptionInput"
                    min={1}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder={options.children}
                    className="lsOptionInput"
                    min={0}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Rooms <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder={options.room}
                    className="lsOptionInput"
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => handleSearchClick()}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading please wait"
            ) : (
              <>
                {data.map((item) => {
                  return <SearchItem key={item._id} items={item} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;

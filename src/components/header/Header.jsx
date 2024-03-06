import React, { useContext } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCab,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

function Header(props) {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  function handleCounterClick(name, operation) {
    setOptions((pre) => {
      return {
        ...pre,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  }

  const { dispatch } = useContext(SearchContext);

  function handleSearchClick() {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate("/hotels", { state: { dates, destination, options } });
  }

  return (
    <div className="header">
      <div
        className={
          props.type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stay</span>
          </div>
          <div className="headerItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerItem">
            <FontAwesomeIcon icon={faCab} />
            <span>Car rental</span>
          </div>
          <div className="headerItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerItem">
            <FontAwesomeIcon icon={faCab} />
            <span>Airport taxis</span>
          </div>
        </div>

        {props.type !== "list" && (
          <>
            <h1 className="headerTitle">Make your booking easy.</h1>
            <p className="headerDesc">
              Start booking hotels, homes and more...
            </p>
            {!user && <button className="header-btn">Sign In/ Register</button>}

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <input
                  type="text"
                  placeholder="where are you going"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerSearchIcon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <span
                  onClick={() => setOpenOption(!openOption)}
                  className="headerSearchText"
                >
                  {`${options.adult} adult ${options.children} children ${options.room} room`}
                </span>
                {openOption && (
                  <div className="searchOption">
                    <div className="searchOptionItems">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          onClick={() => handleCounterClick("adult", "d")}
                          className="optinCounterBtn"
                          disabled={options.adult <= 1}
                        >
                          -
                        </button>
                        <span>{options.adult}</span>
                        <button
                          onClick={() => handleCounterClick("adult", "i")}
                          className="optinCounterBtn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="searchOptionItems">
                      <span className="optionName">Children</span>
                      <div className="optionCounter">
                        <button
                          onClick={() => handleCounterClick("children", "d")}
                          className="optinCounterBtn"
                          disabled={options.children < 1}
                        >
                          -
                        </button>
                        <span>{options.children}</span>
                        <button
                          onClick={() => handleCounterClick("children", "i")}
                          className="optinCounterBtn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="searchOptionItems">
                      <span className="optionName">Room</span>
                      <div className="optionCounter">
                        <button
                          onClick={() => handleCounterClick("room", "d")}
                          className="optinCounterBtn"
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span>{options.room} </span>
                        <button
                          onClick={() => handleCounterClick("room", "i")}
                          className="optinCounterBtn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button onClick={handleSearchClick} className="header-btn ">
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

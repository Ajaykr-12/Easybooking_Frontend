import React, { useContext, useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import axios from "../../config/axios.js";
import { useNavigate } from "react-router-dom";

function Reserve({ id, setOpen }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${id}`);
  const { dates } = useContext(SearchContext);

  const navigate = useNavigate();

  function handleSelect(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => {
            return item !== value;
          })
    );
  }

  function getDatesInRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const list = [];

    while (start.getTime() <= end.getTime()) {
      list.push(new Date(start).getTime());
      start.setDate(start.getDate() + 1);
    }
    return list;
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  function isRoomAvailabel(roomNumber) {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  }

  async function handleReserveClick() {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  }

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rCloseBtn"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item, i) => {
          return (
            <div className="rItem" key={i}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc} </div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople} </b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="selectedRoom">
                {item.roomNumbers.map((roomNum, i) => {
                  return (
                    <div className="room" key={i}>
                      <label>{roomNum.number} </label>
                      <input
                        type="checkbox"
                        value={roomNum._id}
                        onChange={handleSelect}
                        disabled={!isRoomAvailabel(roomNum)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button onClick={handleReserveClick} className="rBtn">
          Reserver Now!
        </button>
      </div>
    </div>
  );
}

export default Reserve;
